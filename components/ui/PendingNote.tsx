/**
 * Marcador de dado não confirmado.
 *
 * Regra do projeto: nenhum número, data, logo ou depoimento é inventado. Quando
 * o dado ainda não foi aprovado pelo time, o valor entra no código com
 * `pending` preenchido e o componente devolve o endereço interno
 * `{{DADO_PENDENTE: descrição}}` — visível em desenvolvimento, invisível em
 * produção.
 *
 * Ele some em produção de propósito: o marcador é endereço para o time achar
 * rápido o que ainda depende de aprovação. Se vaza para o usuário final, vira
 * ruído e pior, passa a parecer um número do site.
 *
 * Não é um banner nem um aviso: é uma etiqueta de uma linha, do tamanho de uma
 * fonte de rodapé, ao lado do dado que ela qualifica.
 */
export function PendingNote({ text }: { text: string }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span className="mt-1.5 inline-flex items-center gap-1.5 border border-accent-red/50 px-2 py-0.5 font-mono text-[0.6rem] leading-tight text-accent-red">
      {`{{DADO_PENDENTE: ${text}}}`}
    </span>
  );
}