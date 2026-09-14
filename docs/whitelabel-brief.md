# Briefing: transformar o MMIC em whitelabel de eventos

> Documento de handoff para outro agente de IA. Contém o levantamento do estado atual,
> a decisão de arquitetura e o plano de execução. Escrito sobre a `main` no commit
> `649ebdb` (9 de setembro de 2026).

## 1. Objetivo

Transformar a landing page da Meia Maratona Internacional de Curitiba 2027 (repo
`CaparicaLeo/MMIC`) em um template capaz de servir vários eventos, sem duplicar o
repositório e sem que um evento novo exija editar componente.

Meta concreta: **o segundo evento deve custar preencher um objeto tipado e trocar uma
pasta de imagens** — 4 a 6 horas, não uma semana.

## 2. Contexto do repositório

- Next.js **16.3.4** (App Router), React **19.2.8**, TypeScript, Tailwind CSS **v4**
  (sem `tailwind.config`; tokens no `@theme` de `app/globals.css`), GSAP 3.15 +
  `@gsap/react`.
- `AGENTS.md` na raiz é obrigatório: **esta versão do Next tem breaking changes; leia
  o guia relevante em `node_modules/next/dist/docs/` antes de escrever código.** O bloco
  do AGENTS.md é reescrito pelo `next dev` — commitar a alteração junto com o trabalho
  mantém a árvore limpa.
- Idioma do projeto: **português do Brasil**. Copy, comentários e mensagens de commit em
  pt-BR; identificadores em inglês. Commits seguem Conventional Commits
  (`feat(escopo): …`).
- Comentários no código explicam **o porquê**, não o quê — vários registram medições
  reais (métricas de fonte, cálculo de parallax). Preserve-os ao mover código; eles são
  a memória das decisões.
- Verificação antes de qualquer entrega: `npx tsc --noEmit`, `npm run lint`, `npm run build`.

### Tamanho (linhas, `wc -l`)

| Camada | Arquivos | Linhas | Natureza |
| --- | --- | --- | --- |
| `content/` | 13 | 678 | do evento |
| `components/` | 32 | 2.769 | misto (ui/ e infra são motor) |
| `app/` | 11 | 381 | misto |
| `lib/` | 6 | 359 | motor |
| `app/globals.css` | 1 | 187 | misto (tema) |
| `public/images/` | 5 | 1,9 MB | do evento |

## 3. Estado atual — o que já favorece o whitelabel

Não refaça o que já está pronto:

1. **Conteúdo fora do JSX, com tipos.** Toda a copy vive em `/content` (13 arquivos,
   barril em `content/index.ts`). `content/types.ts` (109 linhas) já é, na prática, o
   esquema do evento: `Media`, `Cta`, `SectionIntro`, `DistanceItem`, `StatItem`,
   `FeatureItem`, `FaqItem`, `TimelineItem`, `GrowthPoint`, `NavItem`,
   `PlaceholderModal`. **Use esses tipos como base do `EventConfig`; não invente um
   esquema novo.**
2. **Home é composição.** `app/(site)/page.tsx` monta 9 seções em 9 linhas.
3. **Fontes desacopladas do tema.** `app/fonts.ts` publica `--ff-display`, `--ff-body`,
   `--ff-condensed`; o `@theme` aponta para elas via `--font-*`. O prefixo diferente é
   intencional (ver comentário no arquivo) — não unifique os nomes.
4. **CTA é indireção.** `Cta.action: "register" | "link"`; `components/registration/RegisterButton.tsx`
   resolve os dois ramos. Foi o que permitiu apontar todos os CTAs para a lista de avisos
   sem tocar em componente.
5. **Estados vazios já são dados.** `event.date: null` desliga `<Countdown>`;
   `show.headliner: null` cai em placeholder; `NavItem.comingSoon` marca rota sem
   conteúdo. Um evento novo nasce "em breve" sem condicional em código.
