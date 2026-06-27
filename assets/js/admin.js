/* Panel de Administración — admin-gated console: look up + register volunteers.
 * Access is gated by the shared admin token (enforced by the backend). The token
 * is validated at login via /api/admin/check, kept in sessionStorage, and sent as
 * the x-admin-token header on admin actions. */
(function () {
  var cfg = window.AE_CONFIG;
  var TOKEN_KEY = 'ae_admin_token';

  var gate = document.getElementById('gate');
  var panel = document.getElementById('panel');
  var loginForm = document.getElementById('login-form');
  var loginBtn = document.getElementById('login-btn');
  var loginResult = document.getElementById('login-result');
  var logout = document.getElementById('logout');

  var verifyForm = document.getElementById('verify-form');
  var verifyBtn = document.getElementById('verify-btn');
  var verifyResult = document.getElementById('verify-result');

  var registerForm = document.getElementById('register-form');
  var submitBtn = document.getElementById('submit-btn');
  var resultEl = document.getElementById('result');

  function getToken() { return sessionStorage.getItem(TOKEN_KEY) || ''; }
  function setToken(t) { sessionStorage.setItem(TOKEN_KEY, t); }
  function clearToken() { sessionStorage.removeItem(TOKEN_KEY); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function alertHtml(el, kind, msg) { el.innerHTML = '<div class="alert ' + kind + '">' + msg + '</div>'; }
  function row(label, value) {
    if (!value) return '';
    return '<div class="row"><span class="k">' + esc(label) + ':</span>' + esc(value) + '</div>';
  }

  function showPanel() { gate.hidden = true; panel.hidden = false; }
  function showGate() {
    panel.hidden = true; gate.hidden = false;
    document.getElementById('admin_token').value = '';
  }
  function forceRelogin(el) {
    clearToken();
    if (el) alertHtml(el, 'error', 'Sesión expirada. Vuelve a ingresar la clave.');
    showGate();
  }

  function checkToken(token) {
    return fetch(cfg.API_BASE + '/api/admin/check', { headers: { 'x-admin-token': token } })
      .then(function (r) { return r.ok; });
  }

  // On load: silently re-validate a stored token.
  (function init() {
    var t = getToken();
    if (!t) { showGate(); return; }
    checkToken(t).then(function (ok) { ok ? showPanel() : forceRelogin(); })
      .catch(function () { showGate(); });
  })();

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var token = document.getElementById('admin_token').value.trim();
    if (!token) return;
    loginBtn.disabled = true;
    alertHtml(loginResult, 'info', 'Verificando…');
    checkToken(token)
      .then(function (ok) {
        if (ok) { setToken(token); loginResult.innerHTML = ''; showPanel(); }
        else { alertHtml(loginResult, 'error', 'Clave inválida.'); }
      })
      .catch(function (err) { alertHtml(loginResult, 'error', 'No se pudo contactar el servidor. (' + err.message + ')'); })
      .finally(function () { loginBtn.disabled = false; });
  });

  logout.addEventListener('click', function (e) {
    e.preventDefault();
    clearToken();
    resultEl.innerHTML = ''; verifyResult.innerHTML = '';
    showGate();
  });

  // --- Lookup ---
  verifyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cedula = document.getElementById('v_cedula').value.trim();
    if (!cedula) return;
    verifyBtn.disabled = true;
    alertHtml(verifyResult, 'info', 'Buscando…');
    fetch(cfg.API_BASE + '/api/volunteers/verify?cedula=' + encodeURIComponent(cedula))
      .then(function (r) {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.volunteer) {
          alertHtml(verifyResult, 'error', 'No se encontró ningún voluntario con la cédula ' + esc(cedula) + '.');
          return;
        }
        var v = data.volunteer;
        var photo = v.photo_url
          ? '<img class="photo" src="' + esc(v.photo_url) + '" alt="Foto" />'
          : '<div class="photo"></div>';
        verifyResult.innerHTML =
          '<div class="card">' + photo + '<div class="info">' +
            '<h3>' + esc(v.first_name) + ' ' + esc(v.last_name) + '</h3>' +
            row('Cédula', v.cedula) + row('Rol', v.role) + row('Estado', v.status) +
            row('Registrado', v.created_at ? v.created_at.substring(0, 10) : '') +
          '</div></div>';
      })
      .catch(function (err) { alertHtml(verifyResult, 'error', 'Error al buscar. (' + err.message + ')'); })
      .finally(function () { verifyBtn.disabled = false; });
  });

  // --- Register ---
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData();
    fd.append('first_name', document.getElementById('first_name').value.trim());
    fd.append('last_name', document.getElementById('last_name').value.trim());
    fd.append('cedula', document.getElementById('cedula').value.trim());
    fd.append('role', document.getElementById('role').value);
    var photoEl = document.getElementById('photo');
    if (photoEl.files[0]) fd.append('photo', photoEl.files[0]);

    submitBtn.disabled = true;
    alertHtml(resultEl, 'info', 'Registrando…');

    fetch(cfg.API_BASE + '/api/volunteers', {
      method: 'POST', headers: { 'x-admin-token': getToken() }, body: fd
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); })
      .then(function (res) {
        if (res.status === 401) { forceRelogin(resultEl); return; }
        if (!res.ok) {
          var detail = (res.body && res.body.detail) ? res.body.detail : ('Error ' + res.status);
          alertHtml(resultEl, 'error', 'No se pudo registrar: ' + esc(detail));
          return;
        }
        var v = res.body.volunteer || res.body;
        alertHtml(resultEl, 'success', 'Voluntario <strong>' + esc(v.first_name) + ' ' +
          esc(v.last_name) + '</strong> (cédula ' + esc(v.cedula) + ') registrado correctamente.');
        registerForm.reset();
      })
      .catch(function (err) { alertHtml(resultEl, 'error', 'No se pudo contactar el servidor. (' + err.message + ')'); })
      .finally(function () { submitBtn.disabled = false; });
  });
})();
