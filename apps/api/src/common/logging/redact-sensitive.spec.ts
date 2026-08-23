import { redactSensitive } from './redact-sensitive.js';

describe('redactSensitive', () => {
  it('remove segredos e identificadores sensíveis de estruturas aninhadas', () => {
    const input = {
      authorization: 'Bearer token-integral',
      body: {
        pin: '1234',
        paymentAlias: 'alias-integral',
        passenger: { email: 'person@example.test' },
        quantity: 2,
      },
    };

    expect(redactSensitive(input)).toEqual({
      authorization: '[REDACTED]',
      body: {
        pin: '[REDACTED]',
        paymentAlias: '[REDACTED]',
        passenger: { email: '[REDACTED]' },
        quantity: 2,
      },
    });
  });

  it('remove tokens bearer e segredos identificados em mensagens', () => {
    const result = String(
      redactSensitive(
        'authorization=Bearer.payload.signature pin=1234 uid=04AABBCC latitude=-8.8',
      ),
    );

    expect(result).not.toContain('Bearer.payload.signature');
    expect(result).not.toContain('1234');
    expect(result).not.toContain('04AABBCC');
    expect(result).not.toContain('-8.8');
    expect(result).toContain('[REDACTED]');
  });
});
