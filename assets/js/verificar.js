/* Verificar Voluntario — looks up a volunteer by cédula via the FastAPI backend
 * and renders their photo + information. */
(function () {
  var cfg = window.AE_CONFIG;
  var form = document.getElementById('verify-form');
  var resultEl = document.getElementById('result');
  var submitBtn = document.getElementById('submit-btn');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function row(label, value) {
    if (!value) return '';
    return '<div class="row"><span class="k">' + esc(label) + ':</span>' + esc(value) + '</div>';
  }

  function showAlert(kind, msg) {
    resultEl.innerHTML = '<div class="alert ' + kind + '">' + esc(msg) + '</div>';
  }

  function renderVolunteer(v) {
    var photo = v.photo_url
      ? '<img class="photo" src="' + esc(v.photo_url) + '" alt="Foto de ' + esc(v.first_name) + '" />'
      : '<div class="photo"></div>';

    resultEl.innerHTML =
      '<div class="card">' +
        photo +
        '<div class="info">' +
          '<h3>' + esc(v.first_name) + ' ' + esc(v.last_name) + '</h3>' +
          '<div style="margin-bottom:.6rem"><span class="badge ok">Voluntario verificado</span></div>' +
          row('Cédula', v.cedula) +
          row('Rol', v.role) +
          row('Estado', v.status) +
          row('Registrado', v.created_at ? v.created_at.substring(0, 10) : '') +
        '</div>' +
      '</div>';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cedula = document.getElementById('cedula').value.trim();
    if (!cedula) { showAlert('error', 'Ingresa una cédula.'); return; }

    submitBtn.disabled = true;
    resultEl.innerHTML = '<div class="alert info spinner">Buscando…</div>';

    var url = cfg.API_BASE + '/api/volunteers/verify?cedula=' + encodeURIComponent(cedula);

    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (r.status === 404) return { found: false };
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || data.found === false || !data.volunteer) {
          showAlert('error', 'No se encontró ningún voluntario con la cédula ' + cedula + '.');
          return;
        }
        renderVolunteer(data.volunteer);
      })
      .catch(function (err) {
        showAlert('error', 'No se pudo contactar el servidor de verificación. ' +
          'Verifica tu conexión o inténtalo más tarde. (' + err.message + ')');
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();
