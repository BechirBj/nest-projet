import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if there's a proprietary does not exist in the User Class
      forbidNonWhitelisted: true, // to display the error message "Phone number should not exist"
      transform:true, // ensures that incoming plain objects are automatically transformed into instances of the DTO classes.

    }),
  )
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
