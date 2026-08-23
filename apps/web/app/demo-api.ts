export type Money = { amountMinor: number; currency: "AOA" };

export type Wallet = { id: string; available: Money; currency: "AOA" };

export type PaymentAlias = {
  id: string;
  qrPayload: string;
  state: "ACTIVE" | "BLOCKED" | "REPLACED";
};

export type PaymentIntent = {
  id: string;
  state: string;
  quantity: number;
  unitAmountMinor: number;
  totalAmountMinor: number;
  expiresAt: string;
  stepUpRequired: boolean;
};

export type OwnerOverview = {
  verifiedRevenue: Money;
  pending: Money;
  available: Money;
  operatingReserved: Money;
  nextSettlementAt: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const tokens = {
  passenger: import.meta.env.VITE_DEMO_PASSENGER_TOKEN,
  collector: import.meta.env.VITE_DEMO_COLLECTOR_TOKEN,
  owner: import.meta.env.VITE_DEMO_OWNER_TOKEN,
};

export const demoApiEnabled = Boolean(
  apiBaseUrl && tokens.passenger && tokens.collector && tokens.owner,
);

function idempotencyKey(): string {
  return crypto.randomUUID();
}

async function request<T>(
  path: string,
  token: string | undefined,
  init: RequestInit = {},
): Promise<T> {
  if (!apiBaseUrl || !token) {
    throw new Error("API demo local não configurada.");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
  });
  const payload = (await response.json().catch(() => null)) as
    | { message?: string }
    | T
    | null;

  if (!response.ok) {
    throw new Error(
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : "Não foi possível concluir a operação demo.",
    );
  }
  return payload as T;
}

export function getPassengerWallet(): Promise<Wallet> {
  return request("/passenger/wallet", tokens.passenger);
}

export function getPassengerAlias(): Promise<PaymentAlias> {
  return request("/passenger/payment-alias", tokens.passenger);
}

export function createPaymentIntent(
  paymentAlias: string,
  quantity: number,
): Promise<PaymentIntent> {
  return request("/collector/payment-intents", tokens.collector, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey() },
    body: JSON.stringify({
      paymentAlias,
      quantity,
      fareRuleId: "10000000-0000-4000-8000-000000000050",
    }),
  });
}

export function approvePaymentIntent(intentId: string, pin: string) {
  return request<{ paymentId: string; totalAmountMinor: number }>(
    `/passenger/payment-intents/${intentId}/approve`,
    tokens.passenger,
    {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey() },
      body: JSON.stringify({
        approvalMethod: "PIN",
        pin,
        deviceProof: "web-demo-device-proof",
      }),
    },
  );
}

export function getOwnerOverview(): Promise<OwnerOverview> {
  return request("/owner/overview", tokens.owner);
}

export function closeOwnerSettlement() {
  return request<{ amountMinor: number }>("/owner/settlements/close", tokens.owner, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey() },
  });
}

export function createOperatingAllowance(amountMinor: number) {
  return request<{ amountMinor: number }>("/owner/operating-allowances", tokens.owner, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey() },
    body: JSON.stringify({
      collectorId: "10000000-0000-4000-8000-000000000021",
      amountMinor,
    }),
  });
}
