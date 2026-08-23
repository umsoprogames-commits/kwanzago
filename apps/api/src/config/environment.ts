import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DEMO_MODE: z.literal('true').transform(() => true),
  DATABASE_URL: z
    .string()
    .min(1)
    .refine(
      (value) =>
        value.startsWith('postgresql://') || value.startsWith('postgres://'),
      'deve usar o protocolo PostgreSQL',
    ),
  JWT_ISSUER: z.string().url(),
  JWT_AUDIENCE: z.string().min(1).max(128),
  DEMO_WEB_ORIGIN: z.string().url().default('http://127.0.0.1:39003'),
  DEMO_PASSENGER_TOKEN: z.string().min(16).max(256),
  DEMO_COLLECTOR_TOKEN: z.string().min(16).max(256),
  DEMO_OWNER_TOKEN: z.string().min(16).max(256),
  DEMO_PASSENGER_PIN: z.string().regex(/^\d{4,6}$/),
});

export type Environment = z.infer<typeof environmentSchema>;

export function validateEnvironment(
  values: Record<string, unknown>,
): Environment {
  const result = environmentSchema.safeParse(values);

  if (!result.success) {
    const fields = result.error.issues
      .map((issue) => issue.path.join('.') || 'configuração')
      .join(', ');
    throw new Error(`Configuração inválida nos campos: ${fields}`);
  }

  return result.data;
}
