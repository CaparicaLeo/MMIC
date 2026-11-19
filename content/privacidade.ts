/**
 * Política de Privacidade e aviso de cookies.
 *
 * Base: o PDF "politica-de-privacidade-meiadecuritiba" (18/11/2026), com o
 * texto ajustado ao que o site faz de verdade, conferido no código:
 * - saíram Pixel do TikTok, Google Ads e o formulário Creator Casting, que
 *   não existem no site (voltam para cá no dia em que entrarem);
 * - entraram o Vercel Analytics, o formulário de marcas e o repasse de UTMs
 *   para a Ticket Sports;
 * - GA4, Clarity e Pixel da Meta só carregam depois do aceite no aviso de
 *   cookies (components/analytics/CookieBanner.tsx), como o PDF promete.
 *
 * Antes de ligar uma ferramenta ou formulário novo, atualize esta lista e a
 * data. A política precisa descrever o que o site faz, não o que ele poderia
 * fazer.
 */

export const privacyEmail = "contato@thomeesantos.com.br";

/** Parágrafo, lista ou bloco de endereço. E-mails viram link sozinhos. */
export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "address"; lines: string[] };

export type PolicySection = { id: string; title: string; blocks: PolicyBlock[] };

export const privacyPolicy = {
  hero: {
    kicker: "LGPD",
    title: ["Política de", "privacidade"],
    slashWord: "privacidade",
    description:
      "Como a Thomé & Santos coleta, usa, guarda e protege os dados de quem visita o site, se inscreve na Meia ou preenche os nossos formulários.",
  },
  lastUpdated: "18 de novembro de 2026",
  intro:
    "Esta política explica como a Thomé & Santos Eventos Esportivos coleta, usa, guarda e protege os dados pessoais de quem visita o site da Meia Maratona Internacional de Curitiba, se inscreve na prova ou preenche nossos formulários, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018, LGPD).",
  sections: [
    {
      id: "responsavel",
      title: "Quem é o responsável pelos seus dados",
      blocks: [
        {
          type: "address",
          lines: [
            "THOME SANTOS LTDA (Thomé & Santos Eventos Esportivos)",
            "CNPJ 07.472.793/0001-90",
            "Rua Imaculada Conceição, 785, Prado Velho, Curitiba, PR, CEP 80215-182",
            `Contato para privacidade: ${privacyEmail}`,
          ],
        },
      ],
    },
    {
      id: "dados",
      title: "Quais dados coletamos",
      blocks: [
        { type: "h", text: "Dados que você nos informa" },
        {
          type: "list",
          items: [
            "Grupo VIP: nome, WhatsApp e/ou e-mail, a distância que pretende correr e o canal pelo qual prefere ser avisado.",
            "Formulário de contato: e-mail, nome, telefone, idade, gênero, assunto e a mensagem que você escrever.",
            "Formulário de marcas e patrocínio: nome, e-mail e WhatsApp de quem preenche, nome da empresa, objetivos, público-alvo, região de interesse e faixa de investimento.",
            "Inscrição na prova: a inscrição é feita na plataforma Ticket Sports, que coleta os dados necessários (nome, documento, data de nascimento, contato, endereço, modalidade, tamanho de camiseta e respostas do questionário). A Ticket Sports compartilha esses dados conosco para a organização do evento.",
          ],
        },
        { type: "h", text: "Dados coletados automaticamente" },
        {
          type: "list",
          items: [
            "Medição sem identificação (Vercel Analytics): página visitada, de onde o acesso veio, país e cidade aproximados, tipo de aparelho e navegador. Não usa cookies e não guarda o seu endereço IP.",
            "Origem da visita: quando você chega por um anúncio ou e-mail com parâmetros de campanha (utm), guardamos esses parâmetros só durante a visita e os repassamos à Ticket Sports quando você clica para se inscrever, para sabermos qual campanha trouxe a inscrição.",
            "Com o seu consentimento: dados de navegação como páginas visitadas, cliques, tempo no site, dispositivo, navegador e endereço IP aproximado, coletados pelas ferramentas do item 7.",
          ],
        },
      ],
    },
    {
      id: "finalidades",
      title: "Para que usamos seus dados",
      blocks: [
        {
          type: "list",
          items: [
            "Organizar a prova: inscrição, retirada de kit, cronometragem, resultados, comunicação sobre o evento e atendimento.",
            "Avisar o Grupo VIP sobre a votação da camiseta, o line-up e a abertura dos lotes.",
            "Responder ao seu contato e conversar com empresas interessadas em patrocinar ou ativar marcas na prova.",
            "Enviar novidades da Meia e de outras provas da Thomé & Santos, quando você autorizar.",
            "Medir e melhorar o site e os anúncios: entender de onde vêm os visitantes, quais páginas funcionam e quanto custa cada inscrição.",
            "Exibir anúncios para quem já demonstrou interesse na prova, quando você autorizar.",
            "Cumprir obrigações legais e regulatórias e nos defender em processos.",
          ],
        },
      ],
    },
    {
      id: "bases-legais",
      title: "Bases legais (art. 7º da LGPD)",
      blocks: [
        {
          type: "list",
          items: [
            "Execução de contrato e procedimentos preliminares: dados da inscrição e da participação na prova, e o atendimento de quem nos procura pelos formulários de contato e de marcas.",
            "Consentimento: Grupo VIP, newsletter, comunicação de marketing e cookies de medição e publicidade.",
            "Legítimo interesse: medição sem identificação, atribuição de campanhas, segurança do site, prevenção de fraudes e melhoria dos nossos serviços, sempre respeitando seus direitos.",
            "Cumprimento de obrigação legal: guarda de registros exigida por lei.",
          ],
        },
      ],
    },
    {
      id: "compartilhamento",
      title: "Com quem compartilhamos",
      blocks: [
        { type: "p", text: "Não vendemos seus dados. Compartilhamos apenas o necessário com:" },
        {
          type: "list",
          items: [
            "Ticket Sports, plataforma de inscrição e pagamento.",
            "Empresas de tecnologia que nos ajudam a operar: hospedagem do site (Vercel), hospedagem do nosso sistema de gestão de contatos (Hostinger), envio de e-mails (Brevo), WhatsApp, armazenamento em nuvem (Google) e automação.",
            "Plataformas de medição e anúncios, só com o seu consentimento: Meta (Facebook e Instagram), Google (Analytics) e Microsoft Clarity.",
            "Patrocinadores e parceiros oficiais, somente quando você autorizar expressamente.",
            "Autoridades públicas, quando a lei exigir.",
          ],
        },
        {
          type: "p",
          text: "Alguns desses fornecedores guardam dados fora do Brasil. Nesses casos exigimos que sigam padrões de proteção compatíveis com a LGPD.",
        },
      ],
    },
    {
      id: "retencao",
      title: "Por quanto tempo guardamos",
      blocks: [
        {
          type: "list",
          items: [
            "Dados de inscrição: pelo prazo necessário para a prova e pelos prazos legais de guarda.",
            "Grupo VIP, contato e marcas: até 24 meses depois do último contato, ou até você pedir a exclusão.",
            "Marketing: até você cancelar o recebimento ou retirar o consentimento.",
            "Dados de navegação: pelos prazos de cada ferramenta, em geral até 26 meses. Os parâmetros de campanha somem quando você fecha a aba.",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies e pixels",
      blocks: [
        {
          type: "p",
          text: "Usamos armazenamento essencial, que faz o site funcionar e guarda a sua escolha no aviso de cookies, e cookies de medição e publicidade, que só são ativados depois do seu consentimento:",
        },
        {
          type: "list",
          items: [
            "Google Analytics 4 (medição): estatísticas de visita.",
            "Microsoft Clarity (medição): mapas de calor e gravação anônima de navegação, para melhorar o site.",
            "Pixel da Meta (publicidade): medir resultados de anúncios e mostrar anúncios para quem já visitou o site.",
          ],
        },
        {
          type: "p",
          text: "O Vercel Analytics, que conta visitas sem cookies e sem identificar você, funciona independentemente da escolha.",
        },
        {
          type: "p",
          text: "Você pode mudar suas escolhas a qualquer momento em “Preferências de cookies”, no rodapé do site, ou nas configurações do seu navegador. Ao retirar o consentimento, apagamos os cookies dessas ferramentas do seu navegador.",
        },
      ],
    },
    {
      id: "direitos",
      title: "Seus direitos",
      blocks: [
        { type: "p", text: "Pela LGPD você pode, a qualquer momento:" },
        {
          type: "list",
          items: [
            "Confirmar se tratamos seus dados e ter acesso a eles.",
            "Corrigir dados incompletos ou desatualizados.",
            "Pedir anonimização, bloqueio ou exclusão de dados desnecessários.",
            "Pedir a portabilidade dos dados.",
            "Saber com quem compartilhamos seus dados.",
            "Retirar o consentimento e pedir a exclusão dos dados tratados com base nele.",
            "Se opor a tratamentos feitos com base no legítimo interesse.",
          ],
        },
        {
          type: "p",
          text: `Para exercer seus direitos, escreva para ${privacyEmail}. Respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).`,
        },
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      blocks: [
        {
          type: "p",
          text: "Usamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou vazamento, como conexão segura (HTTPS), acesso restrito por senha e fornecedores com padrões de segurança reconhecidos.",
        },
      ],
    },
    {
      id: "menores",
      title: "Menores de idade",
      blocks: [
        {
          type: "p",
          text: "Inscrições de menores de 18 anos só são aceitas com autorização do responsável legal, conforme o regulamento da prova.",
        },
      ],
    },
    {
      id: "imagem",
      title: "Imagem",
      blocks: [
        {
          type: "p",
          text: "Fotos e vídeos feitos durante o evento podem ser usados na divulgação da prova, nos termos do regulamento aceito na inscrição.",
        },
      ],
    },
    {
      id: "mudancas",
      title: "Mudanças nesta política",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar esta política. A data da última atualização fica sempre no topo desta página.",
        },
      ],
    },
  ] satisfies PolicySection[],
};

export const cookieBanner = {
  title: "Cookies na Meia",
  text: "Usamos cookies de medição (Google Analytics e Microsoft Clarity) e de publicidade (Pixel da Meta) para entender o site e mostrar anúncios da prova. Eles só ligam se você aceitar. Saiba mais na",
  linkLabel: "Política de Privacidade",
  detailsLegend: "Escolha quais cookies aceitar",
  categories: {
    essential: {
      label: "Essenciais",
      text: "Fazem o site funcionar e guardam esta escolha. Sempre ativos.",
    },
    analytics: {
      label: "Medição",
      text: "Google Analytics e Microsoft Clarity: como o site é usado, para melhorá-lo.",
    },
    marketing: {
      label: "Publicidade",
      text: "Pixel da Meta: resultados dos anúncios e anúncios para quem já visitou.",
    },
  },
  acceptAll: "Aceitar todos",
  rejectAll: "Recusar",
  customize: "Personalizar",
  save: "Salvar escolhas",
};
