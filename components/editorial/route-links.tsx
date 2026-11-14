/**
 * Links externos para a rota da distância (Strava e MapMyRun). Abrem em nova
 * aba para não tirar o corredor do site.
 */
export function RouteLinks({
  distance,
  stravaUrl,
  mapMyRunUrl,
}: {
  distance: string;
  stravaUrl: string;
  mapMyRunUrl: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <RouteLink href={stravaUrl} label="Strava" distance={distance} />
      <RouteLink href={mapMyRunUrl} label="MapMyRun" distance={distance} />
    </div>
  );
}

function RouteLink({
  href,
  label,
  distance,
}: {
  href: string;
  label: string;
  distance: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label-condensed inline-flex w-fit items-center gap-3 border border-white/25 px-5 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
    >
      Ver no {label}
      <span className="sr-only">
        {" "}
        (percurso de {distance} km, abre em nova aba)
      </span>
      <span aria-hidden>↗</span>
    </a>
  );
}
