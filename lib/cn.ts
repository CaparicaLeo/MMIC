import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge precisa conhecer os tokens customizados para resolver
 * conflitos (ex.: `bg-bg-dark` sobrescrito por `bg-accent-red` via prop
 * `className`). Sempre que um token novo entrar em globals.css, registre aqui.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "bg-dark",
        "bg-light",
        "accent-red",
        "accent-red-dark",
        "text-white",
        "text-gray",
        "text-dark",
      ],
      font: ["display", "condensed"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
