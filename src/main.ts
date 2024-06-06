import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if there's a proprietary does not exist in the User Class
      forbidNonWhitelisted: true, // to display the error message "Phone number should not exist"
      transform:true, // ensures that incoming plain objects are automatically transformed into instances of the DTO classes.

    }),
  )
  await app.listen(3000);
}
bootstrap();