6. **SEO derivado.** `metadataBase`, canonical por rota, OG, `app/sitemap.ts` e
   `app/robots.ts` leem `siteUrl`, que vem de `NEXT_PUBLIC_SITE_URL`.
7. **Motor puro (reaproveita sem editar):** `components/ui/` (14 primitivas) e `lib/`.

## 4. Inventário de bloqueios

Ordenado por peso. Linhas conferidas no commit `649ebdb`.

| # | Ponto | Onde | Peso | Correção esperada |
| --- | --- | --- | --- | --- |
| 1 | Conteúdo é singleton de módulo, não objeto | `content/*.ts` | bloqueia | Tipo raiz `EventConfig`; os arquivos viram fatias de um objeto resolvido uma vez |
| 2 | Headline com destaque escrita no JSX | `components/sections/ConceptSection.tsx:40`, `ShowSection.tsx:76`, `FinalCtaSection.tsx:44-50` | bloqueia | `lines: [{ text, highlight? }]` no conteúdo; o padrão de `hero.headlineLines` já aponta o caminho |
| 3 | Copy das rotas "em breve" dentro do `page.tsx` (metadata inclusive, ~70 linhas) | `app/(site)/inscricao/page.tsx`, `cronograma/`, `marcas/`, `imprensa/`, `not-found.tsx` | bloqueia | `content/pages.ts` indexado por rota |
| 4 | Tema em CSS com hexes literais, e hexes soltos fora dele | `app/globals.css`; `components/ui/Section.tsx:10` e `components/layout/SiteFooter.tsx:9` (`#060606`); `app/layout.tsx` (`themeColor: "#0A0A0A"`) | bloqueia | Paleta como dado, emitida como custom properties no `<html>`; `@theme` vira default |
| 5 | Microcopy de interface no componente | `SiteHeader.tsx:98` ("Menu"/"Fechar"), `SiteFooter.tsx:29` (tagline) e `:49` ("em breve"), `SiteHeader.tsx:120`, `ShowSection.tsx:105` ("Line-up"), `StatsSection.tsx:99` (nota de meta), `app/(site)/layout.tsx:23` ("Pular para o conteúdo"), `components/layout/ComingSoonPage.tsx` ("Voltar para a home") | atrito | `content/ui.ts` — abre i18n de graça |
| 6 | Métricas de cartaz calibradas para a Anton | `app/globals.css` (`headline`, `.headline.headline`, `headline-mask`) | atrito | Tokens por tema: entrelinha e folga de acento |
| 7 | Domínio "corrida" dentro do componente | `components/seo/EventJsonLd.tsx:19,26,48` (`SportsEvent`, `sport: "Corrida de rua"`), `DistancesSection`, `ShowSection`, `StatsSection` | atrito | Tipo/modalidade por dado; seções viram blocos opcionais |
| 8 | Navegação com âncoras fixas | `content/navigation.ts` (`/#conceito`, `/#o-dia`…) | atrito | Menu derivado da lista de seções ativas |
| 9 | Assets sem namespace por evento | `public/images/` (`mmic-logo.png`, `hero.jpg`, `curitiba-e-rock.png`) | atrito | `public/events/<slug>/` + `assetBase` no config (`next.config.ts` já reserva `remotePatterns`) |
| 10 | Set de ícones fixo em 5 chaves | `components/ui/Icon.tsx` (chaves batem com `structure.items[].icon`) | atrito | Set maior ou SVG por dado; aceitável no começo |
| 11 | Locale e fuso fixos | `lib/format.ts:1` (`pt-BR`, `America/Sao_Paulo`), `app/layout.tsx` (`lang`, OG `locale`) | tolerável | Campos no config quando houver evento fora do Brasil |
| 12 | Favicon por convenção de arquivo | `app/favicon.ico`, `public/icon.svg`, `public/apple-icon.png` | tolerável | Um deploy por evento resolve trocando arquivo |

## 5. Decisão de arquitetura

