import type { Media } from "./types";

/**
 * Fotos de corrida com a camisa "Curitiba é Rock · Curitiba Corre", em
 * `public/images/fotos/`. São o fundo das seções do site (via
 * <SectionBackdrop>) e, no caso do palco, a imagem do bloco do show.
 *
 * Cada seção usa uma foto diferente da vizinha, para o site não parecer
 * papel de parede repetido. Para trocar o fundo de uma seção, troque a
 * entrada dela em `backdrops`, lá embaixo.
 */
const photo = (file: string, width: number, height: number, alt: string): Media => ({
  src: `/images/fotos/${file}.webp`,
  alt,
  width,
  height,
});

export const photos = {
  pelotaoDia: photo("pelotao-dia", 1536, 1536, "Pelotão de corredores de camisa preta numa avenida, de dia"),
  pelotaoDia2: photo("pelotao-dia-2", 1536, 1536, "Pelotão de corredores de camisa preta numa avenida, de dia"),
  pelotaoDiaLargo: photo("pelotao-dia-largo", 2048, 1152, "Pelotão de corredores de camisa preta numa avenida, de dia"),
  pelotaoDiaVertical: photo("pelotao-dia-vertical", 1228, 2200, "Corredores de camisa preta numa rua arborizada"),
  corredoraDiaVertical: photo("corredora-dia-vertical", 1228, 2200, "Corredora sorrindo à frente do pelotão"),
  corredoraDiaVertical2: photo("corredora-dia-vertical-2", 1228, 2200, "Corredora sorrindo à frente do pelotão"),
  pelotaoNoite: photo("pelotao-noite", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  pelotaoNoite2: photo("pelotao-noite-2", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  pelotaoNoite3: photo("pelotao-noite-3", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  pelotaoNoite4: photo("pelotao-noite-4", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  pelotaoNoiteLargo: photo("pelotao-noite-largo", 2400, 1340, "Pelotão vibrando numa rua de Curitiba à noite"),
  pelotaoNoiteVertical: photo("pelotao-noite-vertical", 1228, 2200, "Corredora fazendo chifrinho do rock à frente do pelotão, à noite"),
  pelotaoNoitePbVertical: photo("pelotao-noite-pb-vertical", 1228, 2200, "Pelotão à noite, em preto e branco"),
  corredoraNoitePbVertical: photo("corredora-noite-pb-vertical", 1228, 2200, "Corredora vibrando à noite, em preto e branco"),
  duplaCentroPb: photo("dupla-centro-pb", 1536, 1536, "Dupla correndo entre prédios do centro, em preto e branco"),
  duplaCentroPb2: photo("dupla-centro-pb-2", 1536, 1536, "Dupla correndo entre prédios do centro, em preto e branco"),
  duplaCentroPbVertical: photo("dupla-centro-pb-vertical", 1476, 2200, "Dupla correndo entre prédios do centro, em preto e branco"),
  duplaPortaDeAco: photo("dupla-porta-de-aco", 1772, 2200, "Dupla correndo diante de uma porta de aço"),
  duplaPortaDeAcoVertical: photo("dupla-porta-de-aco-vertical", 1228, 2200, "Dupla correndo diante de uma porta de aço"),
  duplaPortaDeAcoVertical2: photo("dupla-porta-de-aco-vertical-2", 1228, 2200, "Dupla correndo diante de uma porta de aço"),
  corredoraPorta: photo("corredora-porta", 2400, 2400, "Corredora passando por uma porta antiga do centro"),
  corredoraPortaVertical: photo("corredora-porta-vertical", 1228, 2200, "Corredora passando por uma porta antiga do centro"),
  corredoraPortaVertical2: photo("corredora-porta-vertical-2", 1228, 2200, "Corredora passando por uma porta antiga do centro"),
  corredorPortaDeAco: photo("corredor-porta-de-aco", 2400, 2400, "Corredor em velocidade diante de uma porta de aço, no fim da tarde"),
  corredorPortaDeAcoVertical: photo("corredor-porta-de-aco-vertical", 1228, 2200, "Corredor em velocidade diante de uma porta de aço, no fim da tarde"),
  roda: photo("roda", 2400, 2400, "Corredores em roda vistos de baixo, contra o céu"),
  rodaVertical: photo("roda-vertical", 1228, 2200, "Corredores em roda vistos de baixo, contra o céu"),
  rodaVertical2: photo("roda-vertical-2", 1228, 2200, "Corredores em roda vistos de baixo, contra o céu"),
  faixaDePedestre: photo("faixa-de-pedestre", 1800, 1800, "Corredor atravessando a faixa de pedestres, visto de cima"),
  vistaDeCimaVertical: photo("vista-de-cima-vertical", 1228, 2200, "Pelotão visto de cima, no asfalto"),
  vistaDeCimaVertical2: photo("vista-de-cima-vertical-2", 1228, 2200, "Pelotão visto de cima, cruzando a faixa de pedestres"),
  hidratacaoVertical: photo("hidratacao-vertical", 1152, 2048, "Corredora fazendo joinha com o copo d'água na boca"),
  parqueVertical: photo("parque-vertical", 1228, 2200, "Corredoras sorrindo num parque"),
  parqueVertical2: photo("parque-vertical-2", 1228, 2200, "Corredoras sorrindo num parque"),
  parqueRuaVertical: photo("parque-rua-vertical", 896, 1200, "Trio correndo numa rua arborizada"),
  duplaPbVertical: photo("dupla-pb-vertical", 1643, 2200, "Dupla encostada numa porta de aço, em preto e branco"),
  grupoPbVertical: photo("grupo-pb-vertical", 1643, 2200, "Grupo de corredores posando, em preto e branco"),
  megafoneGrupoPbVertical: photo("megafone-grupo-pb-vertical", 896, 1200, "Turma com megafone num tubo de ônibus, em preto e branco"),
  megafoneGrupoVertical: photo("megafone-grupo-vertical", 896, 1200, "Turma com megafone num tubo de ônibus"),
  megafoneVertical: photo("megafone-vertical", 896, 1200, "Corredor sorrindo com um megafone"),
  palcoShow: photo("palco-show", 1856, 1285, "Corredores atravessam o palco entre a banda e o público, no fim da tarde"),
} satisfies Record<string, Media>;

/**
 * Fundo de uma seção: `wide` no desktop e, quando existe, `portrait` abaixo
 * de `lg`. `position` é o `object-position` da foto larga — por padrão à
 * direita, que é o lado que o degradê deixa à mostra.
 */
export type Backdrop = {
  wide: Media;
  portrait?: Media;
  position?: string;
  portraitPosition?: string;
};

export const backdrops = {
  /* Home */
  concept: { wide: photos.pelotaoNoiteLargo, portrait: photos.pelotaoNoiteVertical },
  day: { wide: photos.pelotaoDiaLargo, portrait: photos.pelotaoDiaVertical },
  distances: { wide: photos.faixaDePedestre, portrait: photos.vistaDeCimaVertical2, position: "right 40%" },
  structure: { wide: photos.corredorPortaDeAco, portrait: photos.corredorPortaDeAcoVertical, position: "right 60%" },
  stats: { wide: photos.roda, portrait: photos.rodaVertical, position: "right 30%" },
  faq: { wide: photos.duplaCentroPb, portrait: photos.duplaCentroPbVertical, position: "right 65%" },
  finalCta: { wide: photos.pelotaoNoite, portrait: photos.corredoraNoitePbVertical, position: "center 35%" },

  /* Concurso de camisetas */
  race: { wide: photos.pelotaoDia, portrait: photos.corredoraDiaVertical, position: "right 55%" },
  prizes: { wide: photos.corredoraPorta, portrait: photos.corredoraPortaVertical, position: "right 55%" },
  voting: { wide: photos.pelotaoNoite4, portrait: photos.megafoneGrupoVertical, position: "right 35%" },
  rules: { wide: photos.duplaCentroPb2, portrait: photos.pelotaoNoitePbVertical, position: "right 60%" },
  timeline: { wide: photos.pelotaoDia2, portrait: photos.corredoraDiaVertical2, position: "right 55%" },
  steps: { wide: photos.duplaPortaDeAco, portrait: photos.duplaPortaDeAcoVertical, position: "right 55%" },
  contestFinalCta: { wide: photos.grupoPbVertical, portrait: photos.hidratacaoVertical, position: "center 30%" },

  /* Marcas */
  brandPillars: { wide: photos.pelotaoNoite3, portrait: photos.parqueVertical2, position: "right 35%" },
  brandAudience: { wide: photos.rodaVertical2, portrait: photos.parqueVertical, position: "right 35%" },
  brandActivations: { wide: photos.duplaPbVertical, portrait: photos.megafoneVertical, position: "right 30%" },
  brandLead: { wide: photos.duplaPortaDeAcoVertical2, portrait: photos.corredoraPortaVertical2, position: "right 45%" },
  brandFinalCta: { wide: photos.pelotaoNoite2, portrait: photos.megafoneGrupoPbVertical, position: "center 35%" },

  /* Outras páginas */
  contact: { wide: photos.vistaDeCimaVertical, portrait: photos.parqueRuaVertical, position: "right 50%" },
  comingSoon: { wide: photos.corredoraNoitePbVertical, portrait: photos.megafoneGrupoPbVertical, position: "right 40%" },
} satisfies Record<string, Backdrop>;
