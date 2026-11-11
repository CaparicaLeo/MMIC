import Image from "next/image";

import { ArenaMap } from "@/components/editorial/arena";
import { RoteiroList } from "@/components/editorial/roteiro";
import { Altimetria } from "@/components/editorial/altimetria";
import { Block, InfoCard, Kicker, Photo, SectionTitle, StatNumber, withSlash } from "@/components/editorial/primitives";
import { LotCounter, LotTable, TicketButton } from "@/components/editorial/lots";
import { CTAButton } from "@/components/ui/CTAButton";
import { home } from "@/content/paginas/home";
import { curitiba, domingo, inscricao, percurso, vip } from "@/content/paginas/paginas";
import { lotes } from "@/content/paginas/lotes";
import { getRankedWinners } from "@/content/contestResults";
import { cn } from "@/lib/cn";

/* ----------------------------------------------------------------- Hero */

export function HomeHero() {
  const { hero } = home;
  return (
    <section
      id="a-meia"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-bg-dark pt-32 pb-16 text-text-white sm:pb-20"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={hero.background.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_35%] opacity-75"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg-dark via-bg-dark/55 to-bg-dark/10" />
        <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-transparent to-bg-dark/30" />
      </div>

      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="flex flex-col gap-7">
          <Kicker>{hero.kicker}</Kicker>

          <h1 className="headline text-[clamp(3.1rem,10vw,8.2rem)]">
            {hero.title.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {withSlash(line, hero.slashWord)}
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-1">
            {hero.lines.map((line) => (
              <p key={line} className="label-condensed text-[clamp(1rem,2.2vw,1.35rem)] font-semibold text-text-white">
                {line}
              </p>
            ))}
            <p className="label-condensed text-[clamp(1rem,2.2vw,1.35rem)] font-semibold text-accent-red">
              {hero.brand}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <CTAButton href="/inscricao" size="lg">
              Garantir minha vaga
            </CTAButton>
            <CTAButton href="/percurso" variant="outline" size="lg">
              Ver o percurso
            </CTAButton>
          </div>
        </div>

        <div className="flex flex-col gap-8 bg-bg-dark/70 p-6 backdrop-blur-sm sm:p-8">
          <LotCounter />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Band */

export function HomeBand() {
  return (
    <div className="bg-accent-red text-text-white">
      <p className="headline container-page py-6 text-[clamp(1.4rem,3.6vw,2.6rem)] leading-tight">
        {home.band.first}
        <span className="mx-3 inline-block align-middle text-text-white/70">·</span>
        {home.band.second}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- About */

export function HomeAbout() {
  const { about } = home;
  return (
    <Block>
      <SectionTitle kicker={about.kicker} title={about.title} slashWord={about.slashWord} description={about.description} />

      <div className="mt-14 grid gap-px bg-white/10 lg:grid-cols-2">
        {about.cards.map((card, index) => (
          <article key={card.title} className="flex flex-col bg-bg-dark">
            <Photo media={card.media} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className={cn("flex flex-1 flex-col gap-4 border-t-2 bg-[#141414] p-7", index === 0 ? "border-accent-red" : "border-white/15")}>
              <p className="label-condensed text-[0.66rem] text-text-gray">{card.tag}</p>
              <h3 className="headline text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.02]">{card.title}</h3>
              <p className="text-sm leading-relaxed text-text-gray sm:text-base">{card.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-px grid gap-px bg-white/10 md:grid-cols-2">
        {about.smallCards.map((card) => (
          <article key={card.title} className="grid gap-6 bg-bg-dark p-0 sm:grid-cols-[0.9fr_1.1fr]">
            <Photo media={card.media} className="aspect-[4/5] w-full sm:aspect-auto sm:h-full" sizes="(min-width: 640px) 35vw, 100vw" />
            <div className="flex flex-col justify-center gap-4 p-7 sm:py-10 sm:pr-8 sm:pl-0">
              <h3 className="headline text-2xl leading-tight sm:text-3xl">{card.title}</h3>
              <p className="text-sm leading-relaxed text-text-gray">{card.text}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="headline mt-20 max-w-4xl text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.08]">
        {about.statement.first}{" "}
        <span className="text-accent-red">{about.statement.red}</span>
      </p>
    </Block>
  );
}

/* ----------------------------------------------------------------- Lots */

export function HomeLots() {
  const { lots } = home;
  return (
    <Block id="inscricoes" tone="darker">
      <SectionTitle kicker={lots.kicker} title={lots.title} slashWord={lots.slashWord} description={lots.description} />

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <p className="headline text-[clamp(2.2rem,4vw,3.4rem)] leading-none">
            Faltam <span className="text-accent-red">{lotes.current.remaining}</span> vagas no {lotes.current.name}.
          </p>
          <TicketButton
            href={inscricao.ticketSportsUrl}
            label={lots.cta}
            pendingLabel={inscricao.ticketPendingLabel}
          />
        </div>
        <LotTable />
      </div>

      <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
        {lotes.notes.map((note, index) => (
          <InfoCard
            key={note.title}
            kicker={note.kicker}
            title={note.title}
            text={note.text}
            accent={index === 0}
            className="bg-[#060606]"
          />
        ))}
      </div>
    </Block>
  );
}

/* ------------------------------------------------------------------ VIP */

export function HomeVip() {
  const { vip: vipHome } = home;
  return (
    <Block id="grupo-vip" tone="red">
      <SectionTitle kicker={vipHome.kicker} title={vipHome.title} slashWord={vipHome.slashWord} description={vipHome.description} className="text-text-white" />
      <div className="mt-14 grid gap-px bg-white/25 sm:grid-cols-2 lg:grid-cols-3">
        {vip.benefits.slice(0, 3).map((benefit) => (
          <InfoCard
            key={benefit.title}
            kicker={benefit.status}
            title={benefit.title}
            text={benefit.text}
            className="bg-[#a31a1f] text-text-white"
          />
        ))}
      </div>
      <div className="mt-px grid gap-px bg-white/25 sm:grid-cols-2 lg:grid-cols-3">
        {vip.benefits.slice(3).map((benefit) => (
          <InfoCard
            key={benefit.title}
            kicker={benefit.status}
            title={benefit.title}
            text={benefit.text}
            className="bg-[#a31a1f] text-text-white"
          />
        ))}
      </div>
      <div className="mt-12">
        <CTAButton href="/grupo-vip" variant="outline" size="md">
          {vipHome.cta}
        </CTAButton>
      </div>
    </Block>
  );
}

/* ------------------------------------------------------------------ Kit */

export function HomeKit() {
  const { kit } = home;
  return (
    <Block id="kit">
      <SectionTitle kicker={kit.kicker} title={kit.title} slashWord={kit.slashWord} />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <figure className="relative">
          <Photo media={kit.media} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 50vw, 100vw" />
          <figcaption className="label-condensed absolute bottom-0 left-0 bg-bg-dark/85 px-4 py-3 text-[0.6rem] text-text-white">
            {kit.caption}
          </figcaption>
        </figure>
        <div className="grid gap-px bg-white/10">
          {kit.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 bg-[#141414] p-6">
              <h3 className="headline text-2xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-gray">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}

/* ---------------------------------------------------------------- Arena */

export function HomeArena() {
  return (
    <Block id="arena" tone="darker">
      <SectionTitle
        kicker={home.arena.kicker}
        title={home.arena.title}
        slashWord={home.arena.slashWord}
        description={home.arena.description}
      />
      <div className="mt-14">
        <ArenaMap />
      </div>
    </Block>
  );
}

/* ------------------------------------------------------------- Percurso */

export function HomePercurso() {
  return (
    <Block id="percurso">
      <SectionTitle
        kicker={home.percurso.kicker}
        title={home.percurso.title}
        slashWord={home.percurso.slashWord}
        description={home.percurso.description}
      />
      <div className="mt-14 grid gap-px bg-white/10 lg:grid-cols-3">
        {percurso.distances.map((distance) => (
          <article key={distance.id} className="flex flex-col gap-5 bg-[#141414] p-7">
            <div className="flex items-baseline gap-3">
              <p className="headline text-[clamp(3.5rem,6vw,5rem)] text-accent-red">{distance.distance}</p>
              <p className="label-condensed text-sm">{distance.unit}</p>
            </div>
            <p className="label-condensed text-[0.7rem] text-text-gray">{distance.name}</p>
            <p className="text-sm leading-relaxed text-text-gray">
              Largada {distance.start}
              {distance.limit ? ` · tempo limite ${distance.limit}` : ""}
            </p>
            <Altimetria
              profile={distance.profile}
              highlight={distance.id === "21k" ? [14, 17] : undefined}
              label={`Altimetria ilustrativa do percurso de ${distance.distance} km`}
            />
            <p className="text-sm leading-relaxed text-text-gray">{distance.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-text-gray">{percurso.note}</p>
      <div className="mt-10">
        <CTAButton href="/percurso" variant="outline" size="md">
          Ver o percurso completo
        </CTAButton>
      </div>
    </Block>
  );
}

/* --------------------------------------------------------------- Domingo */

export function HomeDomingo() {
  return (
    <Block id="o-domingo" tone="darker">
      <SectionTitle kicker={home.domingo.kicker} title={home.domingo.title} slashWord={home.domingo.slashWord} />
      <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
        {home.domingo.photos.map((photo) => (
          <figure key={photo.time} className="relative bg-bg-dark">
            <Photo media={photo.media} className="aspect-[4/5] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
            <figcaption className="label-condensed absolute bottom-0 left-0 right-0 bg-bg-dark/85 px-4 py-3 text-[0.62rem] text-text-white">
              {photo.time} · {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-5">
        {domingo.sunday.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 bg-[#060606] p-6">
            <p className="headline text-4xl text-accent-red">{item.time}</p>
            <p className="label-condensed text-[0.72rem] text-text-white">{item.title}</p>
            <p className="text-sm leading-relaxed text-text-gray">{item.description}</p>
          </div>
        ))}
      </div>
    </Block>
  );
}

/* -------------------------------------------------------------- Curitiba */

export function HomeCuritiba() {
  return (
    <Block id="curitiba">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <SectionTitle
            kicker={home.curitiba.kicker}
            title={home.curitiba.title}
            slashWord={home.curitiba.slashWord}
            description={home.curitiba.description}
          />
          <div className="mt-12">
            <RoteiroList items={curitiba.itinerary} />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {curitiba.pills.map((pill) => (
              <span key={pill} className="label-condensed border border-white/15 px-3 py-2 text-[0.62rem] text-text-white/80">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-start">
          {home.curitiba.media.map((media, index) => (
            <Photo key={index} media={media} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 30vw, 100vw" />
          ))}
          <p className="text-xs leading-relaxed text-text-gray">{curitiba.sourceNote}</p>
        </div>
      </div>
    </Block>
  );
}

/* ------------------------------------------------------------- Concurso */

export function HomeConcurso() {
  const winners = getRankedWinners();
  const champion = winners.find((winner) => winner.placeId === "1st");
  return (
    <Block id="concurso" tone="darker">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <SectionTitle
            kicker={home.concurso.kicker}
            title={home.concurso.title}
            slashWord={home.concurso.slashWord}
            description={home.concurso.description}
          />
          {champion ? (
            <p className="label-condensed text-[0.72rem] text-text-white">
              Campeã: <span className="text-accent-red">{champion.nome}</span> · arte “{champion.titulo}”
            </p>
          ) : null}
          <div>
            <CTAButton href="/concurso-de-camisetas" size="md">
              {home.concurso.cta}
            </CTAButton>
          </div>
        </div>
        <Photo
          media={home.concurso.media}
          className="aspect-[4/5] w-full max-w-md justify-self-center"
          sizes="(min-width: 1024px) 35vw, 100vw"
        />
      </div>
    </Block>
  );
}

/* ---------------------------------------------------------------- Stats */

export function HomeStats() {
  return (
    <Block>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {home.stats.map((stat) => (
          <StatNumber key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Block>
  );
}

/* ----------------------------------------------------------------- Trio */

export function HomeTrio() {
  return (
    <Block tone="darker">
      <div className="grid gap-px bg-white/10 md:grid-cols-3">
        {home.trio.map((card) => (
          <InfoCard
            key={card.title}
            kicker={card.kicker}
            title={card.title}
            text={card.text}
            href={card.href}
            className="bg-[#060606]"
          />
        ))}
      </div>
    </Block>
  );
}

