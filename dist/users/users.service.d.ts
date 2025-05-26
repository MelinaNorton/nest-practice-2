import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    validationCheck(username: string, password: string): Promise<NotFoundException | (import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })>;
    findByUser(username: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
