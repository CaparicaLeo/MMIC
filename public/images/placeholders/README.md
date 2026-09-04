# Placeholders

Arquivos temporários com a **proporção final** de cada imagem da LP. Servem só
para o `next/image` reservar o espaço correto e não haver layout shift quando a
arte real entrar.

Para substituir:

1. coloque o arquivo definitivo em `public/images/` (jpg/webp/avif);
2. aponte o `src` no arquivo de conteúdo correspondente
   (`content/hero.ts`, `content/show.ts`, `content/event.ts`);
3. ajuste `width`/`height` se a proporção mudar — é ela que define o espaço
   reservado, não o componente.

| Arquivo    | Proporção | Onde aparece            | Conteúdo            |
| ---------- | --------- | ----------------------- | ------------------- |
| `hero.svg` | 16:9      | fundo do hero, parallax | `content/hero.ts`   |
| `show.svg` | 4:3       | bloco do show           | `content/show.ts`   |
| `og.svg`   | 1200×630  | Open Graph / Twitter    | `content/event.ts`  |

Imagens remotas (CDN/DAM) exigem liberar o host em `images.remotePatterns`
no `next.config.ts`.
