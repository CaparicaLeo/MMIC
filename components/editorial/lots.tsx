import { CTAButton } from "@/components/ui/CTAButton";
import { currentLot, lotes, type Lot } from "@/content/paginas/lotes";
import { cn } from "@/lib/cn";

const brl = (value: number) => lotes.format(value);

/**
 * Contador público + barra das vagas da edição. Os números vêm de lotes.ts;
 * a barra mostra quanto das 10.000 vagas (regulamento, item 6.1) já foi.
 */
export function LotCounter() {
  const percent = Math.min(100, Math.round((lotes.registrations / lotes.totalSpots) * 100));

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div>
        <p className="label-condensed text-[0.68rem] text-text-gray">Inscritos até agora</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-2">
          <p
            data-count={lotes.registrations}
            className="headline text-[clamp(4.5rem,13vw,8.5rem)] leading-none text-accent-red tabular-nums"
          >
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
          aria-label={`${percent}% das ${lotes.totalSpots.toLocaleString("pt-BR")} vagas preenchidas`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full bg-white/10"
        >
          <div data-bar className="h-full bg-accent-red" style={{ width: `${percent}%` }} />
        </div>
        <p className="label-condensed mt-3 text-[0.7rem] text-text-white">
          {lotes.totalSpots.toLocaleString("pt-BR")} vagas · {currentLot.name} até {currentLot.endsLabel} · Kit
          Básico {brl(currentLot.prices.basico)} + taxas
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

/** Tabela de lotes: o lote aberto em vermelho, o encerrado riscado. */
export function LotTable() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Lotes de inscrição e valores por kit, para 5 km e 10 km</caption>
          <thead>
            <tr className="border-b border-white/10 text-text-gray">
              <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">Lote</th>
              <th scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">Período</th>
              {lotes.kits.map((kit) => (
                <th key={kit.id} scope="col" className="label-condensed px-5 py-4 text-[0.66rem] font-medium">
                  {kit.name}
                </th>
              ))}
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
      <p className="text-xs leading-relaxed text-text-gray">{lotes.priceNote}</p>
    </div>
  );
}

function LotRow({ lot }: { lot: Lot }) {
  const isOpen = lot.status === "aberto";
  const isClosed = lot.status === "encerrado";

  return (
    <tr
      className={cn(
        "border-b border-white/10 last:border-b-0",
        isOpen && "bg-accent-red text-text-white",
        isClosed && "text-text-gray/70 line-through decoration-white/40",
      )}
    >
      <th scope="row" className="px-5 py-5 font-semibold whitespace-nowrap">{lot.name}</th>
      <td className="px-5 py-5 whitespace-nowrap">{lot.period}</td>
      {lotes.kits.map((kit) => (
        <td key={kit.id} className={cn("px-5 py-5 whitespace-nowrap", isOpen && "headline text-xl")}>
          {brl(lot.prices[kit.id])}
        </td>
      ))}
      <td className="label-condensed px-5 py-5 text-[0.66rem] leading-tight">
        {lot.status ? lotes.statusLabel[lot.status] : null}
      </td>
    </tr>
  );
}
