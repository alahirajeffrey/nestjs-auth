import { BadGatewayException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserDto } from "./dtos/user.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    // login user by email
    async loginByEmail(email : string, password : string) : Promise<any>{
        const savedUser = await this.userRepository.findOne({email:email})
        
        // return error if user is not available
        if(!savedUser) throw new HttpException("User not found", HttpStatus.UNAUTHORIZED)

        //compare passwords
        const paswordComparison = await compare(savedUser.password, password)

        // return error is password is not correct
        if(paswordComparison) throw new HttpException("Incorrect Password", HttpStatus.UNAUTHORIZED)

        const payload = {email: savedUser.email, id: savedUser.id}

        return {
            accessToken: this.jwtService.sign(payload)
        }
        
    }

    // register user
    async register(createUserDto: CreateUserDto): Promise<UserDto>{
        
        //check if user already exists
        const userExists = await this.userRepository.findOne({email : createUserDto.email})

        // return error if user already exists
        if(userExists) throw new HttpException("User already esists", HttpStatus.BAD_REQUEST)

        //hash password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12)

        if(!hashedPassword) throw new HttpException("Error Occured",HttpStatus.UNAUTHORIZED)

        const newUser : CreateUserDto = {
                password: hashedPassword,
                email: createUserDto.email,
                fullName: createUserDto.fullName
                }

        // register user
        const savedUser = await this.userRepository.save(newUser)

        if(!savedUser) throw new HttpException("Error Occured",HttpStatus.UNAUTHORIZED)

        const user : UserDto = {
                id: savedUser.id,
                email: savedUser.email
            }
        return user
    }
}