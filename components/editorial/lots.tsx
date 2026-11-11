import { CTAButton } from "@/components/ui/CTAButton";
import { lotes, type Lot } from "@/content/paginas/lotes";
import { cn } from "@/lib/cn";

const brl = (value: number) => lotes.format(value);

/**
 * Contador público + barra do lote atual. Os números vêm de lotes.ts; a
 * barra mostra o quanto do lote aberto já foi vendido.
 */
export function LotCounter() {
  const { current } = lotes;
  const sold = current.closesAt - current.remaining;
  const percent = Math.round((sold / current.closesAt) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-condensed text-[0.68rem] text-text-gray">Inscritos até agora</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-2">
          <p className="headline text-[clamp(4.5rem,13vw,8.5rem)] leading-none text-accent-red tabular-nums">
            {lotes.registrations.toLocaleString("pt-BR")}
          </p>
          <div className="pb-3 text-sm text-text-gray">
            <p className="font-semibold text-text-white">+{lotes.registrationsToday} hoje</p>
            <p className="text-xs">{lotes.registrationsSource}</p>
          </div>
        </div>
      </div>

      <div>
        <div
          role="progressbar"
          aria-label={`Lote 1: ${percent}% das vagas vendidas`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full bg-white/10"
        >
          <div className="h-full bg-accent-red" style={{ width: `${percent}%` }} />
        </div>
        <p className="label-condensed mt-3 text-[0.7rem] text-text-white">
          {current.name} · faltam {current.remaining} vagas · 5 e 10 km {brl(current.price5and10)} · 21 km{" "}
          {brl(current.price21)}
        </p>
      </div>

    </div>
  );
}

/** Botão de compra: só aponta para o Ticket Sports quando o link existe. */
export function TicketButton({
  href,
  label,
  pendingLabel,
}: {
  href: string | null;
  label: string;
  pendingLabel: string;
}) {
  if (href) {
    return (
      <CTAButton href={href} size="md">
        {label}
      </CTAButton>
    );
  }

  return (
    <span
      aria-disabled="true"
      className="label-condensed inline-flex w-fit items-center gap-3 border border-white/20 px-6 py-3.5 text-xs text-text-gray"
    >
      {pendingLabel}
    </span>
  );
}

/** Tabela de lotes: o lote aberto em vermelho, o fechado riscado. */
export function LotTable() {
  return (
    <div className="overflow-x-auto border border-white/10">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">Lotes de inscrição por distância</caption>
        <thead>
          <tr className="border-b border-white/10 text-text-gray">
            <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">Lote</th>
            <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">Fecha em</th>
            <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">5 km e 10 km</th>
            <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">21 km</th>
            <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {lotes.table.map((lot) => (
            <LotRow key={lot.id} lot={lot} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LotRow({ lot }: { lot: Lot }) {
  const isOpen = lot.status === "aberto";
  const isSoldOut = lot.status === "esgotado";

  return (
    <tr
      className={cn(
        "border-b border-white/10 last:border-b-0",
        isOpen && "bg-accent-red text-text-white",
        isSoldOut && "text-text-gray/70 line-through decoration-white/40",
      )}
    >
      <th scope="row" className="px-5 py-5 font-semibold">{lot.name}</th>
      <td className="px-5 py-5">{lot.closesAt.toLocaleString("pt-BR")} inscritos</td>
      <td className={cn("px-5 py-5", isOpen ? "headline text-2xl" : "")}>{brl(lot.price5and10)}</td>
      <td className={cn("px-5 py-5", isOpen ? "headline text-2xl" : "")}>{brl(lot.price21)}</td>
      <td className="label-condensed px-5 py-5 text-[0.66rem] leading-tight">
        {lot.status === "aberto" ? (
          <span>Aberto · faltam {lotes.current.remaining} vagas</span>
        ) : lot.status ? (
          lotes.statusLabel[lot.status]
        ) : null}
      </td>
    </tr>
  );
}
