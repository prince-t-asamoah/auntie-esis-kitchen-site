// Dev-only image pipeline (shared standards §11). Run: npm run optimise-images
// Reads the original photos, crops them to the spec's aspect ratios and writes
// AVIF (q50) + WebP (q70) at 480/800w (hero also 1200w), capped at the crop width, plus
// an 800w JPEG fallback, into /images. Quality steps down only if a file would break its
// size budget. Also makes og.jpg and apple-touch-icon.png.
//
// Originals live in docs/design/kitchen-prototype/images/ (the design handoff).
// To swap a photo: replace the original, adjust its crop below if needed, re-run,
// and update the width/height attributes in the HTML if the crop size changed.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC = "docs/design/kitchen-prototype/images";
const OUT = "images";
const KB = 1024;

// crop: { left, top, width, height } in source pixels; budget in KB per file.
const jobs = [
  { name: "hero", src: "hero-waakye.jpg", crop: { left: 5, top: 0, width: 1365, height: 768 }, widths: [480, 800, 1200], budget: 100 },
  // Mobile hero: 4:5 crop, focal point 62% 50% (handoff README).
  { name: "hero-m", src: "hero-waakye.jpg", crop: { left: 546, top: 0, width: 614, height: 768 }, widths: [480, 614], budget: 100 },
  { name: "waakye-special", src: "waakye-special.jpg", crop: dish4x3(), widths: [480, 800], budget: 60 },
  // Crop starts below the branded bottle labels (handoff difference #10).
  { name: "jollof-chicken", src: "jollof-chicken.jpg", crop: { left: 130, top: 190, width: 941, height: 706 }, widths: [480, 800], budget: 60 },
  { name: "banku-tilapia", src: "banku-tilapia.jpg", crop: dish4x3(), widths: [480, 800], budget: 60 },
  { name: "fufu-light-soup", src: "fufu-light-soup.jpg", crop: dish4x3(), widths: [480, 800], budget: 60 },
  { name: "kelewele", src: "kelewele.jpg", crop: dish4x3(), widths: [480, 800], budget: 60 },
  { name: "red-red", src: "red-red.jpg", crop: dish4x3(), widths: [480, 800], budget: 60 },
  { name: "about-cook", src: "about-cook.jpg", crop: { left: 0, top: 0, width: 1024, height: 1024 }, widths: [480, 800], budget: 60 },
];

// 1200x896 originals: the largest centred 4:3 box is 1195x896.
function dish4x3() {
  return { left: 2, top: 0, width: 1195, height: 896 };
}

const report = [];
let over = 0;

async function write(pipeline, file, budget) {
  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
  await writeFile(join(OUT, file), data);
  const size = data.length;
  const flag = size > budget * KB ? "  OVER BUDGET" : "";
  if (flag) over++;
  report.push(`${file.padEnd(28)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${(size / KB).toFixed(1).padStart(6)} KB${flag}`);
}

// Start at the standard quality and step down until the file fits its budget,
// but never below the floor (a file still over budget at the floor is reported).
const FORMATS = {
  avif: { start: 50, floor: 35, opts: (q) => ({ quality: q, effort: 4 }) },
  webp: { start: 70, floor: 40, opts: (q) => ({ quality: q }) },
  jpeg: { start: 72, floor: 45, opts: (q) => ({ quality: q, mozjpeg: true }) },
};

async function encode(img, format, file, budget) {
  const f = FORMATS[format];
  let q = f.start;
  const out = () => img.clone()[format](f.opts(q));
  let size = (await out().toBuffer()).length;
  while (size > budget * KB && q > f.floor) {
    q = Math.max(f.floor, q - 5);
    size = (await out().toBuffer()).length;
  }
  await write(out(), file, budget);
  report[report.length - 1] += `  q${q}`;
}

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const base = sharp(join(SRC, job.src)).extract(job.crop);
  const sizes = [...new Set(job.widths.map((w) => Math.min(w, job.crop.width)))];
  for (const w of sizes) {
    const img = base.clone().resize({ width: w });
    await encode(img, "avif", `${job.name}-${w}.avif`, job.budget);
    await encode(img, "webp", `${job.name}-${w}.webp`, job.budget);
  }
  await encode(base.clone().resize({ width: Math.min(800, job.crop.width) }), "jpeg", `${job.name}.jpg`, job.budget);
}

// Open Graph image: 1200x630 from the hero (standards §7: JPEG ≤ 120 KB).
await encode(
  sharp(join(SRC, "hero-waakye.jpg")).extract({ left: 0, top: 23, width: 1376, height: 722 }).resize(1200, 630),
  "jpeg",
  "../og.jpg",
  120,
);

// apple-touch-icon: the favicon mark centred on cream.
const mark = await sharp("favicon.svg", { density: 300 }).resize(132, 132).png().toBuffer();
await write(
  sharp({ create: { width: 180, height: 180, channels: 4, background: "#FFF9F2" } }).composite([{ input: mark, gravity: "centre" }]).png(),
  "../apple-touch-icon.png",
  60,
);

console.log(report.join("\n"));
if (over) {
  console.error(`\n${over} file(s) over budget`);
  process.exit(1);
}
