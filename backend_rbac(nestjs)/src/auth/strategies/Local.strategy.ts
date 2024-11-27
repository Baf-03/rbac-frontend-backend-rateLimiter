import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstant } from "src/user/enums/jwt.constant";
import { userService } from "src/user/services/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly userService:userService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtConstant.Secret,
            ignoreExpiration:false
        })
    }

    async validate(payload:any){
        const {email} =  payload;
        console.log("hello world",email)
        console.log(email)
        try{
            return await this.userService.authUser(email)

        }catch(err){
            console.log("idhar aya hae error  ",err)
        }
    }
    

}