import { Injectable, NotFoundException, ParseBoolPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interface/users.interface'
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';    

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users') private readonly userModel: Model<User>,) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const created = new this.userModel({
            ... createUserDto,
            password: hash,
        });
        return created.save();
      }

      async validationCheck(username: string, password: string){
        const currUser = await this.userModel.findOne({ username }).exec();
        if(!currUser){
            throw new NotFoundException("User does not exist!");
        }
        const passcmp = await bcrypt.compare(password, currUser.password);
        if(!passcmp){
            return new NotFoundException("No Password Match");
        }
        return currUser;
      }

      async findByUser(username : string){
        return this.userModel.findOne({ username });
      }
}
