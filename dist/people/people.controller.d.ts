import { CreatePersonDto } from './dto/create-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto): Promise<import("./interface/people.interface").People>;
    findAll(query: QueryPeopleDto): Promise<import("./interface/people.interface").People[]>;
    findOne(name: string): Promise<import("./interface/people.interface").People>;
    findOneEmail(name: string): Promise<{
        email: string;
    }>;
    getLastfromFirst(firstname: string): Promise<{
        lastname: string;
    }>;
    getFirstFromLast(lastname: string): Promise<{
        firstname: string;
    }>;
    getAgeFromName(name: string): Promise<{
        age: number;
    }>;
    update(firstnameparam: string, newFirstName: string, updatePersonDto: UpdatePersonDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/people.interface").People, {}> & import("./interface/people.interface").People & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(name: string): Promise<import("./interface/people.interface").People>;
}
