// Renders the lists in data.js into each page. You should not need to edit this file.
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = s => /^(https?:\/\/|mailto:)/.test(s) ? s : '#';
const $ = sel => document.querySelector(sel);
const ext = (url, label) => `<a href="${esc(safeUrl(url))}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;

$('#year').textContent = new Date().getFullYear();

// People
const initials = name => name.split(' ').map(x => x[0]).join('').slice(0, 3);
const portrait = (p, cls) => p.image
  ? `<img class="${cls}" src="${esc(p.image)}" alt="Portrait of ${esc(p.name)}" loading="lazy">`
  : `<div class="${cls} initials" aria-hidden="true">${esc(initials(p.name))}</div>`;
const memberCard = m => `<article class="member">${portrait(m, 'portrait')}<div>
  <h4>${esc(m.name)}</h4>
  <p>${esc(m.role)}${m.url ? ` · ${ext(m.url, 'Personal page')}` : ''}</p>
  ${m.project ? `<p class="member-project"><strong>Project:</strong> ${esc(m.project)}</p>` : ''}
  ${m.detail ? `<p class="member-detail">${esc(m.detail)}</p>` : ''}
</div></article>`;
const leaderCard = p => `<article class="leader">${portrait(p, 'leader-photo')}<div>
  <h4>${p.url ? ext(p.url, p.name) : esc(p.name)}</h4>
  <p class="role">${esc(p.role)}</p>
  <p class="bio">${esc(p.bio)}</p>
</div></article>`;
if ($('#academics-list')) $('#academics-list').innerHTML = academics.map(leaderCard).join('');
[['#postdocs-list', typeof postdocs !== 'undefined' && postdocs], ['#phd-list', typeof phdStudents !== 'undefined' && phdStudents], ['#researchers-list', typeof researchers !== 'undefined' && researchers]]
  .forEach(([sel, list]) => { if ($(sel) && list) $(sel).innerHTML = list.map(memberCard).join(''); });

// News (home page shows the latest four)
if ($('#news-list')) {
  const entries = $('#home') ? news.slice(0, 4) : news;
  $('#news-list').innerHTML = entries.map(n => `<div class="news-item"><time>${esc(n.date)}</time><p>${esc(n.text)}${(n.links || []).map(l => ` <span class="news-link">${ext(l.url, l.label)}</span>`).join('')}</p></div>`).join('');
}

// Publications
const paperUrl = p => p.doi ? `https://doi.org/${p.doi}` : p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : p.url;
const paperCard = p => {
  const url = paperUrl(p);
  const links = [p.doi && ext(`https://doi.org/${p.doi}`, 'DOI'), p.arxiv && ext(`https://arxiv.org/abs/${p.arxiv}`, 'arXiv'), !p.doi && !p.arxiv && p.url && ext(p.url, 'Record')].filter(Boolean);
  return `<article class="paper">
    <h3>${url ? `<a href="${esc(safeUrl(url))}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
    <p class="paper-authors">${esc(p.authors)}</p>
    <p>${esc(p.venue)}${/\b(19|20)\d\d\b/.test(p.venue) ? '' : `, ${p.year}`}</p>
    ${links.length ? `<div class="paper-links">${links.join('')}</div>` : ''}
  </article>`;
};
if ($('#paper-list')) {
  const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);
  $('#paper-list').innerHTML = years.map(year => `<section class="publication-year" aria-label="Publications in ${year}"><h2>${year}</h2>${papers.filter(p => p.year === year).map(paperCard).join('')}</section>`).join('');
}
if ($('#selected-papers')) $('#selected-papers').innerHTML = papers.filter(p => p.selected).map(paperCard).join('');

// Click-to-play videos (nothing loads from YouTube until the visitor presses play)
document.querySelectorAll('.video-play').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.video;
  button.parentElement.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1" title="${esc(button.getAttribute('aria-label'))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
}));

// Mobile menu
const toggle = $('.menu-toggle'), nav = $('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
