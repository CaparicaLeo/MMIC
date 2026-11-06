import type { SectionIntro, TimelineItem } from "./types";

/**
 * Finalistas do concurso de camisetas — /concurso-de-camisetas/finalistas e
 * uma página por finalista em /concurso-de-camisetas/finalistas/[slug].
 *
 * A grade e as rotas saem desta lista: adicionar uma finalista é adicionar um
 * objeto aqui, sem mexer em componente. As imagens ficam em
 * `public/images/finalistas/<slug>/` (avatar, camisa, conceito e aplicacao,
 * em .webp) e os campos de imagem levam o caminho a partir de `public`.
 *
 * As proporções são fixadas pelo layout, então a arte entregue deve vir nelas:
 *  - `avatar`: quadrada (1:1);
 *  - `imagemCamisa`: horizontal (16:9) — aparece inteira, sem corte;
 *  - `imagemConceito`: horizontal (16:10);
 *  - `imagemAplicacao`: vertical (3:4) — mockup da camisa, também é a capa
 *    do card na grade.
 *
 * Os textos alternativos das imagens são montados a partir de `nome` e
 * `titulo`, por isso não há campo de alt.
 */
export type ContestFinalist = {
  /** Trecho da URL. Minúsculas, sem acento, palavras separadas por hífen. */
  slug: string;
  /** Nome como a pessoa quer ser creditada. */
  nome: string;
  /** Ex.: "Curitiba (PR)". Vazio (""), a cidade não aparece. */
  cidade: string;
  avatar: string;
  /** Nome que a pessoa deu à arte. */
  titulo: string;
  imagemCamisa: string;
  imagemConceito: string;
  imagemAplicacao: string;
  /** Texto do designer. Parágrafos separados por linha em branco ("\n\n"). */
  textoConceito: string;
  /**
   * Bio de quem criou a arte, como a pessoa enviou. Parágrafos separados por
   * linha em branco ("\n\n"). Opcional: sem bio, o bloco não aparece.
   */
  bio?: string;
  /** Perfil do Instagram, sem @ (ex.: "fulano.design"). Opcional. */
  instagram?: string;
  /** Posição na grade e na navegação anterior/próxima, a partir de 1. */
  ordem: number;
};

/**
 * Destino dos botões de voto: o grupo secreto da votação no Instagram, com
 * link próprio (o grupo VIP geral continua em `waitlistUrl`).
 */
export const contestVotingUrl: string = "https://www.instagram.com/j/iK3rM3fyK0RvKVZK/";

/** Caminho de uma imagem em public/images/finalistas/<slug>/. */
const img = (slug: string, file: string) => `/images/finalistas/${slug}/${file}`;

