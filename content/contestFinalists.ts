import { waitlistUrl } from "./event";

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
  /** Perfil do Instagram, sem @ (ex.: "fulano.design"). Opcional. */
  instagram?: string;
  /** Posição na grade e na navegação anterior/próxima, a partir de 1. */
  ordem: number;
};

/**
 * Destino do botão "Votar": a lista de transmissão do Instagram oficial. Hoje
 * é o mesmo canal do grupo VIP; se a votação ganhar um link próprio, troque
 * só aqui.
 */
// TODO(confirmar): link da votação com a produção.
export const contestVotingUrl: string = waitlistUrl;

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
    ordem: 1,
  },
  {
    slug: "cristian-montini",
    nome: "Cristian Montini",
    cidade: "",
    avatar: img("cristian-montini", "avatar.webp"),
    titulo: "Rock, corrida e identidade urbana",
    imagemCamisa: img("cristian-montini", "camisa.webp"),
    imagemConceito: img("cristian-montini", "conceito.webp"),
    imagemAplicacao: img("cristian-montini", "aplicacao.webp"),
    instagram: "montini.artes",
    textoConceito:
      "A arte nasce da conexão entre música, movimento e identidade urbana, usando o braço da guitarra como metáfora para uma pista de corrida. Nesse percurso, os corredores tornam-se parte da composição musical, atravessando pontos turísticos que representam a história, a arquitetura e a paisagem de Curitiba.\n\nOs traços enérgicos traduzem o ritmo frenético de uma corrida que pulsa ao som do rock'n'roll. A paleta vai além do vermelho, branco e preto, incorporando referências às bandeiras de Curitiba e do Paraná. Como elemento central, o amplificador simboliza a potência da música e sua capacidade de amplificar cada acorde, cada vibração e cada passo dos corredores.\n\nMais do que uma estampa, a arte representa o encontro entre o ritmo da corrida, a potência do rock e a identidade de Curitiba, transformando movimento em música e a cidade em palco.",
    ordem: 2,
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
    ordem: 3,
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
    ordem: 4,
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
    ordem: 5,
  },
  {
    slug: "eduarda-guerra",
    nome: "Eduarda Guerra",
    cidade: "",
    avatar: img("eduarda-guerra", "avatar.webp"),
    titulo: "Curitiba é rock, Curitiba corre",
    imagemCamisa: img("eduarda-guerra", "camisa.webp"),
    imagemConceito: img("eduarda-guerra", "conceito.webp"),
    imagemAplicacao: img("eduarda-guerra", "aplicacao.webp"),
    textoConceito:
      "A ilustração une elementos da identidade curitibana e da cultura brasileira à energia do rock. A capivara foi escolhida como personagem principal por sua forte associação com Curitiba e presença marcante nos parques da cidade. Ao seu lado, a arara-azul amplia a representação da fauna brasileira. Ambas aparecem em poses dinâmicas e expressões descontraídas, transmitindo a energia e a diversão da corrida.\n\nOs raios amarelos e a expressividade dos personagens trazem referências à estética do rock, sugerindo uma trilha sonora que acompanha os corredores. Ao fundo, as estações-tubo, o Museu Oscar Niemeyer e as araucárias evocam a paisagem urbana e natural de Curitiba. O resultado é uma identidade visual que conecta esporte, música e cultura local, celebrando uma Curitiba que corre ao ritmo do rock.",
    ordem: 6,
  },
  {
    slug: "gihad-hak",
    nome: "Gihad Hak",
    cidade: "",
    avatar: img("gihad-hak", "avatar.webp"),
    titulo: "A largada é em Curitiba",
    imagemCamisa: img("gihad-hak", "camisa.webp"),
    imagemConceito: img("gihad-hak", "conceito.webp"),
    imagemAplicacao: img("gihad-hak", "aplicacao.webp"),
    instagram: "gihadtattoo",
    textoConceito:
      "Um corredor roqueiro cruza a cidade em ritmo de show. A capivara pega carona, o MON e as araucárias marcam o percurso, e o humor faz parte da prova. A proposta junta corrida, rock e referências locais em uma cena autoral, com energia de pôster e movimento de largada.\n\nA figura do corredor homenageia o Skank Kid, desenho clássico do punk rock ilustrado pela cartunista Shawn Kerri em 1980 e usado pela banda Circle Jerks: sua atitude já sugere movimento, e essa energia foi reinterpretada na cena. O estilo de Poty Lazzarotto e a estética de pôsteres clássicos de rock aparecem nos traços e na composição. A língua para fora, a mão chifrada, a perspectiva dinâmica e o lettering reforçam a atitude, o tema e o humor da estampa.",
    ordem: 7,
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
    ordem: 8,
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
    ordem: 9,
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
    ordem: 10,
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
    ordem: 11,
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
    ordem: 12,
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
    ordem: 13,
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
    "A votação acontece na lista de transmissão do nosso Instagram oficial. Qualquer pessoa pode votar.",
  backLabel: "Voltar para as finalistas",
  conceptKicker: "Conceito",
  applicationCaption: "Aplicação na camisa técnica preta. Imagem ilustrativa.",
};
