import { IsEmail, isEmail, IsString, isString } from "class-validator";

export class CreateUserDto{

    @IsString()
    fullName : string

    @IsEmail()
    email : string

    @IsString()
    password: string
}