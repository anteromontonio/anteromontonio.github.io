const SERIES_COLORS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];
const NAME = {
  P: 'Polytopal', F: 'Faithful', U: 'Unfaithful',
  O: 'Orientably regular', N: 'Non-orientable (regular)', C: 'Chiral'
};

function fmt(v) {
  if (v == null) return '–';
  return Math.round(v).toLocaleString('en-US');
}

function log10(v) { return Math.log(Math.max(v, 0.5)) / Math.LN10; }

// Find index of the last data point with n <= target (step-function lookup)
function stepIndex(ns, targetN) {
  let lo = 0, hi = ns.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (ns[mid] <= targetN) { ans = mid; lo = mid + 1; }
    else { hi = mid - 1; }
  }
  return ans;
}

// Builds a scale function mapping [domainMin, domainMax] -> [pixelStart, pixelEnd].
function makeScale(kind, domainMin, domainMax, pixelStart, pixelEnd) {
  if (kind === 'log') {
    const lo = log10(domainMin), hi = log10(domainMax);
    const span = (hi - lo) || 1;
    return v => pixelStart + (log10(v) - lo) / span * (pixelEnd - pixelStart);
  }
  const span = (domainMax - domainMin) || 1;
  return v => pixelStart + (v - domainMin) / span * (pixelEnd - pixelStart);
}

function linearTicks(domainMin, domainMax, count) {
  const ticks = [];
  for (let i = 0; i <= count; i++) ticks.push(domainMin + (domainMax - domainMin) * i / count);
  return ticks;
}

function logTicks(domainMin, domainMax) {
  let p = Math.pow(10, Math.floor(Math.log10(Math.max(domainMin, 0.5))));
  const ticks = [];
  while (p <= domainMax * 1.0001) { if (p >= domainMin * 0.999) ticks.push(p); p *= 10; }
  return ticks;
}

function tickText(v) {
  const r = Math.round(v);
  if (Math.abs(v - r) > 1e-9) return v.toFixed(1);
  return r >= 1000 ? Math.round(r / 100) / 10 + 'k' : String(r);
}

