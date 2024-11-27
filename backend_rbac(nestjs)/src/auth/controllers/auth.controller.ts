import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { createUserDto } from 'src/user/dtos/createUser.dto';
import { authService } from '../services/services/auth.service';
import { RateLimit } from 'nestjs-rate-limiter';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'src/user/enums/role';
import { Response } from 'express';

@Controller('auth')
export class authController {

    constructor(private readonly authService:authService){}
    
    @Post("/register")
    async register(
        @Body() userDto:createUserDto
    ){
        return await this.authService.register(userDto)
    }

    // @RateLimit({ keyPrefix: 'sign-up', points: 1, duration: 60, errorMessage: 'Accounts cannot be created more than once in per minute' })
    @Post("/login")
    async login(
        @Body() userDto:createUserDto ,
        @Res({ passthrough: true }) response: Response, // Use @Res for cookie handling
    ) {
      return await this.authService.login(userDto, response);
    }


    @Get("/admin-verify")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getAdminData(@Request() req) {
      return `Hello Admin ${req.user.email}`;
    }

    @Get("/user-verify")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    getuserData(@Request() req) {
      return `Hello Normal Creature ${req.user.email}`;
    }
}
