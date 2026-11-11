import { cn } from "@/lib/cn";

/**
 * Perfil de altitude ilustrativo: o formato do trajeto, não o relevo real.
 * `profile` são alturas relativas (0 a 1). `highlight` pinta um trecho (índices)
 * de vermelho, como a subida que decide a prova.
 */
export function Altimetria({
  profile,
  highlight,
  label,
  className,
}: {
  profile: number[];
  highlight?: [number, number];
  label: string;
  className?: string;
}) {
  const width = 600;
  const height = 160;
  const pad = 10;
  const step = width / (profile.length - 1);
  const points = profile.map((value, index) => {
    const x = index * step;
    const y = height - pad - value * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  const segment =
    highlight &&
    points
      .slice(highlight[0], highlight[1] + 1)
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="h-40 w-full"
        preserveAspectRatio="none"
      >
        <polygon points={area} className="fill-white/10" />
        <polyline points={line} className="fill-none stroke-white/60" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        {segment ? (
          <polyline points={segment} className="fill-none stroke-accent-red" strokeWidth={4} vectorEffect="non-scaling-stroke" />
        ) : null}
      </svg>
      <figcaption className="label-condensed text-[0.62rem] text-text-gray">{label}</figcaption>
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
