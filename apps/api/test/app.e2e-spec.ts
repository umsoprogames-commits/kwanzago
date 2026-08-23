import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { configureApplication } from '../src/configure-application.js';

describe('API foundation (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    configureApplication(app);
    await app.init();
  });

  it('não expõe endpoint fora do OpenAPI e mantém correlação', () => {
    const server = app.getHttpServer();

    return request(server)
      .get('/v1/not-defined')
      .expect('x-correlation-id', /^[0-9a-f-]{36}$/i)
      .expect((response) => {
        expect(response.headers).not.toHaveProperty('x-powered-by');
      })
      .expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