// TODO(conteudo): cidade de cada finalista (não consta nos PDFs) e revisão dos
// textos de conceito, extraídos dos PDFs enviados pelos designers.
const finalists: ContestFinalist[] = [
  {
    slug: "alan-barg",
    nome: "Alan Barg",
    cidade: "",
    avatar: img("alan-barg", "avatar.webp"),
    titulo: "O som visível",
    imagemCamisa: img("alan-barg", "camisa.webp"),
    imagemConceito: img("alan-barg", "conceito.webp"),
    imagemAplicacao: img("alan-barg", "aplicacao.webp"),
    textoConceito:
      "A proposta reúne corrida, rock e Curitiba em uma única identidade visual. A composição explora uma linguagem sinestésica, transformando características sonoras em recursos gráficos: a intenção é tornar o som visível, usando formas, cores, contrastes e movimento para evocar sensações normalmente associadas à audição. O rock distorce, o rock vibra, o rock pulsa, o rock contrasta.\n\nA estampa propõe dois níveis de leitura. À distância, o contraste, o ritmo e as interferências gráficas evocam a intensidade do rock. De perto, revelam-se os detalhes que conectam música, corrida e Curitiba. Três painéis conduzem a narrativa: o impulso, com os corredores correndo dentro do próprio disco de vinil; a imersão, com o protagonismo dos atletas; e a cidade, com a cartografia revelando a dimensão da jornada por Curitiba.\n\nA música impulsiona. O corpo percorre. A cidade registra.",
    bio: "Sou rockeiro desde que nasci e formado em Desenho Industrial! Comecei a correr há cerca de um ano, e a corrida virou parte essencial da minha vida! Fiz meus primeiros 21 km na MMIC 2026, depois de meses treinando e sonhando com esse dia. Quando anunciaram a Rock Edition e o concurso, mergulhei de cabeça! Foram horas de pesquisa, testes e criação. Ver a galera correndo com uma arte minha, unindo corrida, rock e Curitiba, seria incrível! Estou ansioso para curtir cada segundo do evento, da largada aos shows!",
    ordem: 1,
  },
  {
    slug: "daniel-serpa",
    nome: "Daniel Serpa",
    cidade: "",
    avatar: img("daniel-serpa", "avatar.webp"),
    titulo: "Electric Eye",
    imagemCamisa: img("daniel-serpa", "camisa.webp"),
    imagemConceito: img("daniel-serpa", "conceito.webp"),
    imagemAplicacao: img("daniel-serpa", "aplicacao.webp"),
    textoConceito:
      "E se o espírito do rock assumisse a forma de um titã, o Electric Eye, e corresse como um atleta colossal? Se esse evento ocorresse em Curitiba, ele usaria o MON como sua cabeça. Pelo tamanho, talvez seu pace não seja o melhor, mas ele dá o seu melhor e garante um espetáculo de raios vindos de seu olho elétrico. Milhares de fanáticos por rock e por corrida acompanhariam o evento de perto, correndo em volta do titã do rock, com cuidado para não serem esmagados.\n\nA proposta ilustra essa história com um estilo de texturas ásperas, linhas imperfeitas e enérgicas. As inspirações são o design gráfico punk, as obras de Jean-Michel Basquiat, a música Electric Eye, do Judas Priest, e o verso Keep your 'lectric eye on me babe, de Moonage Daydream, de David Bowie.",
    bio: "Minha história com a arte começou no jardim de infância, eu era uma criança que passava horas copiando personagens de histórias em quadrinho e mangás. O interesse em desenhar foi evoluindo comigo, nunca larguei o lápis e nunca parei de buscar novas referências. Me formei de Artes e Design em Minas Gerais, onde aprendi muito sobre história da arte e ganhei repertório visual. Hoje trabalho como designer gráfico e faço ilustrações para estampas de camiseta, e gosto de correr 5km todos os dias de manhã num pace cansado antes de trabalhar 🤣",
    ordem: 2,
  },
  {
    slug: "diego-rosa",
    nome: "Diego Rosa",
    cidade: "",
    avatar: img("diego-rosa", "avatar.webp"),
    titulo: "Curitiba no volume máximo",
    imagemCamisa: img("diego-rosa", "camisa.webp"),
    imagemConceito: img("diego-rosa", "conceito.webp"),
    imagemAplicacao: img("diego-rosa", "aplicacao.webp"),
    textoConceito:
      "A proposta transforma a Meia Maratona em uma edição cultural da cidade. Corrida, rock e Curitiba não aparecem como três temas separados: eles ocupam a mesma composição e constroem uma única identidade.\n\nA cidade surge na base como uma paisagem sonora. Elementos reconhecíveis de Curitiba se misturam a frequências, picos e interferências gráficas, fazendo o skyline funcionar ao mesmo tempo como cidade e onda de áudio. O personagem é Plá, músico ligado à cena roqueira curitibana, reinterpretado como corredor: uma figura associada à música assume o corpo e o movimento da corrida.\n\nA linguagem gráfica se inspira nas camisetas de bandas, pôsteres de shows e impressos underground: alto contraste, vermelho, preto e branco, textura desgastada, raios e tipografia de forte presença. A peça foge deliberadamente da estética tradicional de camiseta esportiva e se aproxima de um merch de edição única.",
    bio: "Designer há mais de 15 anos e sócio-fundador da Allpiz. Atuo com identidade visual, UX/UI e design para lançamentos digitais, unindo estratégia e criatividade para conectar marcas e pessoas. Também sou criador da CRIVIS, onde ensino profissionais a transformar ideias em imagens com intenção, explorando design, direção visual e inteligência artificial.",
    ordem: 3,
  },
  {
    slug: "dilmar-junior",
    nome: "Dilmar Junior",
    cidade: "",
    avatar: img("dilmar-junior", "avatar.webp"),
    titulo: "Rock, corrida e Curitiba",
    imagemCamisa: img("dilmar-junior", "camisa.webp"),
    imagemConceito: img("dilmar-junior", "conceito.webp"),
    imagemAplicacao: img("dilmar-junior", "aplicacao.webp"),
    textoConceito:
      "O conceito da arte consiste em agregar os elementos que definem cada tema da edição: Curitiba, corrida e música, nesse caso o rock.\n\nA logo como marca d'água caracteriza o símbolo da cidade, junto com a silhueta do mapa de Curitiba. A combinação do cabo da guitarra com o mapa caracteriza o tema e a cidade. O tênis e o fone são peças fundamentais no dia a dia do atleta amador, e a caixa de som dá clareza ao tema, compondo uma unidade que soma rock e corrida.",
    bio: "Olá, sou Dilmar J. Kempner Junior, formado em design gráfico pelo universidade Positivo. Atuo na área de design e ilustração à 20 anos, tendo como experiência, a criação de layouts, editoração de livros, ilustração editorial e publicitária e mídias digitais.",
    ordem: 4,
  },
  {
    slug: "gilberto-hass",
    nome: "Gilberto Hass",
    cidade: "",
    avatar: img("gilberto-hass", "avatar.webp"),
    titulo: "Pulmão em volume máximo",
    imagemCamisa: img("gilberto-hass", "camisa.webp"),
    imagemConceito: img("gilberto-hass", "conceito.webp"),
    imagemAplicacao: img("gilberto-hass", "aplicacao.webp"),
    textoConceito:
      "O que acontece quando o ritmo dos corredores encontra a potência do rock? A cidade vibra. Sob as passadas e as ondas sonoras, o chão de Curitiba parece estremecer: as pedras da calçada ganham movimento, o mosaico se desprende e dá forma a pulmões que se transformam em guitarra. A cidade pulsa, o corredor respira e Curitiba entra no volume máximo.\n\nO pulmão representa a respiração, a resistência e o esforço de quem enfrenta os 21 quilômetros. A guitarra emerge da própria estrutura pulmonar, integrando braço, cordas e trastes à anatomia do órgão. O mosaico é inspirado no petit-pavé das calçadas da cidade, e os pinhões estilizados em vermelho reforçam a conexão com o pinheiro, referência natural e cultural do Paraná.\n\nA calçada vibra, o mosaico ganha vida, o pulmão respira e se transforma em guitarra. Curitiba não apenas recebe a corrida e o rock: ela pulsa no volume máximo.",
    bio: "Sou formado em Administração de Empresas e especialista em Comunicação, Marcas e Consumo. Atuo como designer desde 2007, unindo pensamento estratégico e sensibilidade criativa na construção de identidades visuais. Minha relação com a arte nasce da curiosidade, da paixão por viajar e conhecer diferentes culturas. Acredito que referências diversas, olhar atento e criatividade são ingredientes essenciais para transformar ideias em experiências visuais.",
    ordem: 5,
  },
  {
    slug: "icaro-andrew",
    nome: "Icaro Andrew",
    cidade: "",
    avatar: img("icaro-andrew", "avatar.webp"),
    titulo: "Music, Mind, Motion",
    imagemCamisa: img("icaro-andrew", "camisa.webp"),
    imagemConceito: img("icaro-andrew", "conceito.webp"),
    imagemAplicacao: img("icaro-andrew", "aplicacao.webp"),
    instagram: "sec.vikare",
    textoConceito:
      "A pesquisa conceitual começou com a Sugar Kane, banda de hardcore de Curitiba. O verso Me permitir saber voar, da música Identidade, despertou a associação entre música, liberdade e superação, a sensação de ouvir uma faixa que impulsiona o corpo durante uma corrida. Daí surgiram as tatuagens tradicionais de pássaros, presentes na estética de quem se identifica com a cultura rock.\n\nEssa referência se conectou à gralha-azul, ave-símbolo do Paraná. A ilustração apresenta duas gralhas-azuis disputando um pinhão. Espinhos e grafismos reforçam a agressividade visual sem recorrer às representações mais previsíveis do gênero, e uma onda sonora forma um arco semelhante a um resplendor sobre as aves.\n\nAssim nasce MMM, Music, Mind, Motion: música que ativa a mente e coloca o corpo em movimento.",
    ordem: 6,
  },
  {
    slug: "junior-designer",
    nome: "Junior",
    cidade: "",
    avatar: img("junior-designer", "avatar.webp"),
    titulo: "Curitiba no volume",
    imagemCamisa: img("junior-designer", "camisa.webp"),
    imagemConceito: img("junior-designer", "conceito.webp"),
    imagemAplicacao: img("junior-designer", "aplicacao.webp"),
    textoConceito:
      "O desafio de desenvolver a estampa começou em conhecer Curitiba. Após um ciclo de pesquisas por referências, curiosidades, fatos, locais históricos e marcos, o primeiro ponto de inspiração foi o Jardim Botânico, um dos principais pontos da cidade. O segundo é o Teatro Guaíra, com sua fachada icônica, um mural do artista local Poty Lazzarotto.\n\nA partir dessas duas referências nasceram os elementos da estampa: formas com inspiração direta na geometria quase perfeita do Jardim, e símbolo e tipografia inspirados nos traços únicos de Poty. A proposta busca fazer coincidir arquitetura, arte, esporte e rock, escapando de clichês tanto das atividades quanto da cidade.",
    bio: "Tenho 27 anos, e sou paraibano. Desde criança era atraído por algo que não sabia que era design, como passar horas e horas editando camisas nos jogos de futebol e pinturas de carros de corrida, ou ficar observando fachadas por aí. Me formei em design pela UNICSUL, mas profissionalmente ainda não tive as melhores oportunidades de fazer meu trabalho. Como não tenho muito repertório prático na área, meu portfólio é quase inexistente, contando com projetos pessoais ou fictícios, mas vamos seguir tentando! Muito contente em estar entre os 10 finalistas de um projeto tão divertido de se trabalhar.",
    ordem: 7,
  },
  {
    slug: "melanie-kozlowski",
    nome: "Melanie Kozlowski",
    cidade: "",
    avatar: img("melanie-kozlowski", "avatar.webp"),
    titulo: "O ritmo do asfalto",
    imagemCamisa: img("melanie-kozlowski", "camisa.webp"),
    imagemConceito: img("melanie-kozlowski", "conceito.webp"),
    imagemAplicacao: img("melanie-kozlowski", "aplicacao.webp"),
    textoConceito:
      "A ideia surgiu da união entre corrida, música e Curitiba. Como a edição tem o rock como tema, o disco de vinil é o elemento principal da composição, criando uma relação entre o ritmo da música e o ritmo da corrida: os dois envolvem movimento, intensidade, energia e cadência. Curitiba é o palco desse encontro.\n\nOs sulcos do vinil criam movimento e remetem à cadência da corrida. A agulha do toca-discos dá a sensação de que o disco está começando a tocar. Os corredores aparecem em diferentes pontos do vinil, acompanhando os sulcos, e no centro um corredor ganha destaque ao lado do Desde 2014, que valoriza a história da prova. Na parte inferior, pontos marcantes de Curitiba formam uma silhueta da cidade integrada à composição. As texturas em halftone remetem à expansão do som pela cidade.",
    bio: "Sou designer e gosto de explorar a criatividade por meio de diferentes formas de expressão visual, especialmente ilustração e design gráfico. Além do design, a corrida também é uma das minhas grandes paixões. Foi um esporte em que me encontrei e que me ensinou a confiar mais em mim, enfrentar desafios e alcançar distâncias que antes pareciam impossíveis. Participar de um concurso que une esporte, música e criatividade foi uma oportunidade especial de conectar esses dois universos que fazem parte de quem sou.",
    ordem: 8,
  },
  {
    slug: "ricardo-hurmus",
    nome: "Ricardo Hurmus",
    cidade: "",
    avatar: img("ricardo-hurmus", "avatar.webp"),
    titulo: "Curitiba no ritmo da música",
    imagemCamisa: img("ricardo-hurmus", "camisa.webp"),
    imagemConceito: img("ricardo-hurmus", "conceito.webp"),
    imagemAplicacao: img("ricardo-hurmus", "aplicacao.webp"),
    textoConceito:
      "A proposta traduz o encontro entre esporte, música e cidade valorizando a identidade cultural de Curitiba, a energia do rock e a diversidade dos participantes. Como alternativa aos símbolos convencionais do rock, o elemento central é o violão de Paulo Leminski, referência à escultura da Pedreira Paulo Leminski, local que recebeu a chegada das duas últimas edições da prova.\n\nAs cordas do violão se transformam em faixas de pedestres, simbolizando a música que ocupa as ruas e transforma a cidade em palco. Sobre elas, quatro personagens representam a pluralidade da corrida: um homem acima do peso, uma mulher, um atleta em cadeira de rodas esportiva e uma capivara. A disposição faz referência à capa do álbum Abbey Road, dos Beatles. A linguagem gráfica se inspira nas ilustrações de Poty Lazzarotto.\n\nUma Curitiba que corre, vibra e se encontra no volume máximo.",
    bio: "Ricardo Hurmus (Hurmus) é designer gráfico e artista visual de Curitiba, com trajetória iniciada em 1996. Atua nas áreas de identidade visual, ilustração, direção de arte e comunicação. Sua produção combina referências culturais, experimentação e diferentes linguagens visuais. Apaixonado por arte, música e corrida, encontra no design uma forma de contar histórias, conectar universos e transformar ideias em imagens.",
    ordem: 9,
  },
  {
    slug: "vitor-ferreira-martins",
    nome: "Vitor Ferreira Martins",
    cidade: "",
    avatar: img("vitor-ferreira-martins", "avatar.webp"),
    titulo: "CWB 2027",
    imagemCamisa: img("vitor-ferreira-martins", "camisa.webp"),
    imagemConceito: img("vitor-ferreira-martins", "conceito.webp"),
    imagemAplicacao: img("vitor-ferreira-martins", "aplicacao.webp"),
    textoConceito:
      "A estampa condensa quatro ideias em um único símbolo. A guitarra, referência máxima ao rock. Curitiba, com CWB como a marca da cidade. O percurso, em linhas contínuas que se assemelham aos trajetos indicados em apps de corrida. E o headstock, a parte da guitarra que referencia o topo da estufa do Jardim Botânico.\n\nCuritiba, rock, pace: uma manhã inesquecível.",
    ordem: 10,
  },
];

