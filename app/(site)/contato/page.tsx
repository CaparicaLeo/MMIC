import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Block, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { contact, faq } from "@/content";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a produção da Meia Maratona Internacional de Curitiba 2027 · Rock Edition: dúvidas de corredor, reserva de bloco, marcas e imprensa.",
  alternates: { canonical: "/contato" },
};

const routes: { kicker: string; title: string; text: string; href: string }[] = [
  {
    kicker: "Primeiro",
    title: "FAQ primeiro",
    text: "As perguntas reais do Grupo VIP, respondidas antes de abrir o formulário.",
    href: "#faq",
  },
  {
    kicker: "Assessorias",
    title: "Reserva de bloco",
    text: "Formulário próprio: nome da assessoria, quantidade e distâncias. Alimenta a planilha de reservas.",
    href: "#formulario",
  },
  {
    kicker: "Marcas e imprensa",
    title: "Rota certa",
    text: "Cada assunto cai na caixa certa. Resposta em 48 h.",
    href: "#formulario",
  },
];

/** Roteamento de contato: FAQ primeiro, depois o formulário com o assunto. */
export default function ContatoPage() {
  return (
    <>
      <FaqJsonLd />

      <PageHero
        kicker={contact.intro.kicker ?? "Contato"}
        title={["Fala com a", "produção."]}
        slashWord="produção."
        description={contact.intro.description ?? ""}
        cards={routes}
      />

      <Block id="faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionTitle kicker={faq.intro.kicker} title={faq.intro.title} />
          </div>
          <Accordion items={faq.items} defaultOpen={0} />
        </div>
      </Block>

      <Block id="formulario" tone="darker">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionTitle
              kicker="Mensagem"
              title="Ainda com dúvida? Escreva."
              slashWord="Escreva."
              description="Escolha o assunto no formulário. A equipe responde pelo e-mail informado."
            />
          </div>
          <div className="grain bg-[#111] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Block>
    </>
  );
}
