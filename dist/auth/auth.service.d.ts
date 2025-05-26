import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { PeopleService } from 'src/people/people.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { People } from 'src/people/interface/people.interface';
import { UpdatePersonDto } from 'src/people/dto/update-person.dto';
export declare class AuthService {
    private jwtService;
    private configService;
    private peopleService;
    constructor(jwtService: JwtService, configService: ConfigService, peopleService: PeopleService);
    signup(createPersonDto: CreatePersonDto): Promise<People>;
    login({ username, password }: LoginDto): Promise<{
        token: string;
    }>;
    resetPass({ username, password }: UpdatePersonDto): Promise<People>;
    forgotPassReset({ username, password, email }: UpdatePersonDto): Promise<People>;
}
