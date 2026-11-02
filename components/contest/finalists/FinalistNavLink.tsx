"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Link de anterior/próxima entre finalistas que leva ao topo da página.
 *
 * O <Link> só rola ao topo quando a página nova não está visível; entre duas
 * finalistas o layout é o mesmo e a página continua na tela, então o Next
 * mantinha a rolagem e a pessoa caía no rodapé da próxima arte. O scroll é
 * `instant` para não herdar o `scroll-behavior: smooth` do <html>.
 */
export function FinalistNavLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      scroll={false}
      onClick={(event) => {
        props.onClick?.(event);
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
    />
  );
}