/** Já em ordem de exibição: quem lê não precisa ordenar de novo. */
export const contestFinalists = [...finalists].sort((a, b) => a.ordem - b.ordem);

/** Copy das páginas de finalistas. */
export const contestFinalistsPage = {
  kicker: "Concurso de Camisetas · Finalistas",
  href: "/concurso-de-camisetas/finalistas",
  /** Botão em /concurso-de-camisetas que leva à grade. */
  linkLabel: "Ver as finalistas",
  /**
   * Período da votação, exibido abaixo do título da grade.
   * Ex.: "Votação de 10 a 20 de novembro de 2026". Enquanto for null, a página
   * mostra `votingFallback`.
   */
  votingPeriod: "Votação de 3 a 5 de novembro" as string | null,
  votingFallback: "Votação aberta a todos pelo Instagram oficial da prova.",
  voteLabel: "Votar",
  voteNote:
    "A votação acontece no nosso grupo secreto no Instagram. Qualquer pessoa pode votar.",
  backLabel: "Voltar para as finalistas",
  conceptKicker: "Conceito",
  bioKicker: "Sobre o designer",
  applicationCaption: "Aplicação na camisa técnica preta. Imagem ilustrativa.",
  /**
   * Chamada para a votação, logo abaixo da grade. `title` tem uma linha por
   * item (cada uma entra com máscara); a última leva o realce vermelho.
   */
  votingCall: {
    kicker: "De 3 a 5 de novembro",
    title: ["A decisão está", "nas suas mãos!"],
    paragraphs: [
      `Depois de uma seleção marcada por muita criatividade, talento e rigorosos testes técnicos de impressão e aplicação, apresentamos as ${contestFinalists.length} artes finalistas que estão na disputa para estampar a camiseta oficial da Meia Maratona Internacional de Curitiba 2027 – Rock Edition!`,
      "A votação acontece exclusivamente em nosso grupo secreto no Instagram, onde a comunidade poderá escolher sua arte favorita.",
      "Agora é com vocês! Entre no grupo, conheça as finalistas e vote na arte que vai vestir milhares de corredores em 2027!",
    ],
    ctaLabel: "Entrar no grupo e votar",
    /** Fecho em caixa alta, também usado na faixa em rolagem. */
    slogan: [`${contestFinalists.length} artes.`, "Uma escolha.", "Muito rock'n'roll!"],
  },
};

