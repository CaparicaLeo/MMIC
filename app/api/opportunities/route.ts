import { NextResponse } from "next/server";

/**
 * Oportunidades (formulário de contato).
 *
 * Proxy server-side para `POST /api/opportunities` do backend — o token de
 * API mora em variável de ambiente no servidor (CONTACT_API_TOKEN) e nunca
 * chega ao bundle. O browser só conversa com esta rota (same-origin, sem
 * CORS); é este handler que adiciona o `Authorization: Bearer` e repassa a
 * chamada.
 *
 * Contrato do backend (config/api.php, VerifyApiToken, StoreOpportunityRequest):
 * - Token no cabeçalho, nunca em query string.
 * - Campos aceitos: email (obrigatório), name, phone, age, gender, message,
 *   source, type. Campos fora dessa lista são ignorados; opcionais vazios
 *   viram null.
 * - 201 `{ id, message }`; 422 `{ message, errors }`; 429 com `Retry-After`;
 *   401/403 genérios.
 */

const ACCEPTED_FIELDS = ["email", "name", "phone", "age", "gender", "message", "source", "type"] as const;

/** Normaliza `email`: minúsculo, sem espaços. */
function normalizeEmail(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

/** `source`: minúsculo, espaço→hífen, só [a-z0-9:_-], máx. 60. */
function normalizeSource(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9:_-]/g, "")
    .slice(0, 60);
}

export async function POST(request: Request) {
  const baseUrl = process.env.CONTACT_API_URL;
  const token = process.env.CONTACT_API_TOKEN;

  if (!baseUrl || !token) {
    /* Log do lado do servidor para diagnóstico — a mensagem enviada ao
       cliente continua genérica e não revela qual variável faltou. */
    console.warn("[opportunities] env ausente:", {
      CONTACT_API_URL: baseUrl ? "ok" : "ausente",
      CONTACT_API_TOKEN: token ? "ok" : "ausente",
    });
    return NextResponse.json(
      { message: "Serviço indisponível por enquanto. Tente novamente em instantes.", errors: {} },
      { status: 503 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "O corpo da requisição precisa ser JSON.", errors: {} },
      { status: 400 },
    );
  }

  if (typeof rawBody !== "object" || rawBody === null) {
    return NextResponse.json(
      { message: "O corpo da requisição precisa ser um objeto.", errors: {} },
      { status: 400 },
    );
  }

  const body = rawBody as Record<string, unknown>;

  const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
  if (!emailRaw) {
    return NextResponse.json(
      { message: "O campo e-mail é obrigatório.", errors: { email: "O campo e-mail é obrigatório." } },
      { status: 422 },
    );
  }

  const payload: Record<string, string | null> = { email: normalizeEmail(emailRaw) };

  for (const field of ACCEPTED_FIELDS) {
    if (field === "email") continue;

    const value = body[field];
    const normalized = typeof value === "string" ? value.trim() : "";

    // Obrigatório? Não — os opcionais vazios viram null (sem erro).
    if (!normalized) {
      payload[field] = null;
      continue;
    }

    switch (field) {
      case "source":
        payload.source = normalizeSource(value as string);
        break;
      case "type":
        payload.type = (value as string).trim().toLowerCase();
        break;
      default:
        payload[field] = normalized;
    }
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/opportunities`;

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Falha ao conectar com o servidor.", errors: {} },
      { status: 502 },
    );
  }

  const upstreamBody = await upstream.json().catch(() => null);

  /* Repasse fiel dos status que o backend define (201, 422, 429, 401, 403).
     Erros de autenticação são repassados como genéricos — nunca revelamos no
     cliente o que falhou no cabeçalho. */
  if (upstream.status === 201) {
    return NextResponse.json({ ok: true, ...upstreamBody }, { status: 201 });
  }

  if (upstream.status === 422) {
    return NextResponse.json(
      { ok: false, ...upstreamBody },
      { status: 422 },
    );
  }

  if (upstream.status === 429) {
    const retryAfter = upstream.headers.get("Retry-After");
    return NextResponse.json(
      { ok: false, retryAfter },
      { status: 429, headers: retryAfter ? { "Retry-After": retryAfter } : undefined },
    );
  }

  if (upstream.status === 401 || upstream.status === 403) {
    return NextResponse.json(
      { ok: false, message: "Não autorizado.", errors: {} },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { ok: false, message: "O servidor retornou um erro inesperado.", errors: {} },
    { status: 502 },
  );
}