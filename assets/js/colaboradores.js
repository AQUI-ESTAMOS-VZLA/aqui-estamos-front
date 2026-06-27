/* Registro de Colaboradores — admin-gated.
 * Registration requires a shared admin token, enforced by the backend. The token
 * is validated at "login" via /api/admin/check, kept in sessionStorage, and sent
 * as the x-admin-token header on every register request. */
(function () {
  var cfg = window.AE_CONFIG;
  var TOKEN_KEY = 'ae_admin_token';

  var gate = document.getElementById('gate');
  var panel = document.getElementById('panel');
  var loginForm = document.getElementById('login-form');
  var loginBtn = document.getElementById('login-btn');
  var loginResult = document.getElementById('login-result');
  var registerForm = document.getElementById('register-form');
  var submitBtn = document.getElementById('submit-btn');
  var resultEl = document.getElementById('result');
  var logout = document.getElementById('logout');

  function getToken() { return sessionStorage.getItem(TOKEN_KEY) || ''; }
  function setToken(t) { sessionStorage.setItem(TOKEN_KEY, t); }
  function clearToken() { sessionStorage.removeItem(TOKEN_KEY); }

  function alertHtml(el, kind, msg) {
    el.innerHTML = '<div class="alert ' + kind + '">' + msg + '</div>';
  }

  function showPanel() { gate.hidden = true; panel.hidden = false; }
  function showGate() {
    panel.hidden = true; gate.hidden = false;
    document.getElementById('admin_token').value = '';
  }

  // Validate a token against the backend. Resolves true/false.
  function checkToken(token) {
    return fetch(cfg.API_BASE + '/api/admin/check', {
      headers: { 'x-admin-token': token }
    }).then(function (r) { return r.ok; });
  }

  // On load: if we already have a stored token, verify it silently.
  (function init() {
    var t = getToken();
    if (!t) { showGate(); return; }
    checkToken(t).then(function (ok) {
      if (ok) showPanel(); else { clearToken(); showGate(); }
    }).catch(function () { showGate(); });
  })();

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var token = document.getElementById('admin_token').value.trim();
    if (!token) return;
    loginBtn.disabled = true;
    alertHtml(loginResult, 'info', 'Verificando…');
    checkToken(token)
      .then(function (ok) {
        if (ok) {
          setToken(token);
          loginResult.innerHTML = '';
          showPanel();
        } else {
          alertHtml(loginResult, 'error', 'Token inválido.');
        }
      })
      .catch(function (err) {
        alertHtml(loginResult, 'error', 'No se pudo contactar el servidor. (' + err.message + ')');
      })
      .finally(function () { loginBtn.disabled = false; });
  });

  logout.addEventListener('click', function (e) {
    e.preventDefault();
    clearToken();
    resultEl.innerHTML = '';
    showGate();
  });

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
      method: 'POST',
      headers: { 'x-admin-token': getToken() },
      body: fd
    })
      .then(function (r) {
        return r.json().then(function (body) { return { ok: r.ok, status: r.status, body: body }; });
      })
      .then(function (res) {
        if (res.status === 401) {
          // Token went stale / invalid — force re-login.
          clearToken();
          alertHtml(resultEl, 'error', 'Sesión expirada. Vuelve a ingresar el token.');
          showGate();
          return;
        }
        if (!res.ok) {
          var detail = (res.body && res.body.detail) ? res.body.detail : ('Error ' + res.status);
          alertHtml(resultEl, 'error', 'No se pudo registrar: ' + detail);
          return;
        }
        var v = res.body.volunteer || res.body;
        alertHtml(resultEl, 'success', 'Voluntario <strong>' + (v.first_name || '') + ' ' +
          (v.last_name || '') + '</strong> (cédula ' + (v.cedula || '') + ') registrado correctamente.');
        registerForm.reset();
      })
      .catch(function (err) {
        alertHtml(resultEl, 'error', 'No se pudo contactar el servidor. (' + err.message + ')');
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();
