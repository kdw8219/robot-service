// Ensure `crypto` is available (some Node builds or runtimes may not expose global `crypto`)
if (typeof (globalThis as any).crypto === 'undefined') {
  // Use Node's crypto module (provides randomUUID and other primitives)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  (globalThis as any).crypto = require('crypto');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
    }
  ));
  const host = '0.0.0.0';
  await app.listen(process.env.PORT ?? 3001, host);
}
bootstrap();
