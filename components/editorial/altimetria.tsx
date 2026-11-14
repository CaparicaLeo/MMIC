import type { AltimetriaData } from "@/content/types";
import { cn } from "@/lib/cn";

const km = (n: number) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

/**
 * Perfil de altitude real, a partir do GPX oficial (ver scripts/altimetria.mjs).
 *
 * O eixo vertical vai do ponto mais baixo ao mais alto do percurso, com folga:
 * em Curitiba a variação é de algumas dezenas de metros, e um eixo começando em
 * zero deixaria o gráfico chapado. `highlightKm` pinta de vermelho um trecho
 * (a subida que decide); sem ele, vale a maior subida contínua do GPX.
 *
 * Textos (altitudes e km) ficam em HTML por cima do SVG, que estica com
 * `preserveAspectRatio="none"` e deformaria qualquer letra desenhada nele.
 */
export function Altimetria({
  data,
  highlightKm,
  label,
  className,
}: {
  data: AltimetriaData;
  highlightKm?: [number, number];
  label: string;
  className?: string;
}) {
  const width = 600;
  const height = 160;
  const floor = data.minM - 6;
  const ceil = data.maxM + 6;
  const last = data.samples.length - 1;

  const points = data.samples.map((ele, index) => {
    const x = (index / last) * width;
    const y = height - ((ele - floor) / (ceil - floor)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = points.join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  const [fromKm, toKm] = highlightKm ?? [data.climb.fromKm, data.climb.toKm];
  const from = Math.round(fromKm / data.stepKm);
  const to = Math.min(last, Math.round(toKm / data.stepKm));
  const segment = points.slice(from, to + 1).join(" ");
  const rise = data.samples[to] - data.samples[from];

  // Marcas de km: a cada 5 km no 21, a cada 2 no 10, a cada 1 no 5.
  const every = data.distanceKm > 15 ? 5 : data.distanceKm > 6 ? 2 : 1;
  const ticks: number[] = [];
  for (let k = every; k < data.distanceKm - every / 2; k += every)
    ticks.push(k);

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${label}: de ${data.minM} a ${data.maxM} metros de altitude, ${data.gainM} metros de subida acumulada.`}
          className="h-40 w-full"
          preserveAspectRatio="none"
        >
          <polygon points={area} className="fill-white/10" />
          <polyline
            points={line}
            className="fill-none stroke-white/60"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={segment}
            className="fill-none stroke-accent-red"
            strokeWidth={4}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          aria-hidden
          className="label-condensed absolute top-0 left-0 text-[0.6rem] text-text-gray"
        >
          {data.maxM} m
        </span>
        <span
          aria-hidden
          className="label-condensed absolute bottom-1 left-0 text-[0.6rem] text-text-gray"
        >
          {data.minM} m
        </span>
      </div>

      <div
        aria-hidden
        className="label-condensed relative h-3 text-[0.6rem] text-text-gray"
      >
        <span className="absolute left-0">0</span>
        {ticks.map((k) => (
          <span
            key={k}
            className="absolute -translate-x-1/2"
            style={{ left: `${(k / data.distanceKm) * 100}%` }}
          >
            {k}
          </span>
        ))}
        <span className="absolute right-0">{km(data.distanceKm)} km</span>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
        <div>
          <dt className="label-condensed text-[0.58rem] text-text-gray">
            Subida acumulada
          </dt>
          <dd className="headline mt-1 text-xl">+{data.gainM} m</dd>
        </div>
        <div>
          <dt className="label-condensed text-[0.58rem] text-text-gray">
            Ponto mais alto
          </dt>
          <dd className="headline mt-1 text-xl">
            {data.maxM} m{" "}
            <span className="label-condensed text-[0.6rem] text-text-gray">
              km {km(data.maxAtKm)}
            </span>
          </dd>
        </div>
        <div>
          <dt className="label-condensed text-[0.58rem] text-accent-red">
            Subida em vermelho
          </dt>
          <dd className="headline mt-1 text-xl">
            +{rise} m{" "}
            <span className="label-condensed text-[0.6rem] text-text-gray">
              km {km(fromKm)}–{km(toKm)}
            </span>
          </dd>
        </div>
      </dl>

      <figcaption className="label-condensed text-[0.62rem] text-text-gray">
        {label}
      </figcaption>
    </figure>
  );
}

/** Lista vertical de horários (hora · título · texto). */
export function TimeList({
  items,
}: {
  items: { id: string; time: string; title: string; description: string }[];
}) {
  return (
    <ol className="flex flex-col">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid gap-3 border-t border-white/10 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8"
        >
          <p className="headline text-3xl text-accent-red">{item.time}</p>
          <div>
            <h3 className="headline text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-gray sm:text-base">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
