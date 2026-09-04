const LOCALE = "pt-BR";

/** Formata números no padrão brasileiro (10.000, 43,5). */
export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Data por extenso. Só usada quando `event.date` deixar de ser null —
 * nenhuma data é exibida na LP de lançamento.
 */
export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
