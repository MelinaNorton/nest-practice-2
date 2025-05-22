import {IsString, IsInt, IsBoolean, Min, Max, IsOptional} from "@nestjs/class-validator";
import { Type } from 'class-transformer';

export class SignUpDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}