**Escolhido: um repositório, um deploy por evento, configuração resolvida em tempo de
build.** Cada evento é uma pasta de config tipada; `EVENT=<slug>` escolhe qual entra no
build; cada evento tem seu projeto de deploy, seu domínio e seu `NEXT_PUBLIC_SITE_URL`.

Rejeitados, e por quê:

- **Fork por evento** (custo zero de refactor): morre na terceira marca — correção de bug
  vira N pull requests e os repositórios divergem em silêncio.
- **Multi-tenant com CMS, evento resolvido por domínio** (3–4 semanas): só se paga quando
  alguém fora do time de dev publica. Fica como fase opcional.

O primeiro passo é o mesmo nos dois caminhos vivos: **transformar o conteúdo em um objeto
tipado resolvido uma vez.** Depois disso, ir para o CMS é trocar de onde o objeto vem —
pasta, banco ou CMS — sem tocar em nenhuma seção.

## 6. Plano de execução

Regra transversal: **cada fase termina com a `main` verde e o site do MMIC no ar, sem
mudança visual.** Nenhuma fase pode alterar o que o usuário vê hoje — mudança de forma,
não de conteúdo. Compare o HTML gerado antes e depois (`npm run build`, `.next/server/app/index.html`)
quando tiver dúvida.

### Fase 1 — O evento vira objeto (~1 dia)

- Criar um tipo raiz `EventConfig` em `content/types.ts` compondo os tipos existentes.
- Os 13 arquivos de `/content` passam a compor um único objeto exportado pelo barril.
- Componentes continuam iguais; muda só o import.
- **Aceite:** `tsc`, `lint` e `build` limpos; nenhum diff no HTML gerado.

### Fase 2 — Toda copy sai do código (~1 dia)

- Bloqueios 2, 3 e 5 da tabela.
- `HeadlineLines` como tipo: `{ text: string; highlight?: string }[]`, renderizado por um
  componente que aplica `<Highlight>` ao trecho marcado. Cuidado com a máscara de reveal:
  cada linha precisa continuar dentro de seu `headline-mask`.
- **Aceite:** `grep` por texto em pt-BR dentro de `components/` e `app/` não retorna copy
  de evento; HTML gerado idêntico.

### Fase 3 — Tema como dado (~1 dia)

- Paleta, fontes (por chave de um catálogo em `app/fonts.ts`) e métricas de cartaz vão
  para o config e são emitidas como custom properties no `<html>`.
- O `@theme` de `globals.css` passa a ser o valor padrão, não a verdade.
- Eliminar `#060606` duplicado e o `themeColor` literal.
- **Aceite:** trocar uma cor no config muda o site inteiro; nenhum hex de marca fora do
  config.

### Fase 4 — Seções por registro (~1,5 dia)

- `sections: BlockConfig[]` no config; registro `type → componente` em
  `components/blocks/`; a home monta a partir da lista.
- Navegação e âncoras derivam da mesma lista (bloqueio 8).
- `EventJsonLd` recebe tipo de schema e modalidade por dado (bloqueio 7).
- **Aceite:** remover uma seção do config a tira da home, do menu e do rodapé, sem link
  morto; ScrollTrigger sem gatilho órfão (ver §7).

### Fase 5 — Resolução por evento (~0,5 dia)

- `events/registry.ts` (mapa estático slug → config; o build precisa enxergar),
  `EVENT=<slug>`, assets em `public/events/<slug>/`, `assetBase` no config.
- Nasce o segundo site.
- **Aceite:** `EVENT=mmic-2027 npm run build` e `EVENT=<novo> npm run build` produzem dois
  sites corretos a partir do mesmo código.

### Fase 6 — Opcional: CMS (3–4 semanas)

Só quando alguém fora do time de dev precisar publicar. O `EventConfig` vira o esquema do
CMS; o resto do código não sabe a diferença.

## 7. Armadilhas (leia antes de codar)

