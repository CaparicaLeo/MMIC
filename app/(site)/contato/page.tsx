import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe da Meia Maratona Internacional de Curitiba 2027 · Rock Edition: dúvidas, negócios, parcerias e imprensa.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <Section id="contato" tone="darker" className="min-h-svh">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Badge className="w-fit">{contact.intro.kicker}</Badge>

            <h1 className="headline mt-8 text-[clamp(2rem,6vw,4.25rem)] text-text-white">
              {contact.intro.title}
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg">
              {contact.intro.description}
            </p>
          </div>

          <div className="grain bg-[#111] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}