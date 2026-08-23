import type { NextFunction, Response } from 'express';
import type { ActorRequest } from '../auth/actor-request.js';
import { CorrelationIdMiddleware } from './correlation-id.middleware.js';

describe('CorrelationIdMiddleware', () => {
  it('substitui identificador inválido sem o devolver nos logs', () => {
    const request = {
      header: jest.fn().mockReturnValue('token-ou-identificador-invalido'),
    } as unknown as ActorRequest;
    const setHeader = jest.fn();
    const response = { setHeader } as unknown as Response;
    const next = jest.fn() as NextFunction;

    new CorrelationIdMiddleware().use(request, response, next);

    expect(request.correlationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(request.correlationId).not.toContain('token');
    expect(setHeader).toHaveBeenCalledWith(
      'x-correlation-id',
      request.correlationId,
    );
    expect(next).toHaveBeenCalledTimes(1);
  });
});
