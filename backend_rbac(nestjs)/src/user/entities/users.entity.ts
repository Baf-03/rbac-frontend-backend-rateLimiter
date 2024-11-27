import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role";




@Entity()

export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({default:true})
    isActive:boolean;

    @Column({
        type:"enum",
        enum:Role,
        default:Role.User
    })
    role:Role

}