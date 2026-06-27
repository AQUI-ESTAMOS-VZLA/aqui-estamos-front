/* Registro de Colaboradores — registers a volunteer (name, lastname, cédula, photo).
 * The photo is uploaded by the backend to Vercel Blob; the record is stored in Supabase. */
(function () {
  var cfg = window.AE_CONFIG;
  var form = document.getElementById('register-form');
  var resultEl = document.getElementById('result');
  var submitBtn = document.getElementById('submit-btn');

  function showAlert(kind, msg) {
    resultEl.innerHTML = '<div class="alert ' + kind + '">' + msg + '</div>';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fd = new FormData();
    fd.append('first_name', document.getElementById('first_name').value.trim());
    fd.append('last_name', document.getElementById('last_name').value.trim());
    fd.append('cedula', document.getElementById('cedula').value.trim());
    fd.append('role', document.getElementById('role').value);
    var photoEl = document.getElementById('photo');
    if (photoEl.files[0]) fd.append('photo', photoEl.files[0]);

    submitBtn.disabled = true;
    resultEl.innerHTML = '<div class="alert info spinner">Registrando…</div>';

    fetch(cfg.API_BASE + '/api/volunteers', { method: 'POST', body: fd })
      .then(function (r) {
        return r.json().then(function (body) { return { ok: r.ok, status: r.status, body: body }; });
      })
      .then(function (res) {
        if (!res.ok) {
          var detail = (res.body && res.body.detail) ? res.body.detail : ('Error ' + res.status);
          showAlert('error', 'No se pudo registrar: ' + detail);
          return;
        }
        var v = res.body.volunteer || res.body;
        showAlert('success', 'Voluntario <strong>' + (v.first_name || '') + ' ' + (v.last_name || '') +
          '</strong> (cédula ' + (v.cedula || '') + ') registrado correctamente.');
        form.reset();
      })
      .catch(function (err) {
        showAlert('error', 'No se pudo contactar el servidor. (' + err.message + ')');
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();
