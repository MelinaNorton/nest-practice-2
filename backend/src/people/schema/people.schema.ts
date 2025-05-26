import { Schema } from 'mongoose'

export const PeopleSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isCool: { type: Boolean, required: true },
    username : { type : String, required : true},
    password: { type : String, required : true},
});