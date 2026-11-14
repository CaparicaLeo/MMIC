/** Link externo para a rota no Strava; abre em nova aba para não tirar o corredor do site. */
export function StravaLink({ href, distance }: { href: string; distance: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label-condensed inline-flex w-fit items-center gap-3 border border-white/25 px-5 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
    >
      Ver percurso no Strava
      <span className="sr-only"> ({distance} km, abre em nova aba)</span>
      <span aria-hidden>↗</span>
    </a>
  );
}
