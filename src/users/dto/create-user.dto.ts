import {IsString, IsInt, IsBoolean, Min, Max, IsOptional} from "@nestjs/class-validator";
import { Type } from 'class-transformer';

export class CreateUserDto {

    @IsString()
    username : string;

    @IsString()
    password: string;
}
