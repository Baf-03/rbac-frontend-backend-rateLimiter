import { Module } from '@nestjs/common';
import { userService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AdminController } from './controllers/admin/admin.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [userService],
  exports:[userService],
  controllers: [AdminController, UserController]
})

export class UserModule {}