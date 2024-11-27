import { Module } from '@nestjs/common';
import { authController } from './controllers/auth.controller';
import { authService } from './services/services/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/user/enums/jwt.constant';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LocalStrategy } from './strategies/Local.strategy';

@Module({
  imports:[UserModule,JwtModule.register({
    global: true,
    secret: jwtConstant.Secret,
    signOptions: { expiresIn: '6000s' },
  }),],
  controllers: [authController],
  providers: [authService,LocalStrategy]
})

export class AuthModule {}