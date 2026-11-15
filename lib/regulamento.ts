import { regulamento } from "@/content/regulamento";

export type RegulamentoBlock =
  | { type: "clause"; number: string; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "paragraph"; text: string };

export type RegulamentoSection = {
  id: string;
  number: string;
  title: string;
  blocks: RegulamentoBlock[];
};

export type Regulamento = {
  title: string;
  /** Texto antes da primeira seção numerada, se houver. */
  intro: RegulamentoBlock[];
  sections: RegulamentoSection[];
  /** Fecho com local e data ("Curitiba, 10 de novembro de 2026."). */
  closing: string | null;
  fetchedAt: Date;
};

const SECTION = /^(\d+)\.\s+(.+)$/;
const CLAUSE = /^(\d+(?:\.\d+)+)\.?\s+(.*)$/;
const BULLET = /^[*•●-]\s+(.*)$/;
const CLOSING = /^curitiba,\s/i;

/**
 * Lê o texto exportado do Google Doc e devolve a estrutura do regulamento.
 *
 * A estrutura sai da numeração do próprio documento: "1. DO EVENTO" abre
 * seção, "1.1." / "6.4.1." são cláusulas, "* " é item de lista, o resto é
 * parágrafo. Uma linha só vira seção quando o título está em caixa alta, para
 * "1. qualquer frase" no meio do texto não quebrar a página.
 */
export function parseRegulamento(text: string): Omit<Regulamento, "fetchedAt"> {
  const lines = text
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const title = lines.shift() ?? "Regulamento";
  const intro: RegulamentoBlock[] = [];
  const sections: RegulamentoSection[] = [];
  let closing: string | null = null;

  const push = (block: RegulamentoBlock) => {
    const target = sections.at(-1)?.blocks ?? intro;
    const last = target.at(-1);
    if (block.type === "bullets" && last?.type === "bullets") {
      last.items.push(...block.items);
      return;
    }
    target.push(block);
  };

  for (const line of lines) {
    const section = SECTION.exec(line);
    if (section && section[2] === section[2].toLocaleUpperCase("pt-BR")) {
      sections.push({
        id: `secao-${section[1]}`,
        number: section[1],
        title: section[2].replace(/\.$/, ""),
        blocks: [],
      });
      continue;
    }

    const clause = CLAUSE.exec(line);
    if (clause) {
      push({ type: "clause", number: clause[1], text: clause[2] });
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) {
      push({ type: "bullets", items: [bullet[1]] });
      continue;
    }

    if (CLOSING.test(line)) {
      closing = line;
      continue;
    }

    push({ type: "paragraph", text: line });
  }

  return { title, intro, sections, closing };
}

/** Busca e interpreta o regulamento. `null` quando o Google não responde. */
export async function getRegulamento(): Promise<Regulamento | null> {
  try {
    const response = await fetch(regulamento.textUrl, {
      next: { revalidate: regulamento.revalidateSeconds },
    });
    if (!response.ok) return null;
    const parsed = parseRegulamento(await response.text());
    if (parsed.sections.length === 0) return null;
    return { ...parsed, fetchedAt: new Date() };
  } catch {
    return null;
  }
}
