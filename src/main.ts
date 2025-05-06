import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // forbidUnknownValues: false
  }));

  // await app.listen(process.env.PORT ?? 3000);

  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';  // Escuchar en todas las interfaces de red.
  await app.listen(port, host);
}
bootstrap();