1. **A fonte de display muda a régua vertical.** As constantes de `app/globals.css`
   (entrelinha 1.16, `padding-top` de 0.22em na máscara, margens negativas) foram medidas
   na Anton: caixa alta sobe 0.86em, mas `É/Á/Â/Í` sobem 1.105em. Trocar a display sem
   recalibrar traz de volta o acento decepado ("NÃO É UMA CORRIDA" virando "NAO E UMA
   CORRIDA" no reveal). Ao tokenizar, teste com um evento de fonte diferente.
2. **`next/font` é estático por natureza.** As famílias precisam ser chamadas
   literalmente no módulo. Isso limita a tipografia a um catálogo fechado — decida cedo
   quantas famílias o whitelabel oferece. Não tente carregar fonte por string vinda de
   dados.
3. **Seções opcionais mexem com o ScrollTrigger.** `components/animation/AnimationProvider.tsx`
   já dá refresh por rota e quando as fontes carregam, mas gatilhos calculados sobre uma
   home de altura variável pedem teste por evento — principalmente o parallax de
   `ShowSection`, que depende de duas constantes acopladas (`PARALLAX_OVERSCAN = 1.08`,
   `PARALLAX_STRENGTH = 3.5`; o teto é `4 / 1.08 ≈ 3.7`).
4. **Proporção de imagem é contrato.** Componentes reservam espaço por `width`/`height`
   do dado para evitar layout shift, e o quadro do show desconta o overscan do parallax.
   O whitelabel precisa publicar as proporções esperadas de logo, hero e lockup.
5. **Logo branco só vive sobre fundo escuro.** `event.logo` é PNG transparente com
   lettering claro. Evento de identidade clara precisa da variante invertida no config —
   dois campos, não um.
6. **Redirects e sitemap são por evento.** `/patrocinadores → /marcas` está fixo em
   `next.config.ts`, e `app/sitemap.ts` lista rotas em array literal. Ambos passam a sair
   do config.
7. **Arte vem do designer em PNG transparente.** Derivar de JPEG já foi tentado e saiu
   pior e mais pesado.

## 8. Estrutura alvo

```
events/
  registry.ts             # mapa slug → config (estático: o build precisa enxergar)
  mmic-2027/
    event.config.ts       # EventConfig completo, tipado
    theme.ts              # cores, fontes por chave, métricas de cartaz
    content/              # hero, conceito, distâncias, show, números, FAQ…
  <proximo-evento>/
    …

app/                      # shell: lê o evento ativo, nunca uma constante de marca
components/
  blocks/                 # registry: type → seção
  sections/               # as 9 seções, agora só consumindo props
  ui/                     # 14 primitivas, intocadas
lib/                      # gsap, animações, formatação (locale vem do config)
public/events/
  mmic-2027/              # logo, hero, lockup, ícones
```

`components/ui/` e `lib/` — cerca de 40% do código — não mudam de lugar nem de conteúdo.

## 9. Contexto de produto (não derivar do código)

- A data do evento **ainda não foi definida**: `event.date` é `null` de propósito e o
  contador não renderiza. Não preencha com palpite.
- As inscrições **não abriram**. Todos os CTAs de inscrição apontam hoje para
  `waitlistUrl` (`content/event.ts`), um convite de canal do Instagram que funciona como
  lista de avisos. Os rótulos dizem "entrar na lista", e não "inscreva-se", de propósito:
  o destino é uma lista, não um checkout. Mantenha essa honestidade ao mexer na copy.
- `components/registration/RegistrationProvider.tsx` e `RegistrationModal.tsx` seguem
  montados, hoje sem gatilho: são o ramo `register` do `RegisterButton` e o ponto de
  entrada do checkout real quando existir.
- As rotas `/inscricao`, `/cronograma`, `/marcas` e `/imprensa` existem como páginas "em
  breve" e são indexáveis desde o lançamento — não as remova.
