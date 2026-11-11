import type { NavItem } from "./types";

/**
 * Navegação do site, na ordem do cabeçalho do briefing da edição 2027.
 * Âncoras da home (`/#kit`, `/#arena`) para o que não tem página própria.
 */
export const mainNav: NavItem[] = [
  { label: "A Meia", href: "/" },
  { label: "Inscrições", href: "/inscricao" },
  { label: "Grupo VIP", href: "/grupo-vip" },
  { label: "Kit", href: "/#kit" },
  { label: "Arena", href: "/#arena" },
  { label: "Percurso", href: "/percurso" },
  { label: "O domingo", href: "/cronograma" },
  { label: "Curitiba", href: "/curitiba" },
  { label: "Camiseta", href: "/concurso-de-camisetas" },
  { label: "Marcas", href: "/marcas" },
  { label: "Imprensa", href: "/imprensa" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Fale com a gente",
    items: [
      { label: "Contato", href: "/contato" },
      { label: "Dúvidas", href: "/contato#faq" },
      { label: "Marcas", href: "/marcas" },
      { label: "Imprensa", href: "/imprensa" },
    ],
  },
];
