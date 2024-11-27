import { ConflictException, GoneException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from '../dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { Role } from '../enums/role';

@Injectable()
export class userService {
   constructor(@InjectRepository(User) private userRepo:Repository<User>){}

   async createUser(dto:createUserDto){
        const {email,password,role} = dto

        const userExist = await this.userRepo.findOne({
            where:{
                email
            }
        })
        if(userExist){
            throw new ConflictException("email already in use!")
        }
        let hashedPassword:string;
        try{
            hashedPassword = await bcrypt.hash(password,10);

        }catch(err){
            throw new GoneException(err)
        }
    
        const objToSave ={
            email,
            password:hashedPassword,
            role: role==0?Role.Admin:Role.User
        }
        return await this.userRepo.save(objToSave)
    }

    async validateUser(dto:createUserDto){
        const {email,password} = dto
        const userExist = await this.userRepo.findOne({
            where:{
                email
            }
        })
        if(!userExist){
            throw new NotFoundException("user not Found!")
        }

        const isValidPassword = await bcrypt.compare(password,userExist.password);
        if(!isValidPassword){
            throw new UnauthorizedException("inCorrect Password!")
        }
        return userExist
    }

    async authUser(email:string){   
        console.log("andr agaya hon mae")
        const userExist = await this.userRepo.findOne({
            where:{
                email
            }
        })
        console.log(userExist)
        if(!userExist){
            console.log("mae chaala hon ab XD")
            throw new NotFoundException("email not found!")
        }
        console.log("mae beh chal gaya bhaiXD")
        return userExist
    }
}