import { Schema } from 'mongoose'
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
    username : { type : String, required : true},
    password: { type : String, required : true}
})

