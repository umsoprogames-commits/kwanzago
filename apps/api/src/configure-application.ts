import type { NestExpressApplication } from '@nestjs/platform-express';

export function configureApplication(
  app: NestExpressApplication,
  demoWebOrigin = 'http://127.0.0.1:39003',
): void {
  app.disable('x-powered-by');
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: demoWebOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Idempotency-Key'],
  });
  app.enableShutdownHooks();
}
