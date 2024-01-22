import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AllExceptionFilter } from './all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors({
    credentials: true,
    origin: `http://${process.env.HOST_IP}:3000`,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
