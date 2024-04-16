import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // não aceita props que não estão na validação.
    }),
  ); // maneira global de testar todos as validações. Evita importar em todo controller.
  await app.listen(3000);
}
bootstrap();
