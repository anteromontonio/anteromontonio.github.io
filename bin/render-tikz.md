# Working with the TikZ figures

The TikZ diagrams in the git tutorial posts are **pre-rendered to static inline
SVG at authoring time**. They are *not* compiled in the browser.

> This file lives under `bin/`, which is listed in `exclude:` in `_config.yml`,
> so it is never copied into the built site.

## Why it works this way

The figures used to be rendered live by [TikZJax](https://tikzjax.com), which
downloads ~11 MB (a WebAssembly TeX engine + a TeX core dump) and runs LaTeX on
every figure, on every page load — the pages took ~20 s to show the diagrams.

Pre-rendering compiles the TikZ **once**, locally, into inline `<svg>` that ships
in the HTML. The page then loads instantly and needs no JavaScript. The only
runtime cost is a handful of small, cached Computer Modern font files.

## Where everything lives

| Thing | Path | Committed? |
|-------|------|------------|
| **TikZ source** (edit these) | `assets/tikz/<id>.tikz` | yes |
| Rendered SVG (generated) | inline in the post `.md`, at a `<!-- tikz:<id> -->` marker | yes |
| Fonts (Computer Modern subset) | `assets/fonts/bakoma/*.ttf` | yes |
| Font + centering CSS | `assets/css/tikz.css` | yes |
| Renderer / regenerator | `bin/render-tikz.mjs` (`npm run render-tikz`) | yes |
| Renderer dependency | `node-tikzjax` (a `devDependency`) | via `package.json` |

The id scheme is `<prefix>-<n>`, e.g. `git-en-3` is the 3rd figure of the English
post, `git-es-3` the 3rd of the Spanish one. The post→prefix mapping is the
`POSTS` array at the top of `bin/render-tikz.mjs`.

In a post, each figure looks like this (the `<svg>` is regenerated, don't edit it
by hand):

```html
<div class="tikz-figure"><!-- tikz:git-en-3 -->
<svg ...>…generated…</svg>
</div>
```

## One-time setup

```bash
npm install        # pulls in node-tikzjax (only needed locally, never in CI)
```

## Modify an existing figure

1. Edit the source, e.g. `assets/tikz/git-en-3.tikz`.
2. Regenerate every figure in place:
   ```bash
   npm run render-tikz
   ```
3. Preview locally (Docker Jekyll on port 8080), then commit the changed
   `.tikz` **and** the post `.md` (the inline SVG lives in the post).

Remember the two posts are separate translations: if you change a diagram's
shape, update **both** `git-en-<n>.tikz` and `git-es-<n>.tikz` (they differ only
in the label text).

## Add a new figure to an existing post

1. In the post `.md`, drop a marker where you want the figure. The `<svg>` is
   filled in for you on the next render:
   ```html
   <div class="tikz-figure"><!-- tikz:git-en-8 --></div>
   ```
2. Create the matching source file `assets/tikz/git-en-8.tikz` containing just
   the TikZ (no `\documentclass`, no `\begin{document}` — see the template
   below). Do the same for the Spanish post if applicable.
3. `npm run render-tikz`.

The renderer also understands the **legacy form**: if it finds a raw
`<script type="text/tikz">…</script>` block (optionally wrapped in a `<div>`), it
extracts the source into `assets/tikz/` and rewrites it into the marker form
automatically. So you can also just paste a `<script type="text/tikz">` block and
run the renderer once to adopt it.

## Add figures to a brand-new post

1. Give the post `tikzjax: true` in its front matter. This is what makes
   `head.liquid` load `assets/css/tikz.css` (the fonts + centering). It no longer
   loads the TikZJax runtime.
2. Add the post to the `POSTS` array in `bin/render-tikz.mjs` with a unique
   `prefix`.
3. Add markers + `.tikz` sources as above, then `npm run render-tikz`.

## Figure source template

A `.tikz` file contains the `\usetikzlibrary` lines, any `\definecolor`, and the
`tikzpicture` — nothing else:

```latex
\usetikzlibrary{arrows.meta,positioning,calc}
\definecolor{ink}{HTML}{6B7280}
\definecolor{acc}{HTML}{3B82F6}
\begin{tikzpicture}[font=\small, text=ink, draw=ink, >={Stealth[length=2mm]}]
  \node[circle, draw=acc, fill=acc!25, minimum size=6mm] (a) at (0,0) {};
  \node[circle, draw=acc, fill=acc!25, minimum size=6mm] (b) at (3,0) {};
  \draw[->, thick, acc] (b) -- (a);
  \node[below=2mm of a, align=center] {initial\\draft};
\end{tikzpicture}
```

The existing figures share this palette (`ink`, `boxink`, `acc`, `acc2`, `acc3`,
`acc4`); copy the `\definecolor` block from any current `.tikz` to stay
consistent.

## Fonts

`npm run render-tikz` prints the set of Computer Modern faces the figures use,
e.g. `cmr9, cmtt9, cmsy7, …`. Every face listed must have:

- an `@font-face` rule in `assets/css/tikz.css`, and
- the matching `.ttf` in `assets/fonts/bakoma/`.

If the renderer reports a font that isn't there yet (e.g. you used a new text
size or a math symbol), add it:

```bash
curl -s https://tikzjax.com/bakoma/ttf/<font>.ttf -o assets/fonts/bakoma/<font>.ttf
```

then add a line to `assets/css/tikz.css`:

```css
@font-face { font-family: <font>; src: url("../fonts/bakoma/<font>.ttf"); font-display: block; }
```

Inline SVG is required (not `<img src=...>`): only inline SVG picks up the page's
`@font-face` rules. Without the right font the labels fall back to a system font
and TeX ligatures break (e.g. "files" renders as "˜les").

## Notes & gotchas

- **Don't hand-edit the `<svg>` in the posts** — it's overwritten on the next
  `render-tikz`. Edit the `.tikz` source instead.
- `node-tikzjax` ships a fixed TeX distribution. `arrows.meta`, `positioning`,
  and `calc` are available and used here; exotic libraries may not be. If a
  render fails, simplify the TikZ.
- CI does **not** run `render-tikz` — the SVGs are committed, so GitHub only runs
  the normal Jekyll build. Regenerating is a local, commit-time step.
- After editing, run `npx prettier --write` on any changed `.md`/`.css`/`.mjs`
  to keep the Prettier check green (the renderer keeps figure blocks intact).
```
