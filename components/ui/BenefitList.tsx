import { cn } from "@/lib/cn";

/**
 * Lista de benefícios do Grupo VIP.
 *
 * Fonte única da apresentação: o mesmo bloco aparece no card principal do hero
 * e na seção final de CTA, então mora num componente só. O texto continua vindo
 * de `content/backstage.ts` (`benefitsTitle` + `benefits`).
 */
export function BenefitList({
  title,
  items,
  className,
}: {
  title: string;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="label-condensed text-[0.7rem] text-text-gray">{title}</p>

      <ul className="mt-5 flex flex-col gap-3 text-left">
        {items.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-3 text-sm text-text-white/85"
          >
            <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-red" />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
