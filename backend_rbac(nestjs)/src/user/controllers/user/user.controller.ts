import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/enums/role';
import { userService } from 'src/user/services/user.service';

@Controller('user')
@UseGuards(RolesGuard) // Apply the RolesGuard to all routes in this controller
@Roles(Role.User) 
export class UserController {
    constructor(private readonly userService:userService){}


    @Get("/")
    helloUser(){
        return "hello Normal User"
    }
    
}
