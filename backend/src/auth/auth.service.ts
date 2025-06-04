import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { PeopleService } from 'src/people/people.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { People } from 'src/people/interface/people.interface';
import { UpdatePersonDto } from 'src/people/dto/update-person.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private peopleService: PeopleService,
    ) { }

    async signup(createPersonDto: CreatePersonDto): Promise<People> {
        const salt = 10;
        const hashpass = await bcrypt.hash(createPersonDto.password, salt);

        const newUser = await this.peopleService.create({
            ...createPersonDto,
            password: hashpass,
        });
        return newUser;     
    }
  
    async login({ username, password }: LoginDto): Promise<string> {
        const exists = await this.peopleService.findOneByName(username);

        if (!exists) {
            throw new UnauthorizedException('Invalid Username');
        }
        const match = await bcrypt.compare(password, exists.password);
        if (!match) {
            throw new UnauthorizedException('Invalid Password');
        }
        const token = this.jwtService.sign({ id: exists.id, username: exists.username }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
        })

        return token;
    }

    async resetPass({ username, password }: UpdatePersonDto): Promise<People> {
        if (!username || !password) {
            throw new NotFoundException("Missing Required Fields");
        }
        const filter = { username: username };
        const changed = await this.peopleService.updatePass(filter, password, { username, password });
        if (!changed) {
            throw new NotFoundException("User does not exist");
        }

        return changed;
    }

    async forgotPassReset({ username, password, email }: UpdatePersonDto): Promise<People> {
        if (!username || !password || !email) {
            throw new NotFoundException("Missing Required Fields");
        }
        const exists = await this.peopleService.findOneByName(username);
        if (!exists) {
            throw new NotFoundException("User does not exist");
        }
        const exists_emailcheck = await this.peopleService.findOneByName(email);
        if (!exists_emailcheck) {
            throw new NotFoundException("Email does not exist")
        }
        const changed = await this.peopleService.updatePass({ username: username }, password, { username, password })
        if (!changed) {
            throw new NotFoundException("User does not exist");
        }
        return changed;
    }
}
