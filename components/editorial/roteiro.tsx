import { cn } from "@/lib/cn";

/** Roteiro numerado: número grande, dia, texto e uma tag à direita. */
export function RoteiroList({
  items,
  className,
}: {
  items: { id: string; number: string; day: string; text: string; tag: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="grid grid-cols-[3.25rem_1fr] gap-4 border-t border-white/10 py-7 sm:grid-cols-[4rem_1fr_auto] sm:gap-6"
        >
          <p className="headline text-4xl text-accent-red">{item.number}</p>
          <div>
            <h3 className="headline text-2xl">{item.day}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-gray sm:text-base">{item.text}</p>
          </div>
          <p className="label-condensed col-span-2 text-[0.62rem] text-text-gray sm:col-span-1 sm:self-start sm:pt-2">
            {item.tag}
          </p>
        </li>
      ))}
    </ol>
  );
}
