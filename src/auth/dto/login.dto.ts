import {IsString, IsInt, IsBoolean, Min, Max, IsOptional} from "@nestjs/class-validator";
import { Type } from 'class-transformer';

export class Login {

    @IsString()
    email: string;

    @IsString()
    password: string;
}