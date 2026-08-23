import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { SafeLogger } from './common/logging/safe-logger.js';
import { configureApplication } from './configure-application.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const config = app.get(ConfigService);

  app.useLogger(app.get(SafeLogger));
  configureApplication(app, config.getOrThrow<string>('DEMO_WEB_ORIGIN'));

  await app.listen(config.getOrThrow<number>('PORT'));
}

void bootstrap();
