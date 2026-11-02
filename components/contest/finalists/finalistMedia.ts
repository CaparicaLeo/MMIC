import type { ContestFinalist } from "@/content/contestFinalists";
import type { Media } from "@/content/types";

/**
 * Converte os caminhos de imagem de uma finalista em `Media`.
 *
 * A proporção é a do layout (ver o comentário de content/contestFinalists.ts),
 * não a do arquivo: `width`/`height` aqui só reservam o espaço. Os alts saem
 * de nome e título para toda imagem dizer de quem é e o que mostra.
 */
export function finalistMedia(finalist: ContestFinalist) {
  const { nome, titulo } = finalist;

  return {
    avatar: {
      src: finalist.avatar,
      alt: `Retrato de ${nome}`,
      width: 1,
      height: 1,
    },
    camisa: {
      src: finalist.imagemCamisa,
      alt: `Arte “${titulo}”, de ${nome}, proposta para a camisa oficial`,
      width: 16,
      height: 9,
    },
    conceito: {
      src: finalist.imagemConceito,
      alt: `Imagem de referência do conceito da arte “${titulo}”, de ${nome}`,
      width: 16,
      height: 10,
    },
    aplicacao: {
      src: finalist.imagemAplicacao,
      alt: `Arte “${titulo}”, de ${nome}, aplicada na camisa técnica preta`,
      width: 3,
      height: 4,
    },
  } satisfies Record<string, Media>;
}
