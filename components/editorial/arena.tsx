import { arena } from "@/content/paginas/paginas";
import { cn } from "@/lib/cn";

/**
 * Croqui da arena, em HTML. No celular os nomes saem do desenho (a legenda
 * abaixo traz a descrição de cada número), para não se sobreporem. Posições em % sobre a área; o número é o do
 * briefing. `highlight` acende os pontos de uma marca (página /marcas).
 */
export function ArenaMap({
  highlight = [],
  className,
}: {
  highlight?: number[];
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-6", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#0d0d0d] sm:aspect-[16/10]">
        {/* Avenida de chegada e a praça, só como referência espacial. */}
        <div aria-hidden className="absolute inset-x-[6%] top-[8%] bottom-[6%] border border-dashed border-white/10" />
        <div aria-hidden className="absolute left-[60%] top-[6%] h-[88%] w-[3px] -skew-x-6 bg-white/20" />
        <div aria-hidden className="absolute left-[8%] right-[40%] top-[50%] h-px bg-white/15" />

        {arena.points.map((point) => {
          const isHighlight = Boolean(point.highlight) || highlight.includes(point.n);
          return (
            <div
              key={point.n}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span
                className={cn(
                  "label-condensed flex size-7 items-center justify-center text-[0.8rem] font-semibold sm:size-8",
                  isHighlight ? "bg-accent-red text-text-white" : "bg-white text-text-dark",
                )}
              >
                {point.n}
              </span>
              <span className="label-condensed mt-1.5 hidden w-max max-w-[9.5rem] -translate-x-1/2 text-center text-[0.6rem] leading-tight text-text-white/80 sm:block">
                {point.label}
              </span>
            </div>
          );
        })}
      </div>

      <ul className="grid gap-x-10 gap-y-3 text-sm text-text-white/85 sm:grid-cols-2">
        {arena.legend.map((item) => (
          <li key={item.n} className="flex items-start gap-3">
            <span
              className={cn(
                "label-condensed flex size-6 shrink-0 items-center justify-center text-[0.72rem] font-semibold",
                item.n === 1 || highlight.includes(item.n)
                  ? "bg-accent-red text-text-white"
                  : "bg-white text-text-dark",
              )}
            >
              {item.n}
            </span>
            <span className="leading-snug">{item.text}</span>
          </li>
        ))}
      </ul>

      <figcaption className="label-condensed text-[0.62rem] text-text-gray">{arena.note}</figcaption>
    </figure>
  );
}
