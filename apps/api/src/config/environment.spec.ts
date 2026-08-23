import { validateEnvironment } from './environment.js';

const validEnvironment = {
  NODE_ENV: 'test',
  PORT: '3001',
  DEMO_MODE: 'true',
  DATABASE_URL: 'postgresql://kwanzago:synthetic@127.0.0.1:55432/kwanzago_test',
  JWT_ISSUER: 'https://auth.demo.kwanzago.ao',
  JWT_AUDIENCE: 'kwanzago-api',
  DEMO_PASSENGER_TOKEN: 'demo-passenger-token-001',
  DEMO_COLLECTOR_TOKEN: 'demo-collector-token-001',
  DEMO_OWNER_TOKEN: 'demo-owner-token-001',
  DEMO_PASSENGER_PIN: '2468',
};

describe('validateEnvironment', () => {
  it('aceita apenas o modo de demonstração explícito', () => {
    expect(validateEnvironment(validEnvironment)).toMatchObject({
      NODE_ENV: 'test',
      PORT: 3001,
      DEMO_MODE: true,
    });
  });

  it('recusa configuração sem base de dados', () => {
    const withoutDatabase = { ...validEnvironment, DATABASE_URL: undefined };

    expect(() => validateEnvironment(withoutDatabase)).toThrow('DATABASE_URL');
  });

  it('não inclui o valor inválido no erro de configuração', () => {
    const secretValue = 'segredo-invalido';
    const validateInvalidIssuer = () =>
      validateEnvironment({ ...validEnvironment, JWT_ISSUER: secretValue });

    expect(validateInvalidIssuer).toThrow('JWT_ISSUER');
    expect(validateInvalidIssuer).not.toThrow(secretValue);
  });

  it('não permite activar fundos reais por configuração', () => {
    expect(() =>
      validateEnvironment({ ...validEnvironment, DEMO_MODE: 'false' }),
    ).toThrow('DEMO_MODE');
  });
});