function buildChart(container, opts) {
  // opts: {title, sub, n, seriesMap: {label: values}, total, xLabel, xScale, yScale}
  const { title, sub, n, seriesMap, total, xLabel, xScale, yScale } = opts;
  const labels = Object.keys(seriesMap);

  const card = document.createElement('div');
  card.className = 'card';
  const btn = document.createElement('button');
  btn.className = 'toggle-table';
  btn.textContent = 'table';
  card.appendChild(btn);

  const h3 = document.createElement('h3'); h3.textContent = title; card.appendChild(h3);
  if (sub) { const p = document.createElement('div'); p.className = 'sub'; p.textContent = sub; card.appendChild(p); }

  const chartWrap = document.createElement('div'); chartWrap.className = 'chart-wrap';
  card.appendChild(chartWrap);

  const W = 640, H = 300, M = { top: 10, right: 16, bottom: 30, left: 46 };
  const plotW = W - M.left - M.right, plotH = H - M.top - M.bottom;

  const yFloor = yScale === 'log' ? 0.5 : 0;
  const xFloor = xScale === 'log' ? Math.max(Math.min(...n), 0.5) : Math.min(...n);

  const allVals = [].concat(...labels.map(l => seriesMap[l]), total || []);
  const maxV = Math.max(1, ...allVals);
  const minN = xFloor, maxN = Math.max(...n);

  const yDomainMin = yScale === 'log' ? 0.5 : 0;
  const yDomainMax = yScale === 'log' ? maxV * 1.3 : maxV * 1.08;

  const px = makeScale(xScale, minN, maxN, M.left, M.left + plotW);
  const py = makeScale(yScale, yDomainMin, yDomainMax, M.top + plotH, M.top);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'chart');
  chartWrap.appendChild(svg);

  const xticks = xScale === 'log' ? logTicks(minN, maxN) : linearTicks(minN, maxN, 6);
  xticks.forEach(t => {
    const x = px(t);
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', x); l.setAttribute('x2', x);
    l.setAttribute('y1', M.top); l.setAttribute('y2', M.top + plotH);
    l.setAttribute('class', 'gridline');
    svg.appendChild(l);
    const txt = document.createElementNS(svgNS, 'text');
    txt.setAttribute('x', x); txt.setAttribute('y', H - 10);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('class', 'tick-label');
    txt.textContent = tickText(t);
    svg.appendChild(txt);
  });

  const yticks = yScale === 'log' ? logTicks(yDomainMin, yDomainMax) : linearTicks(yDomainMin, yDomainMax, 5);
  yticks.forEach(t => {
    const y = py(t);
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', M.left); l.setAttribute('x2', M.left + plotW);
    l.setAttribute('y1', y); l.setAttribute('y2', y);
    l.setAttribute('class', 'gridline');
    svg.appendChild(l);
    const txt = document.createElementNS(svgNS, 'text');
    txt.setAttribute('x', M.left - 6); txt.setAttribute('y', y + 3);
    txt.setAttribute('text-anchor', 'end'); txt.setAttribute('class', 'tick-label');
    txt.textContent = tickText(t);
    svg.appendChild(txt);
  });

  // baseline axes
  [
    'M' + M.left + ' ' + M.top + ' L ' + M.left + ' ' + (M.top + plotH),
    'M' + M.left + ' ' + (M.top + plotH) + ' L ' + (M.left + plotW) + ' ' + (M.top + plotH)
  ].forEach(d => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', d); p.setAttribute('class', 'baseline'); p.setAttribute('fill', 'none');
    svg.appendChild(p);
  });

  const xl = document.createElementNS(svgNS, 'text');
  xl.setAttribute('x', M.left + plotW / 2); xl.setAttribute('y', H - 1);
  xl.setAttribute('text-anchor', 'middle'); xl.setAttribute('class', 'axis-label');
  xl.textContent = xLabel; svg.appendChild(xl);

  function pathFor(values) {
    let d = '';
    let started = false;
    n.forEach((nv, i) => {
      if (xScale === 'log' && nv <= 0) return;
      const x = px(nv), y = py(Math.max(values[i], yFloor));
      d += (!started ? 'M' : 'L') + x + ' ' + y + ' ';
      started = true;
    });
    return d;
  }

  const seriesEls = {};
  labels.forEach((label, i) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', pathFor(seriesMap[label]));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', SERIES_COLORS[i % SERIES_COLORS.length]);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    seriesEls[label] = path;
  });
  let totalPath = null;
  if (total) {
    totalPath = document.createElementNS(svgNS, 'path');
    totalPath.setAttribute('d', pathFor(total));
    totalPath.setAttribute('fill', 'none');
    totalPath.setAttribute('stroke', 'var(--text-muted)');
    totalPath.setAttribute('stroke-width', '1.5');
    totalPath.setAttribute('stroke-dasharray', '4,3');
    svg.appendChild(totalPath);
  }

  // hover layer
  const hoverGroup = document.createElementNS(svgNS, 'g');
  hoverGroup.style.display = 'none';
  const vline = document.createElementNS(svgNS, 'line');
  vline.setAttribute('class', 'crosshair');
  vline.setAttribute('y1', M.top); vline.setAttribute('y2', M.top + plotH);
  hoverGroup.appendChild(vline);
  const dots = {};
  [...labels, total ? '__total' : null].filter(Boolean).forEach(label => {
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', 3.5);
    dot.setAttribute('class', 'hoverdot');
    dot.setAttribute('stroke', label === '__total' ? 'var(--text-muted)' : SERIES_COLORS[labels.indexOf(label) % SERIES_COLORS.length]);
    hoverGroup.appendChild(dot);
    dots[label] = dot;
  });
  svg.appendChild(hoverGroup);

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.style.display = 'none';
  card.appendChild(tooltip);

  const overlay = document.createElementNS(svgNS, 'rect');
  overlay.setAttribute('x', M.left); overlay.setAttribute('y', M.top);
  overlay.setAttribute('width', plotW); overlay.setAttribute('height', plotH);
  overlay.setAttribute('fill', 'transparent');
  overlay.style.cursor = 'crosshair';
  svg.appendChild(overlay);

  const hiddenSet = new Set();

  function updateHover(evt) {
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (evt.clientX - rect.left) * scaleX;
    if (mx < M.left || mx > M.left + plotW) { hoverGroup.style.display = 'none'; tooltip.style.display = 'none'; return; }
    const frac = (mx - M.left) / plotW;
    const targetN = xScale === 'log'
      ? Math.pow(10, log10(minN) + frac * (log10(maxN) - log10(minN)))
      : minN + frac * (maxN - minN);
    const idx = stepIndex(n, targetN);
    const nv = n[idx];
    const x = px(nv);
    vline.setAttribute('x1', x); vline.setAttribute('x2', x);
    hoverGroup.style.display = '';
    let rows = '';
    labels.forEach((label, i) => {
      if (hiddenSet.has(label)) { dots[label].style.display = 'none'; return; }
      dots[label].style.display = '';
      const v = seriesMap[label][idx];
      dots[label].setAttribute('cx', x); dots[label].setAttribute('cy', py(Math.max(v, yFloor)));
      rows += `<div class="row"><span class="k"><span class="swatch" style="background:${SERIES_COLORS[i % SERIES_COLORS.length]}"></span>${label}</span><span class="val">${fmt(v)}</span></div>`;
    });
    if (total) {
      const v = total[idx];
      dots['__total'].setAttribute('cx', x); dots['__total'].setAttribute('cy', py(Math.max(v, yFloor)));
      rows += `<div class="row"><span class="k"><span class="swatch dash" style="background:var(--text-muted)"></span>total</span><span class="val">${fmt(v)}</span></div>`;
    }
    tooltip.innerHTML = `<div class="n">n = ${fmt(nv)}</div>${rows}`;
    tooltip.style.display = 'block';
    const cardRect = card.getBoundingClientRect();
    let left = (evt.clientX - cardRect.left) + 14;
    let top = (evt.clientY - cardRect.top) + 14;
    if (left + 160 > cardRect.width) left = (evt.clientX - cardRect.left) - 170;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }
  overlay.addEventListener('mousemove', updateHover);
  overlay.addEventListener('mouseleave', () => { hoverGroup.style.display = 'none'; tooltip.style.display = 'none'; });

  // legend
  const legend = document.createElement('div'); legend.className = 'legend';
  labels.forEach((label, i) => {
    const item = document.createElement('span'); item.className = 'item';
    item.innerHTML = `<span class="swatch" style="background:${SERIES_COLORS[i % SERIES_COLORS.length]}"></span>${label} — ${NAME[label]}`;
    item.addEventListener('click', () => {
      if (hiddenSet.has(label)) { hiddenSet.delete(label); item.classList.remove('dim'); seriesEls[label].style.display = ''; }
      else { hiddenSet.add(label); item.classList.add('dim'); seriesEls[label].style.display = 'none'; }
    });
    legend.appendChild(item);
  });
  if (total) {
    const item = document.createElement('span'); item.className = 'item';
    item.innerHTML = `<span class="swatch dash" style="background:var(--text-muted)"></span>total`;
    item.addEventListener('click', () => {
      if (totalPath.style.display === 'none') { totalPath.style.display = ''; item.classList.remove('dim'); }
      else { totalPath.style.display = 'none'; item.classList.add('dim'); }
    });
    legend.appendChild(item);
  }
  card.appendChild(legend);

  // data table (collapsed by default)
  const tableWrap = document.createElement('div'); tableWrap.className = 'table-wrap';
  const table = document.createElement('table'); table.className = 'data-table';
  const thead = document.createElement('tr');
  thead.innerHTML = '<th>n</th>' + labels.map(l => `<th>${l}</th>`).join('') + (total ? '<th>total</th>' : '');
  table.appendChild(thead);
  n.forEach((nv, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="n-col">${fmt(nv)}</td>` + labels.map(l => `<td>${fmt(seriesMap[l][i])}</td>`).join('') + (total ? `<td>${fmt(total[i])}</td>` : '');
    table.appendChild(tr);
  });
  tableWrap.appendChild(table);
  card.appendChild(tableWrap);
  btn.addEventListener('click', () => {
    const showing = table.classList.toggle('show');
    chartWrap.classList.toggle('hidden', showing);
    btn.textContent = showing ? 'chart' : 'table';
  });

  container.appendChild(card);
}

const CHART_SPECS = [
  { grid: 'grid-by-class', key: 'R4M-O', letter: 'O', sub: 'P / F / U breakdown vs n' },
  { grid: 'grid-by-class', key: 'R4M-N', letter: 'N', sub: 'P / F / U breakdown vs n' },
  { grid: 'grid-by-class', key: 'R4M-C', letter: 'C', sub: 'P / F / U breakdown vs n' },
  { grid: 'grid-by-pfu', key: 'R4M-P', letter: 'P', sub: 'O / N / C breakdown vs n' },
  { grid: 'grid-by-pfu', key: 'R4M-F', letter: 'F', sub: 'O / N / C breakdown vs n' },
  { grid: 'grid-by-pfu', key: 'R4M-U', letter: 'U', sub: 'O / N / C breakdown vs n' },
];

const scaleState = { x: 'linear', y: 'linear' };

function renderAll() {
  ['grid-by-class', 'grid-by-pfu'].forEach(id => { document.getElementById(id).innerHTML = ''; });
  CHART_SPECS.forEach(spec => {
    const d = DATA[spec.key];
    buildChart(document.getElementById(spec.grid), {
      title: `${spec.letter} — ${NAME[spec.letter]} maniplexes`,
      sub: spec.sub,
      n: d.n, seriesMap: d.series, total: d.total,
      xLabel: 'n (number of flags)',
      xScale: scaleState.x, yScale: scaleState.y
    });
  });
}

document.querySelectorAll('.segmented').forEach(group => {
  const axis = group.dataset.axis;
  group.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      scaleState[axis] = b.dataset.value;
      group.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderAll();
    });
  });
});

renderAll();
