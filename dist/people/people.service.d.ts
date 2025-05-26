import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { People } from './interface/people.interface';
import { Model } from 'mongoose';
import { QueryPeopleDto } from './dto/query-people.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export interface PeopleFilter {
    firstname?: string;
    lastname?: string;
    age?: number;
    email?: string;
    isCool?: boolean;
    username?: string;
}
export declare class PeopleService {
    private readonly peopleModel;
    private jwtService;
    private configService;
    constructor(peopleModel: Model<People>, jwtService: JwtService, configService: ConfigService);
    create(createPersonDto: CreatePersonDto): Promise<People>;
    findAll(mergefilter: QueryPeopleDto): Promise<People[]>;
    findOneByName(name: string): Promise<People>;
    findEmailAnyName(name: string): Promise<{
        email: string;
    }>;
    findAgeFromName(name: string): Promise<{
        age: number;
    }>;
    findLastFromFirst(firstname: string): Promise<{
        lastname: string;
    }>;
    findFirstFromLast(lastname: string): Promise<{
        firstname: string;
    }>;
    findCoolPeople(isCool: boolean, filter?: PeopleFilter): Promise<People[]>;
    findAllAges(age: number, filter?: PeopleFilter): Promise<People[]>;
    updateFirstName(filter: PeopleFilter, newFirstName: string, updatePersonDto: UpdatePersonDto): Promise<import("mongoose").Document<unknown, {}, People, {}> & People & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePass(filter: PeopleFilter, newPass: string, updatePersonDto: UpdatePersonDto): Promise<import("mongoose").Document<unknown, {}, People, {}> & People & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeByAnyName(name: string): Promise<People>;
}
