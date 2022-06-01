import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { FindUserDto } from "./dtos/find-user.dto";
import { UserDto } from "./dtos/user.dto";

@Controller('auth')
export class AuthController{
    constructor( private readonly authService: AuthService){}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ) : Promise<UserDto>{
        return this.authService.register(createUserDto)
    }

    @Get('login')
    async login(
        @Body() userDto: FindUserDto
    ) : Promise<any>{
        return this.authService.loginByEmail(userDto.email, userDto.password)
    }
}