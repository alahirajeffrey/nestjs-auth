import { IsEmail, IsString } from "class-validator";

export class FindUserDto{

    @IsString()
    id: string
    
    @IsEmail()
    email : string

    @IsString()
    password : string
}