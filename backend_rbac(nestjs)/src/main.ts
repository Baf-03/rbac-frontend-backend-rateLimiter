import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173', // Explicitly specify your frontend origin
    credentials: true, // Allow cookies to be sent and received
  });
  app.setGlobalPrefix("api")
  await app.listen(3000);
}
bootstrap();