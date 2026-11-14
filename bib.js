// Reads papers.bib and shows it on the Publications page and on the home page.
// To update the publications, edit papers.bib only. You should not need to edit this file.
//
// Fields used from each entry: title, author, year, journal or booktitle,
// and for the links: doi, arxiv (or eprint), url.
// Add  selected={true}  to an entry to show it on the home page.
(async () => {
  const listEl = document.querySelector('#paper-list');
  const selectedEl = document.querySelector('#selected-papers');
  if (!listEl && !selectedEl) return;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;

  let text;
  try {
    const res = await fetch('papers.bib', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    text = await res.text();
  } catch (e) {
    (listEl || selectedEl).innerHTML = '<p>Could not load papers.bib. If you are previewing on your computer, open the site through the local server (http://localhost:8000/) and not by double-clicking the file.</p>';
    return;
  }

  // ---- BibTeX parsing
  const closing = (s, open) => {            // index just after the brace that closes the one at "open"
    let depth = 1, j = open + 1;
    while (depth && j < s.length) { if (s[j] === '{') depth++; else if (s[j] === '}') depth--; j++; }
    return j;
  };
  const accents = { "'": '́', '`': '̀', '"': '̈', '^': '̂', '~': '̃', c: '̧', v: '̌' };
  const clean = s => s
    .replace(/\{?\\(['`"^~cv])\s*\{?([A-Za-z])\}?\}?/g, (_, a, ch) => (ch + accents[a]).normalize('NFC'))
    .replace(/\\&/g, '&').replace(/--/g, '–').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
  const authorList = a => a.split(/\s+and\s+/).map(n => {
    n = clean(n);
    if (!n.includes(',')) return n;
    const [last, first] = n.split(/,(.*)/).map(x => x.trim());
    return `${first} ${last}`;
  }).join(', ');

  const papers = [];
  const start = /@(\w+)\s*\{/g;
  let m;
  while ((m = start.exec(text))) {
    const end = closing(text, start.lastIndex - 1);
    const body = text.slice(start.lastIndex, end - 1);
    start.lastIndex = end;
    if (/^(string|comment|preamble)$/i.test(m[1])) continue;

    const f = {};
    let i = body.indexOf(',') + 1;
    const key = /\s*([A-Za-z_]+)\s*=\s*/y;
    for (;;) {
      key.lastIndex = i;
      const k = key.exec(body);
      if (!k) break;
      i = key.lastIndex;
      let value;
      if (body[i] === '{') { const j = closing(body, i); value = body.slice(i + 1, j - 1); i = j; }
      else if (body[i] === '"') { const j = body.indexOf('"', i + 1); value = body.slice(i + 1, j); i = j + 1; }
      else { let j = i; while (j < body.length && body[j] !== ',' && body[j] !== '\n') j++; value = body.slice(i, j); i = j; }
      f[k[1].toLowerCase()] = value.replace(/\s+/g, ' ').trim();
      const comma = /\s*,/y; comma.lastIndex = i;
      if (comma.exec(body)) i = comma.lastIndex;
    }

    const year = parseInt(f.year, 10);
    if (!f.title || !year) { console.warn('papers.bib: skipped an entry without a title or year', body.slice(0, 60)); continue; }
    const venue = clean(f.journal || f.booktitle || '');
    let arxiv = f.arxiv || f.eprint || (venue.match(/arXiv:(\d{4}\.\d{4,5})/) || [])[1];
    let doi = f.doi;
    if (!doi && f.url) { try { doi = new URL(f.url).searchParams.get('doi') || undefined; } catch (e) {} }
    if (doi) doi = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
    papers.push({
      year, title: clean(f.title), authors: authorList(f.author || ''), venue, doi, arxiv,
      url: !doi && !arxiv && /^https?:\/\//.test(f.url || '') ? f.url : undefined,
      selected: /^true$/i.test(f.selected || ''),
    });
  }
  papers.sort((a, b) => b.year - a.year);   // newest year first; within a year, the order of the file

  // ---- Rendering
  const card = p => {
    const url = p.doi ? `https://doi.org/${p.doi}` : p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : p.url;
    const links = [p.doi && link(`https://doi.org/${p.doi}`, 'DOI'), p.arxiv && link(`https://arxiv.org/abs/${p.arxiv}`, 'arXiv'), p.url && link(p.url, 'Record')].filter(Boolean);
    return `<article class="paper">
      <h3>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
      <p class="paper-authors">${esc(p.authors)}</p>
      <p>${esc(p.venue)}${/\b(19|20)\d\d\b/.test(p.venue) ? '' : `${p.venue ? ', ' : ''}${p.year}`}</p>
      ${links.length ? `<div class="paper-links">${links.join('')}</div>` : ''}
    </article>`;
  };
  if (listEl) {
    const years = [...new Set(papers.map(p => p.year))];
    listEl.innerHTML = years.map(y => `<section class="publication-year" aria-label="Publications in ${y}"><h2>${y}</h2>${papers.filter(p => p.year === y).map(card).join('')}</section>`).join('');
  }
  if (selectedEl) selectedEl.innerHTML = papers.filter(p => p.selected).map(card).join('');
})();
