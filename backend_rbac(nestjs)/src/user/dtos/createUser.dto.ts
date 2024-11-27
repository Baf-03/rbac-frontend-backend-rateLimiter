import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class createUserDto{

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsOptional()
    @IsIn([0, 1], { message: 'Role must be either 0 (Admin) or 1 (User)' })
    role: number;
}