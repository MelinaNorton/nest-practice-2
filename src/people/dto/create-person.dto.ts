import {IsString, IsInt, IsBoolean, Min, Max, IsOptional} from "@nestjs/class-validator";
export class CreatePersonDto {

    @IsString()
    readonly firstname : String;

    @IsString()
    lastname: String;

    @IsInt()
    @Min(0)
    @Max(100)
    age: Number;

    @IsString()
    email: String;

    @IsBoolean()
    isCool: Boolean;
}
