import { IsString, IsInt, IsBoolean, Min, Max, IsOptional } from "@nestjs/class-validator";
import { Type } from 'class-transformer';

export class QueryPeopleDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    age?: number;

    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    isCool?: string;
}