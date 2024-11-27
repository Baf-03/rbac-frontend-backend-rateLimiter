import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {



    @Get("/")
    helloAdmin(){
        return ("hello ADMIN")
    }


}
