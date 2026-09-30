"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp } from "@/lib/animations/presets";
import { cn } from "@/lib/cn";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/* Cada etapa extra segura o painel fixo por 1/3 de tela. Menos que isso e a
   rolagem fica curta demais para ler; mais que isso e cada etapa vira um bloco
   morto de quase uma tela, sem nada para ler dentro. */
const VH_POR_PASSO = 30;

/**
 * Método comercial: cinco etapas, uma de cada vez.
 *
 * Não existe seta nem clique. A rolagem é o controle: o painel fica fixo
 * enquanto a pista é percorrida, e a etapa visível é a que corresponde à
 * posição do scroll.
 *
 * O modo conduzido só entra no `matchMedia` — e só por movimento aceito, sem
 * piso de largura, igual à página institucional. Sem ele, as cinco etapas
 * ficam empilhadas em fluxo e legíveis, como uma lista. É por isso que
 * nenhuma etapa começa oculta por CSS: um `opacity: 0` aqui viraria um bloco
 * em branco para quem não tem JS.
 */
export function BrandMethodSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const root = useGsapScroll<HTMLDivElement>(
    ({ scope, prefersReducedMotion, gsap: g, ScrollTrigger }) => {
      /* O runway É o scope: a ref do hook está neste mesmo div, e
         `querySelector` só enxerga descendentes. Consultar um atributo que
         marcava este próprio elemento devolvia `null` e derrubava a seção
         inteira no guard abaixo — inclusive o `fadeUp` do cabeçalho, que
         está depois dele. Nada aqui procura a si próprio. */
      const runway = scope;
      const panel = scope.querySelector<HTMLElement>("[data-stepper-panel]");
      const list = scope.querySelector<HTMLElement>("[data-step-list]");
      const steps = Array.from(scope.querySelectorAll<HTMLElement>("[data-step]"));
      const fill = scope.querySelector<HTMLElement>("[data-progress-fill]");

      if (!panel || !list || steps.length < 2) return;

      /* O cabeçalho entra uma vez, na entrada da seção. As etapas não entram
         por aqui — quem controla a opacidade delas é o stepper, e um reveal
         por cima brigaria com o mesmo `opacity` dos tweens de troca. */
      fadeUp(scope.querySelectorAll("[data-reveal]"), {
        prefersReducedMotion,
        trigger: scope,
        stagger: 0.1,
      });

      const media = g.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        /* O atributo marca o modo conduzido em dois lugares, e cada um tem um
           trabalho: na pista ele dá a altura que a rolagem percorre, na lista
           ele troca o empilhamento pela grade de uma célula só. */
        runway.dataset.piloted = "true";
        list.dataset.piloted = "true";
        g.set(steps, { opacity: 0, y: 0 });

        let atual = -1;

        /* Uma etapa por vez. Todo o que não é a que entra vai a zero — e não
           só a anterior: o estado passa a depender só do índice, e não do
           histórico de trocas. `overwrite: true` fecha a corrida, porque sem
           ele um tween antigo sobrevive disputando `opacity` quadro a quadro
           e a etapa acaba embaixo da seguinte para sempre. */
        const mostrar = (indice: number) => {
          if (indice === atual) return;
          atual = indice;
          setActiveIndex(indice);

          steps.forEach((step, posicao) => {
            if (posicao === indice) {
              /* `fromTo` e não `to`: a etapa entra 24px acima e assenta. Um
                 `to` partindo de onde ela estivesse tiraria o deslocamento,
                 que é o que faz a troca se ler como troca. */
              g.fromTo(
                step,
                { y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.32,
                  ease: "power2.out",
                  overwrite: true,
                },
              );
              g.set(step, { zIndex: 2 });
              return;
            }

            g.set(step, { zIndex: 1 });
            g.to(step, {
              opacity: 0,
              y: 0,
              duration: 0.18,
              ease: "power1.out",
              overwrite: true,
            });
          });
        };

        const indiceDoProgresso = (progresso: number) =>
          Math.min(steps.length - 1, Math.floor(progresso * steps.length));

        // Primeiro passo sem esperar rolagem: se a página já abriu dentro da
        // seção, o painel não pode ficar vazio. Fica antes do `refresh` de
        // propósito — depois dele o `onRefresh` corrige o índice sozinho, e
        // chamar de novo aqui voltaria a página para o passo 1.
        mostrar(0);

        /* Um único ScrollTrigger para as etapas e para o trilho. A versão da
           página institucional media a mesma pista duas vezes — uma para
           escolher a etapa, outra para encher a linha — e as duas brigavam no
           `start` e no `end`. Aqui o progresso é lido uma vez e as duas saídas
           saem dele.

           O `end` mede a pista contra o painel, e não contra
           `window.innerHeight`: no celular o painel tem `100svh`, que é menor
           que `innerHeight` enquanto a barra de endereço do navegador está
           visível, e ela muda de altura durante a rolagem. A diferença é a
           rolagem que sobra depois que o painel preencheu a tela, que é
           exatamente o que o `end` precisa ser. */
        const trigger = ScrollTrigger.create({
          trigger: runway,
          start: "top top",
          end: () => `+=${Math.max(1, runway.offsetHeight - panel.offsetHeight)}`,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            const indice = indiceDoProgresso(self.progress);
            mostrar(indice);
            if (fill) g.set(fill, { scaleX: self.progress });
          },
          onUpdate: (self) => {
            mostrar(indiceDoProgresso(self.progress));
            if (fill) g.set(fill, { scaleX: self.progress });
          },
        });

        // O atributo `data-piloted` muda o layout das etapas, então a medição
        // precisa ser refeita depois dele — senão o `end` nasce da altura
        // antiga e a última etapa nunca chega a aparecer.
        trigger.refresh();

        return () => {
          trigger.kill();
          g.killTweensOf(steps);
          g.set(steps, { clearProps: "all" });
          delete runway.dataset.piloted;
          delete list.dataset.piloted;
        };
      });

      return () => media.revert();
    },
    [],
  );

  const { steps } = brands.method;

  return (
    /*
     * Sem `overflow-hidden` aqui, e o motivo é o `sticky` do painel: um
     * ancestral com `overflow: hidden` vira container de scroll, e aí o
     * `position: sticky` resolve contra ele — que nunca rola — e o painel
     * deixa de fixar, subindo junto com a página. A seção não tem nada
     * transbordando para cortar, então o clip não compra nada aqui.
     *
     * `pt-0` também é do sticky: com o padding padrão da Section (288px no
     * desktop) eram quase duas telas de rolagem morta antes do painel fixar.
     * O respiro no topo agora vem do próprio painel, que ocupa a tela toda e
     * centraliza o conteúdo.
     */
    <Section id="metodo" className="pt-0 pb-20 sm:pb-28 lg:pb-36">
      <div
        ref={root}
        className={cn(
          "relative",
          /* A altura da pista é o comprimento de rolagem que o painel fixo
             percorre: uma tela para o painel, mais 1/3 de tela por etapa extra.
             Ela entra só no modo conduzido — se ficasse sempre, os estados de
             reserva (sem JS, movimento reduzido) sobrariam até duas telas de
             rolagem morta embaixo de um painel que não está fixo.

             O valor vem da propriedade CSS em vez de uma classe com o número
             escrito, para o cálculo continuar sendo feito a partir de
             `steps.length`: escrever "120vh" na classe faria a próxima etapa
             exigir dois lugares para acertar. */
          "data-[piloted=true]:h-[var(--pista)]",
          /* Trilho e indicadores só existem no modo conduzido: sem o stepper
             eles ficariam vazios, já que é o JS que os preenche. */
          "data-[piloted=true]:[&_[data-progress]]:block data-[piloted=true]:[&_[data-indicators]]:flex",
        )}
        style={
          {
            "--pista": `calc(100svh + ${Math.max(0, steps.length - 1) * VH_POR_PASSO}vh)`,
          } as React.CSSProperties
        }
      >
        {/*
          `my-auto` no filho, e não `justify-center` no pai: com o conteúdo
          menor que a tela os dois centralizam igual, mas quando o texto não
          cabe numa tela baixa `justify-center` transborda nas duas pontas e
          corta o topo. Com margem automática, o excedente cai só embaixo e a
          rolagem do fim da pista traz o resto para a tela.
        */}
        <div data-stepper-panel className="sticky top-0 flex min-h-[100svh] flex-col">
          <div className="my-auto w-full">
            {/* `max-w-3xl` é a medida do stepper da página institucional
                (760px) e o que segura a linha de leitura: sem ela a etapa
                ocupa a largura inteira do container e o título perde a
                quebra que dá o ritmo. */}
            <div className="mx-auto max-w-3xl">
              <SectionHeader intro={brands.method.intro} />

              {/* Trilho do progresso. `scaleX` em vez de `width`: preencher
                  a linha a cada quadro em `width` custa layout. */}
              <div
                data-progress
                aria-hidden
                className="mt-10 hidden h-0.5 w-full overflow-hidden rounded-full bg-white/15"
              >
                <div
                  data-progress-fill
                  className="origin-left h-full w-full scale-x-0 bg-accent-red"
                />
              </div>

              {/* Grade, não flex: é a grade que empilha as cinco na mesma
                  célula. No modo conduzido cada passo recebe `col-start` e
                  `row-start` explícitos e as cinco ocupam `(1, 1)`; a célula
                  cresce até a etapa mais alta, que é o que impede o texto de
                  pular de tamanho a cada troca. As regras dos passos ficam na
                  lista, e não no passo, porque o atributo vive no ancestral. */}
              <ol
                data-step-list
                className={cn(
                  "mt-10 grid gap-10",
                  "[&>*]:self-start",
                  "data-[piloted=true]:grid-cols-1 data-[piloted=true]:gap-0",
                  "data-[piloted=true]:[&>[data-step]]:col-start-1 data-[piloted=true]:[&>[data-step]]:row-start-1 data-[piloted=true]:[&>[data-step]]:w-full data-[piloted=true]:[&>[data-step]]:border-t-0 data-[piloted=true]:[&>[data-step]]:pt-0",
                )}
              >
                {steps.map((step) => (
                  <li
                    key={step.id}
                    data-step
                    /* A régua de cima liga uma etapa à outra e só faz sentido
                       na lista empilhada: no modo conduzido as cinco dividem a
                       mesma célula, então as quatro regras se empilhariam no
                       mesmo pixel. Quem liga uma etapa à outra passa a ser o
                       trilho. */
                    className="border-t border-white/12 pt-8"
                  >
                    <h3 className="headline text-[clamp(1.75rem,5vw,3rem)]">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-text-white/90">
                      {step.question}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-text-gray">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Indicador de onde se está — e não controle: quem navega é a
                  rolagem, então ele é aria-hidden e só serve de leitura
                  visual. Centralizado porque a coluna de texto é. */}
              <ol
                data-indicators
                aria-hidden
                className="mt-12 hidden justify-center gap-2"
              >
                {steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={cn(
                      "h-0.5 w-7 transition-colors duration-300",
                      index === activeIndex ? "bg-accent-red" : "bg-white/20",
                    )}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
