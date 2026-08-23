process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DEMO_MODE = 'true';
process.env.DATABASE_URL =
  'postgresql://kwanzago:synthetic@127.0.0.1:55432/kwanzago_test';
process.env.JWT_ISSUER = 'https://auth.demo.kwanzago.ao';
process.env.JWT_AUDIENCE = 'kwanzago-api';
process.env.DEMO_PASSENGER_TOKEN = 'demo-passenger-token-001';
process.env.DEMO_COLLECTOR_TOKEN = 'demo-collector-token-001';
process.env.DEMO_OWNER_TOKEN = 'demo-owner-token-001';
process.env.DEMO_PASSENGER_PIN = '2468';
