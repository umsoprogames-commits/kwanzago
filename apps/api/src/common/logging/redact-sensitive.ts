const SENSITIVE_KEY =
  /authorization|cookie|deviceid|deviceproof|email|externalsubject|fullname|latitude|longitude|otp|ownerid|password|paymentalias|phone|pin|profileid|qrpayload|secret|session|subjectid|token|uid|userid/i;

const BEARER_TOKEN = /\bBearer\s+[^\s,;]+/gi;
const LABELLED_SECRET =
  /\b(authorization|cookie|deviceId|deviceProof|email|externalSubject|fullName|latitude|longitude|otp|ownerId|password|paymentAlias|phone|pin|profileId|qrPayload|secret|session|subjectId|token|uid|userId)\s*[:=]\s*([^\s,;]+)/gi;

function redactString(value: string): string {
  return value
    .replace(BEARER_TOKEN, 'Bearer [REDACTED]')
    .replace(LABELLED_SECRET, '$1=[REDACTED]');
}

export function redactSensitive(
  value: unknown,
  visited = new WeakSet<object>(),
): unknown {
  if (typeof value === 'string') {
    return redactString(value);
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (visited.has(value)) {
    return '[CIRCULAR]';
  }
  visited.add(value);

  if (value instanceof Error) {
    return {
      name: value.name,
      message: redactString(value.message),
      stack: value.stack ? redactString(value.stack) : undefined,
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactSensitive(item, visited));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      SENSITIVE_KEY.test(key) ? '[REDACTED]' : redactSensitive(item, visited),
    ]),
  );
}
