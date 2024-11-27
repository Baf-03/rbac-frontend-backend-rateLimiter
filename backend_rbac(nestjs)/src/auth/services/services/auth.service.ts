import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { createUserDto } from 'src/user/dtos/createUser.dto';
import { userService } from 'src/user/services/user.service';

@Injectable()
export class authService {
    constructor(private readonly userService:userService,
        private jwt:JwtService){}

   async login(dto:createUserDto,response: Response){
        const userExist = await this.userService.validateUser(dto);
        const {email} = userExist
        const payload ={
            email
        }
        const token = this.jwt.sign(payload)
        response.cookie('auth_token', token, {
            httpOnly: false,  // Prevents JavaScript from accessing the cookie
            secure: false,   // For local development, set to false if not using HTTPS
            maxAge: 60 * 60 * 1000,  // 1 hour
          });
        return ({
            user:userExist,
            token
        })
    }

    async register(dto:createUserDto){
        return this.userService.createUser(dto)
    }
    
}