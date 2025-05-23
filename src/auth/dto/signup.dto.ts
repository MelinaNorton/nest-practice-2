import {IsString, IsInt, IsBoolean, Min, Max, IsOptional} from "@nestjs/class-validator";
import { Type } from 'class-transformer';

export class SignUpDto {
    @IsString()
    firstname : string;

    @IsString()
    lastname: string;

    @Type(()=> Number)
    @IsInt()
    @Min(0)
    @Max(100)
    age: number;

    @IsString()
    email: string;

    @Type(()=> Boolean)
    @IsBoolean()
    isCool: boolean;

    @IsString()
    password: string;

    @IsString()
    username : string;
}