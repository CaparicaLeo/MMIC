/**
 * Gera content/paginas/altimetria.ts a partir dos GPX oficiais em
 * public/percursos/ (exportados do Strava).
 *
 *   npm run altimetria
 *
 * Rode de novo sempre que uma rota mudar: o site não lê GPX em tempo de
 * execução, só os números prontos que este script grava.
 *
 * O que sai por distância:
 * - `samples`: altitude (m) a cada STEP_KM, com média móvel curta para tirar
 *   o ruído do modelo de terreno sem apagar as subidas de verdade;
 * - ganho e perda acumulados (sobre a série suavizada), mínimo e máximo;
 * - `climb`: a maior subida contínua (tolera quedas de até DIP_M no meio).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const STEP_KM = 0.1;
const SMOOTH = 3; // janela da média móvel, em amostras (300 m)
const DIP_M = 3;

const routes = [
  { id: "21k", file: "mmic-2027-21k.gpx" },
  { id: "10k", file: "mmic-2027-10k.gpx" },
  { id: "5k", file: "mmic-2027-5k.gpx" },
];

function parse(xml) {
  const re = /<trkpt lat="([-\d.]+)" lon="([-\d.]+)">\s*<ele>([-\d.]+)<\/ele>/g;
  const points = [];
  for (const m of xml.matchAll(re))
    points.push([Number(m[1]), Number(m[2]), Number(m[3])]);
  if (points.length < 2) throw new Error("GPX sem trkpt com <ele>");
  return points;
}

function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function profile(points) {
  const dist = [0];
  for (let i = 1; i < points.length; i++)
    dist.push(dist[i - 1] + haversine(points[i - 1], points[i]));
  const total = dist.at(-1);

  // Reamostra em passos fixos por interpolação linear.
  const raw = [];
  let j = 0;
  for (let d = 0; d <= total + 1e-6; d += STEP_KM * 1000) {
    while (j < dist.length - 2 && dist[j + 1] < d) j++;
    const span = dist[j + 1] - dist[j] || 1;
    const t = Math.min(1, Math.max(0, (d - dist[j]) / span));
    raw.push(points[j][2] + t * (points[j + 1][2] - points[j][2]));
  }
  raw.push(points.at(-1)[2]);

  const half = Math.floor(SMOOTH / 2);
  const samples = raw.map((_, i) => {
    const slice = raw.slice(Math.max(0, i - half), i + half + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });

  let gain = 0;
  let loss = 0;
  for (let i = 1; i < samples.length; i++) {
    const delta = samples[i] - samples[i - 1];
    if (delta > 0) gain += delta;
    else loss -= delta;
  }

  // Maior subida contínua.
  let best = { rise: 0, from: 0, to: 0 };
  let start = 0;
  let peak = 0;
  const close = () => {
    const rise = samples[peak] - samples[start];
    if (rise > best.rise) best = { rise, from: start, to: peak };
  };
  for (let i = 1; i < samples.length; i++) {
    if (samples[i] > samples[peak]) peak = i;
    if (samples[peak] - samples[i] > DIP_M) {
      close();
      start = i;
      peak = i;
    }
    if (samples[i] < samples[start]) {
      start = i;
      peak = i;
    }
  }
  close();

  const max = Math.max(...samples);
  const min = Math.min(...samples);
  const round1 = (n) => Math.round(n * 10) / 10;

  return {
    distanceKm: round1(total / 1000),
    stepKm: STEP_KM,
    gainM: Math.round(gain),
    lossM: Math.round(loss),
    minM: Math.round(min),
    maxM: Math.round(max),
    maxAtKm: round1(samples.indexOf(max) * STEP_KM),
    climb: {
      fromKm: round1(best.from * STEP_KM),
      toKm: round1(best.to * STEP_KM),
      riseM: Math.round(best.rise),
    },
    samples: samples.map((v) => Math.round(v)),
  };
}

const out = {};
for (const route of routes) {
  const xml = readFileSync(join(root, "public/percursos", route.file), "utf8");
  out[route.id] = { gpx: `/percursos/${route.file}`, ...profile(parse(xml)) };
  const p = out[route.id];
  console.log(
    `${route.id}: ${p.distanceKm} km · +${p.gainM} m / -${p.lossM} m · ${p.minM}–${p.maxM} m · subida ${p.climb.fromKm}–${p.climb.toKm} km (+${p.climb.riseM} m)`,
  );
}

const file = `/**
 * GERADO por scripts/altimetria.mjs a partir dos GPX de public/percursos/.
 * Não edite à mão: rode \`npm run altimetria\` depois de trocar um GPX.
 */
import type { AltimetriaData } from "../types";

export const altimetria = ${JSON.stringify(out, null, 2)} satisfies Record<"21k" | "10k" | "5k", AltimetriaData>;
`;
writeFileSync(join(root, "content/paginas/altimetria.ts"), file);
console.log("ok: content/paginas/altimetria.ts");
