"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { contest, contestFinalistsPage } from "@/content";
import type { RankedFinalist } from "@/content/contestResults";
import { cn } from "@/lib/cn";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Primeiro display de /concurso-de-camisetas/finalistas depois do resultado:
 * os três posts do anúncio em pódio.
 *
 * No desktop o 1º fica no centro e maior, ladeado por 2º e 3º (a ordem do
 * pódio de verdade). No celular o 1º vem primeiro, na largura toda, e os
 * outros dois dividem a linha de baixo. Os posts já trazem a medalha e o
 * crédito na arte, então o texto abaixo de cada um diz o que a imagem não
 * diz: qual camisa a arte estampa e o nome da proposta.
 *
 * Animação, como numa cerimônia de pódio: o cabeçalho entra, depois sobem o
 * 3º, o 2º e por último o 1º, mais alto e com um brilho que atravessa o post
 * e se repete de tempos em tempos. Com mouse, cada post inclina seguindo o
 * cursor. Tudo em `transform`/`opacity`; com movimento reduzido, nada anima.
 */
export function WinnersPodium({ winners }: { winners: RankedFinalist[] }) {
  const copy = contestFinalistsPage.winners;

  const root = useGsapScroll<HTMLDivElement>(
    ({ scope, prefersReducedMotion, gsap }) => {
      if (prefersReducedMotion) return;

      const card = (place: string) =>
        scope.querySelector(`[data-place="${place}"]`);
      const cards = ["3rd", "2nd", "1st"].map(card).filter(Boolean);
      const champion = card("1st");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-podium-eyebrow]", { opacity: 0, y: 12, duration: 0.6 })
        .from(
          "[data-podium-line]",
          { yPercent: 115, duration: 1.1, stagger: 0.08 },
          "-=0.3",
        )
        .from(
          "[data-podium-fade]",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.7",
        )
        /* 3º, 2º e 1º sobem um de cada vez; o 1º vem de mais baixo e cresce. */
        .from(
          cards.slice(0, 2),
          { opacity: 0, y: 90, duration: 1, stagger: 0.18, ease: "power4.out" },
          "-=0.5",
        )
        .from(
          champion,
          {
            opacity: 0,
            y: 140,
            scale: 0.92,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.55",
        )
        .from(
          scope.querySelectorAll("[data-podium-caption]"),
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.06 },
          "-=0.6",
        )
        .from("[data-champion-glow]", { opacity: 0, duration: 1.2 }, "-=1");

      /* Brilho em faixa diagonal sobre o 1º, como o reflexo da medalha. */
      const shine = scope.querySelector("[data-champion-shine]");
      if (shine) {
        gsap.set(shine, { xPercent: -160 });
        tl.to(
          shine,
          { xPercent: 160, duration: 1.1, ease: "power2.inOut" },
          "-=0.3",
        );
        gsap.to(shine, {
          keyframes: [
            { xPercent: -160, duration: 0 },
            { xPercent: 160, duration: 1.1, ease: "power2.inOut" },
          ],
          repeat: -1,
          repeatDelay: 4,
          delay: tl.duration() + 3,
        });
      }

      /* Halo vermelho atrás do 1º, respirando devagar. */
      gsap.to("[data-champion-glow]", {
        scale: 1.08,
        opacity: 0.85,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: tl.duration(),
      });

      /* Inclinação 3D seguindo o cursor — só com mouse de verdade. */
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;

      const cleanups = Array.from(
        scope.querySelectorAll<HTMLElement>("[data-tilt]"),
      ).map((el) => {
        const rotateX = gsap.quickTo(el, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const rotateY = gsap.quickTo(el, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.set(el, { transformPerspective: 900 });

        const onMove = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width - 0.5;
          const y = (event.clientY - box.top) / box.height - 0.5;
          rotateY(x * 10);
          rotateX(-y * 10);
        };
        const onLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
  );

  return (
    <Section id="vencedores" tone="darker" className="overflow-hidden lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,var(--color-accent-red-dark)_0%,transparent_65%)] opacity-60"
      />

      <div ref={root} className="relative">
        <Link
          href="/concurso-de-camisetas"
          className="label-condensed text-[0.7rem] text-text-gray transition-colors hover:text-text-white"
        >
          ← Concurso de Camisetas
        </Link>

        {/* No desktop, título e texto lado a lado: o pódio precisa caber na
            primeira tela, e um cabeçalho empilhado o empurra para baixo. */}
        <header className="mt-8 grid gap-6 lg:grid-cols-[auto_minmax(0,24rem)] lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-6">
            <Badge data-podium-eyebrow className="w-fit">
              {copy.kicker}
            </Badge>

            <h1 className="headline text-[clamp(2.5rem,8vw,4.5rem)] text-text-white">
              {copy.title.map((line) => (
                <span key={line} className="headline-mask">
                  <span
                    data-podium-line
                    className="block will-change-transform"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <p
            data-podium-fade
            className="text-base leading-relaxed text-text-gray sm:text-lg lg:text-base"
          >
            {copy.description}
          </p>
        </header>

        <ol className="mx-auto mt-14 grid grid-cols-2 items-end gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-12 lg:max-w-5xl lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-x-8">
          {winners.map((winner) => {
            const first = winner.placeId === "1st";
            const prize = contest.prizes.items.find(
              (item) => item.id === winner.placeId,
            );

            return (
              <li
                key={winner.slug}
                data-place={winner.placeId}
                className={cn(
                  "relative isolate",
                  first && "col-span-2 lg:order-2 lg:col-span-1",
                  winner.placeId === "2nd" && "lg:order-1",
                  winner.placeId === "3rd" && "lg:order-3",
                )}
              >
                <Link
                  href={`/concurso-de-camisetas/finalistas/${winner.slug}`}
                  className="group flex flex-col focus-visible:outline-offset-4"
                >
                  {first ? (
                    <div
                      aria-hidden
                      data-champion-glow
                      className="pointer-events-none absolute -inset-x-10 -inset-y-14 -z-10 bg-[radial-gradient(closest-side,var(--color-accent-red)_0%,transparent_100%)] opacity-50 blur-3xl"
                    />
                  ) : null}

                  <div
                    data-tilt
                    className="relative overflow-hidden will-change-transform"
                  >
                    <Media
                      media={{
                        src: winner.post,
                        alt: `${prize?.place ?? ""}: arte “${winner.titulo}”, de ${winner.nome}, na camisa preta da Rock Edition`,
                        width: 1080,
                        height: 1350,
                      }}
                      preload={first}
                      sizes={
                        first
                          ? "(min-width: 1024px) 400px, 100vw"
                          : "(min-width: 1024px) 320px, 50vw"
                      }
                      className="w-full"
                      imageClassName="transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-0 border transition-colors group-hover:border-accent-red",
                        first ? "border-accent-red/60" : "border-white/10",
                      )}
                    />
                    {first ? (
                      <span
                        aria-hidden
                        data-champion-shine
                        className="pointer-events-none absolute inset-y-0 left-0 w-full -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent mix-blend-overlay"
                      />
                    ) : null}
                  </div>

                  <p
                    data-podium-caption
                    className={cn(
                      "label-condensed mt-5 text-[0.7rem]",
                      first ? "text-accent-red" : "text-text-gray",
                    )}
                  >
                    {prize?.place} · {copy.shirtLabels[winner.placeId]}
                  </p>

                  <p
                    data-podium-caption
                    className={cn(
                      "headline mt-2 text-text-white",
                      first
                        ? "text-[clamp(1.75rem,3vw,2.25rem)]"
                        : "text-xl sm:text-2xl",
                    )}
                  >
                    {winner.nome}
                  </p>

                  <p
                    data-podium-caption
                    className="mt-2 text-sm text-text-white/80"
                  >
                    “{winner.titulo}”
                  </p>

                  <span
                    data-podium-caption
                    className="label-condensed mt-4 text-[0.65rem] text-text-gray transition-colors group-hover:text-text-white"
                  >
                    {copy.linkLabel} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
