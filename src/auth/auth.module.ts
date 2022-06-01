import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
        defaultStrategy: 'jwt',
        property: 'user',
        session: false
    }),
    JwtModule.register({
        secret: `${process.env.SECRETKEY}`, 
        signOptions: {expiresIn: 3600},
    })],
    providers:[AuthService, JwtStrategy],
    controllers:[AuthController]
})
export class AuthModule {}
