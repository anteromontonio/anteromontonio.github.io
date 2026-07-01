#!/usr/bin/env node
/*
 * Pre-render the TikZ figures in the git tutorial posts to inline SVG.
 *
 * Why: the figures used to be compiled in the browser by TikZJax, which pulls
 * ~11 MB (WASM engine + TeX core dump) and runs LaTeX per-figure on every page
 * load (~20 s cold). Pre-rendering to static inline SVG makes the pages load
 * instantly. Only the Computer Modern fonts the labels use are self-hosted
 * (see assets/css/tikz.css); inline SVG picks up those @font-faces from the page.
 *
 * Source of truth: the TikZ code lives in assets/tikz/<id>.tikz.
 * In the posts, each figure is a <div class="tikz-figure"> with a
 * <!-- tikz:<id> --> marker followed by the generated <svg>.
 *
 * Usage:
 *   npm install            # once, to get node-tikzjax (a devDependency)
 *   npm run render-tikz    # (re)generate every figure's SVG in-place
 *
 * To edit a figure: change assets/tikz/<id>.tikz, then run `npm run render-tikz`.
 *
 * First run also "adopts" any legacy <script type="text/tikz"> blocks: it
 * extracts their source to assets/tikz/ and rewrites them into the marker form.
 */
import pkg from "node-tikzjax";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const tex2svg = pkg.default ?? pkg;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TIKZ_DIR = join(ROOT, "assets", "tikz");

// Posts that contain TikZ figures, and the id prefix used for their .tikz files.
const POSTS = [
  { file: "_posts/en-gb/2026-06-07-git-for-mathematicians.md", prefix: "git-en" },
  { file: "_posts/es-mx/2026-06-07-git-para-matematicos.md", prefix: "git-es" },
];

mkdirSync(TIKZ_DIR, { recursive: true });

async function compile(src) {
  // Match the browser TikZJax wrapper: everything goes inside \begin{document}.
  const doc = "\\begin{document}\n" + src.trim() + "\n\\end{document}\n";
  return (await tex2svg(doc, {})).trim();
}

const fontsUsed = new Set();
let figureCount = 0;

for (const { file, prefix } of POSTS) {
  const path = join(ROOT, file);
  let md = readFileSync(path, "utf8");

  // 1. Adopt any legacy <script type="text/tikz"> blocks (optionally wrapped in
  //    a centering <div>) into the marker form, saving their source to assets/tikz.
  let idx = 0;
  const legacy = /(?:<div[^>]*>\s*)?<script type="text\/tikz">([\s\S]*?)<\/script>(?:\s*<\/div>)?/g;
  md = md.replace(legacy, (_m, src) => {
    idx += 1;
    const id = `${prefix}-${idx}`;
    writeFileSync(join(TIKZ_DIR, `${id}.tikz`), src.trim() + "\n");
    return `<div class="tikz-figure"><!-- tikz:${id} -->\n</div>`;
  });

  // 2. (Re)generate the SVG for every marker from its .tikz source.
  const markerRe = /(<!-- tikz:([\w-]+) -->)(?:\s*<svg[\s\S]*?<\/svg>)?/g;
  const ids = [...md.matchAll(markerRe)].map((m) => m[2]);
  const svgById = {};
  for (const id of ids) {
    const srcPath = join(TIKZ_DIR, `${id}.tikz`);
    if (!existsSync(srcPath)) {
      console.error(`  ! missing source ${srcPath} — skipping`);
      continue;
    }
    const svg = await compile(readFileSync(srcPath, "utf8"));
    (svg.match(/font-family="([^"]+)"/g) || []).forEach((f) => fontsUsed.add(f.replace(/font-family="|"/g, "")));
    svgById[id] = svg;
    figureCount += 1;
  }

  md = md.replace(markerRe, (_m, marker, id) => (svgById[id] ? `${marker}\n${svgById[id]}` : _m));

  writeFileSync(path, md);
  console.log(`${file}: ${ids.length} figures`);
}

console.log(`\nRendered ${figureCount} figures.`);
console.log(`Fonts used: ${[...fontsUsed].sort().join(", ")}`);
console.log("If a font above is not declared in assets/css/tikz.css, add an");
console.log("@font-face for it and download the .ttf into assets/fonts/bakoma/.");
