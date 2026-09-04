# Placeholders

Arquivos temporários com a **proporção final** de cada imagem da LP. Servem só
para o `next/image` reservar o espaço correto e não haver layout shift quando a
arte real entrar.

Para substituir:

1. coloque o arquivo definitivo em `public/images/` (jpg/webp/avif);
2. aponte o `src` no arquivo de conteúdo correspondente;
3. ajuste `width`/`height` se a proporção mudar — é ela que define o espaço
   reservado, não o componente.

| Arquivo    | Proporção | Onde aparece         | Conteúdo           |
| ---------- | --------- | -------------------- | ------------------ |
| `og.svg`   | 1200×630  | Open Graph / Twitter | `content/event.ts` |
| `show.png` | 2080×1440 | bloco do show        | `content/show.ts`  |

Já substituídos pela arte definitiva — os placeholders foram removidos:

| Arte                     | Proporção | Onde aparece            | Conteúdo          |
| ------------------------ | --------- | ----------------------- | ----------------- |
| `../hero.jpg`            | 16:9      | fundo do hero, parallax | `content/hero.ts` |
| `../mmic-logo.png`       | 950×242   | header e rodapé         | `content/event.ts` |
| `../curitiba-e-rock.png` | 1177×395  | fecho da seção final    | `content/cta.ts`  |

Imagens remotas (CDN/DAM) exigem liberar o host em `images.remotePatterns`
no `next.config.ts`.