/**
 * "Daqui pra frente": os passos do concurso a partir da escolha das
 * finalistas. Aparece em /concurso-de-camisetas, logo abaixo do hero, e em
 * /concurso-de-camisetas/finalistas, abaixo da grade.
 *
 * Os rótulos de `time` são datas e marcos, não "agora"/"concluído": a seção
 * continua certa depois que a votação abrir, sem precisar trocar o texto.
 */
export const contestSteps = {
  intro: {
    kicker: "Próximos passos",
    title: "Como o concurso segue daqui.",
    description:
      "A curadoria já escolheu as finalistas. Daqui até a camisa oficial, o caminho é este, e qualquer pessoa pode participar da votação.",
  } satisfies SectionIntro,
  items: [
    {
      id: "finalistas",
      time: "Concluído",
      title: "Curadoria escolhe as finalistas",
      description: `As propostas foram avaliadas por clareza de conceito, originalidade e viabilidade de produção. ${contestFinalists.length} artes chegaram à final.`,
    },
    {
      id: "lista",
      time: "Até 3 de novembro",
      title: "Entre no grupo secreto",
      description:
        "A votação acontece no nosso grupo secreto no Instagram. Entre pelo botão desta seção para receber o aviso de abertura.",
    },
    {
      id: "votacao",
      time: "3 a 5 de novembro",
      title: "Vote na sua favorita",
      description:
        "Qualquer pessoa vota, sem precisar estar inscrita na prova. Conheça cada arte e o conceito por trás dela nas páginas das finalistas.",
    },
    {
      id: "resultado",
      time: "Depois da votação",
      title: "Resultado",
      description:
        "Curadoria e voto do público definem o 1º, o 2º e o 3º lugar. O anúncio sai no Instagram oficial e aqui no site.",
    },
    {
      id: "camisa",
      time: "Rock Edition 2027",
      title: "A arte vai para a camisa",
      description:
        "O 1º lugar estampa a camisa dos 21 km, o 2º a dos 10 km e o 3º a dos 5 km, cada uma assinada pelo autor.",
    },
  ] satisfies TimelineItem[],
};
