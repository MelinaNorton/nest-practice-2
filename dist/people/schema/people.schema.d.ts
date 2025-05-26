import { Schema } from 'mongoose';
export declare const PeopleSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    isCool: boolean;
    username: string;
    password: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    isCool: boolean;
    username: string;
    password: string;
}>, {}> & import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    isCool: boolean;
    username: string;
    password: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
