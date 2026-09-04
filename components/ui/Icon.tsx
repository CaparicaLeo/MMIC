import type { ReactElement, SVGProps } from "react";

/**
 * Set de ícones inline (traço, 1.5px, 24x24).
 *
 * Inline em vez de sprite/biblioteca porque são poucos e ficam no HTML sem
 * request extra. As chaves batem com `icon` em /content/structure.ts.
 */
const paths: Record<string, ReactElement> = {
  recovery: (
    <>
      <path d="M4 13h3l2-5 3 9 2.5-6 1.5 2h4" />
      <path d="M12 20.5C7 17.5 3 14.5 3 10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 9 2.5c0 4-4 7-9 10Z" />
    </>
  ),
  food: (
    <>
      <path d="M6 3v8a2 2 0 0 0 4 0V3" />
      <path d="M8 11v10" />
      <path d="M17 3c-1.7 1.4-2.5 3.4-2.5 6s.8 3 2.5 3 2.5-.4 2.5-3-.8-4.6-2.5-6Z" />
      <path d="M17 12v9" />
    </>
  ),
  kids: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M9 11.5 5 9M15 11.5 19 9" />
    </>
  ),
  bag: (
    <>
      <path d="M4 8h16l-1 12H5L4 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M9 12h6" />
    </>
  ),
  athlete: (
    <>
      <circle cx="15" cy="5" r="2" />
      <path d="M5 20l3-5 3-2-1-4-4 2" />
      <path d="M11 13l3 2 1 5" />
      <path d="M10 9l4-1 3 3h3" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {path}
    </svg>
  );
}
