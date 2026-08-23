import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './common/auth/authenticated.guard.js';
import { AuthorizationModule } from './common/auth/authorization.module.js';
import { DemoSessionMiddleware } from './common/auth/demo-session.middleware.js';
import { RolesGuard } from './common/auth/roles.guard.js';
import { CorrelationIdMiddleware } from './common/http/correlation-id.middleware.js';
import { SafeLogger } from './common/logging/safe-logger.js';
import { validateEnvironment } from './config/environment.js';
import { PrismaModule } from './database/prisma.module.js';
import { DemoPaymentsModule } from './demo/demo-payments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
      validate: validateEnvironment,
    }),
    AuthorizationModule,
    PrismaModule,
    DemoPaymentsModule,
  ],
  providers: [
    SafeLogger,
    DemoSessionMiddleware,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware, DemoSessionMiddleware).forRoutes({
      path: '{*path}',
      method: RequestMethod.ALL,
    });
  }
}
