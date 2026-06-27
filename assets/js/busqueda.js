/* Búsqueda pública de registros — live, debounced, fuzzy search.
 * Shows ONLY public fields and a safe "request contact" note (privacy policy). */
(function () {
  var cfg = window.AE_CONFIG;
  var input = document.getElementById('q');
  var resultsEl = document.getElementById('results');
  var form = document.getElementById('search-form');

  var STATUS = {
    localizada:    { label: 'Localizada',            cls: 'ok' },
    en_refugio:    { label: 'En refugio',            cls: 'info' },
    hospitalizada: { label: 'Hospitalizada',         cls: 'info' },
    buscada:       { label: 'Buscada por familiares', cls: 'warn' },
    fallecida:     { label: 'Fallecida',             cls: 'muted' }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function row(label, value) {
    if (value == null || value === '') return '';
    return '<div class="row"><span class="k">' + esc(label) + ':</span>' + esc(value) + '</div>';
  }
  function statusBadge(s) {
    var m = STATUS[s] || { label: s || '—', cls: 'muted' };
    return '<span class="status-pill s-' + esc(m.cls) + '">' + esc(m.label) + '</span>';
  }

  function renderResults(data) {
    var list = (data && data.results) || [];
    if (!list.length) {
      resultsEl.innerHTML = '<div class="alert info">No se encontró ningún registro para “' +
        esc(data.query) + '”. Revisa la escritura o intenta con menos palabras.</div>';
      return;
    }
    resultsEl.innerHTML =
      '<p class="muted small" style="margin:.25rem 0 1rem">' + list.length +
        ' resultado' + (list.length === 1 ? '' : 's') + '</p>' +
      list.map(function (v) {
        var photo = v.photo_url
          ? '<img class="photo" src="' + esc(v.photo_url) + '" alt="Foto" />'
          : '<div class="photo"></div>';
        return '<div class="card">' + photo +
          '<div class="info">' +
            '<h3>' + esc(v.first_name) + ' ' + esc(v.last_name) + '</h3>' +
            '<div style="margin-bottom:.55rem">' + statusBadge(v.status) + '</div>' +
            row('N.º de registro', v.registro_number) +
            row('Ciudad', v.city) +
            (v.approximate_age ? row('Edad aprox.', v.approximate_age + ' años') : '') +
            row('Fecha', v.created_at ? v.created_at.substring(0, 10) : '') +
            '<button class="btn req-contact" data-num="' + esc(v.registro_number) +
              '" style="margin-top:.7rem;width:auto;padding:.5rem 1rem;font-size:.92rem">Solicitar contacto seguro</button>' +
          '</div>' +
        '</div>';
      }).join('');
  }

  var timer = null, lastQ = '', seq = 0;
  function search(q) {
    q = q.trim();
    lastQ = q;
    if (!q) { resultsEl.innerHTML = ''; return; }
    resultsEl.innerHTML = '<div class="alert info spinner">Buscando…</div>';
    var mySeq = ++seq;
    fetch(cfg.API_BASE + '/api/registros/search?q=' + encodeURIComponent(q))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) { if (mySeq === seq) renderResults(data); })
      .catch(function (err) {
        if (mySeq === seq) resultsEl.innerHTML = '<div class="alert error">No se pudo buscar. (' + esc(err.message) + ')</div>';
      });
  }

  input.addEventListener('input', function () {
    clearTimeout(timer);
    var q = input.value;
    timer = setTimeout(function () { search(q); }, 250);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(timer); search(input.value); });

  // "Solicitar contacto" — explains the safe verification process (no private data shown).
  resultsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.req-contact');
    if (!btn) return;
    var num = btn.getAttribute('data-num');
    btn.insertAdjacentHTML('afterend',
      '<div class="alert success" style="margin-top:.7rem">Para proteger a la persona, un operador verificará tu ' +
      'identidad o parentesco antes de compartir información. Escríbenos por Instagram ' +
      '<a href="' + esc(cfg.INSTAGRAM_URL) + '" target="_blank" rel="noopener">@aqui.estamos.vnzl</a> ' +
      'indicando el N.º de registro <strong>' + esc(num) + '</strong>.</div>');
    btn.disabled = true;
  });
})();
