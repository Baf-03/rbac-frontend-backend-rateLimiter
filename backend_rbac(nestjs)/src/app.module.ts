import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'db.config';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [TypeOrmModule.forRoot(pgConfig),AuthModule, UserModule,RateLimiterModule.register({
    points: 5, // Number of requests
    duration: 60, // Per 60 seconds
    errorMessage: 'Too many requests, please try again later.', // Custom error message
  })],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RateLimiterGuard,
  },],
})
export class AppModule {}