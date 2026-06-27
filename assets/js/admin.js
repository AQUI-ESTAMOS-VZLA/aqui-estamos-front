/* Panel de Administración — admin-gated console: look up + register volunteers.
 *
 * Two login modes (auto-selected):
 *   - Supabase Auth magic link (per-person) when SUPABASE_URL + SUPABASE_ANON_KEY
 *     are configured: admins sign in with their email; the backend authorizes only
 *     allowlisted emails. This is the intended production mode.
 *   - Shared token fallback otherwise (local mock dev): a single access key.
 *
 * Admin actions send either "Authorization: Bearer <jwt>" (Supabase) or
 * "x-admin-token: <key>" (fallback), both enforced by the backend.
 */
(function () {
  var cfg = window.AE_CONFIG;
  var TOKEN_KEY = 'ae_admin_token';

  var useSupabase = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  var sb = useSupabase ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  var accessToken = '';   // current Supabase access token

  // Elements
  var gate = document.getElementById('gate');
  var panel = document.getElementById('panel');
  var loginEmail = document.getElementById('login-email');
  var loginToken = document.getElementById('login-token');
  var loginEmailBtn = document.getElementById('login-email-btn');
  var loginTokenBtn = document.getElementById('login-token-btn');
  var loginResult = document.getElementById('login-result');
  var adminWho = document.getElementById('admin-who');
  var logout = document.getElementById('logout');

  var verifyForm = document.getElementById('verify-form');
  var verifyBtn = document.getElementById('verify-btn');
  var verifyResult = document.getElementById('verify-result');
  var registerForm = document.getElementById('register-form');
  var submitBtn = document.getElementById('submit-btn');
  var resultEl = document.getElementById('result');

  // Helpers
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
  function authHeaders() {
    return useSupabase ? { 'Authorization': 'Bearer ' + accessToken } : { 'x-admin-token': getToken() };
  }

  function showPanel(email) { gate.hidden = true; panel.hidden = false; adminWho.textContent = email || ''; }
  function showGate() {
    panel.hidden = true; gate.hidden = false;
    if (loginEmail) { var i = document.getElementById('admin_email'); if (i) i.value = ''; }
    if (loginToken) { var t = document.getElementById('admin_token'); if (t) t.value = ''; }
  }

  // Validate the current credential against the backend; resolves to {ok, email}.
  function checkAccess() {
    return fetch(cfg.API_BASE + '/api/admin/check', { headers: authHeaders() })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); });
  }

  // ---- Mode setup --------------------------------------------------------
  if (useSupabase) {
    loginEmail.hidden = false;

    // Establish session from a returning magic-link, then validate allowlist.
    function onSession(session) {
      if (session && session.access_token) {
        accessToken = session.access_token;
        checkAccess().then(function (res) {
          if (res.ok) { loginResult.innerHTML = ''; showPanel(res.body.email); }
          else if (res.status === 403) {
            alertHtml(loginResult, 'error', 'Tu cuenta no está autorizada como administradora.');
            sb.auth.signOut(); accessToken = ''; showGate();
          } else { showGate(); }
        });
      } else { showGate(); }
    }
    sb.auth.getSession().then(function (r) { onSession(r.data.session); });
    sb.auth.onAuthStateChange(function (_event, session) { onSession(session); });

    loginEmail.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('admin_email').value.trim();
      if (!email) return;
      loginEmailBtn.disabled = true;
      alertHtml(loginResult, 'info', 'Enviando enlace…');
      sb.auth.signInWithOtp({
        email: email,
        options: { emailRedirectTo: location.href.split('#')[0] }
      }).then(function (r) {
        if (r.error) alertHtml(loginResult, 'error', 'No se pudo enviar el enlace: ' + esc(r.error.message));
        else alertHtml(loginResult, 'success', 'Revisa tu correo (' + esc(email) + ') y abre el enlace para entrar.');
      }).finally(function () { loginEmailBtn.disabled = false; });
    });

  } else {
    // Shared-token fallback
    loginToken.hidden = false;
    var t = getToken();
    if (t) checkAccess().then(function (res) { res.ok ? showPanel() : (clearToken(), showGate()); }).catch(showGate);
    else showGate();

    loginToken.addEventListener('submit', function (e) {
      e.preventDefault();
      var token = document.getElementById('admin_token').value.trim();
      if (!token) return;
      loginTokenBtn.disabled = true;
      alertHtml(loginResult, 'info', 'Verificando…');
      setToken(token);
      checkAccess().then(function (res) {
        if (res.ok) { loginResult.innerHTML = ''; showPanel(); }
        else { clearToken(); alertHtml(loginResult, 'error', 'Clave inválida.'); }
      }).catch(function (err) {
        clearToken(); alertHtml(loginResult, 'error', 'No se pudo contactar el servidor. (' + err.message + ')');
      }).finally(function () { loginTokenBtn.disabled = false; });
    });
  }

  logout.addEventListener('click', function (e) {
    e.preventDefault();
    resultEl.innerHTML = ''; verifyResult.innerHTML = '';
    if (useSupabase) { sb.auth.signOut(); accessToken = ''; }
    else { clearToken(); }
    showGate();
  });

  function forceRelogin(el) {
    if (useSupabase) { sb.auth.signOut(); accessToken = ''; }
    else { clearToken(); }
    if (el) alertHtml(el, 'error', 'Sesión expirada. Vuelve a iniciar sesión.');
    showGate();
  }

  // ---- Lookup (public verify endpoint) -----------------------------------
  verifyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cedula = document.getElementById('v_cedula').value.trim();
    if (!cedula) return;
    verifyBtn.disabled = true;
    alertHtml(verifyResult, 'info', 'Buscando…');
    fetch(cfg.API_BASE + '/api/volunteers/verify?cedula=' + encodeURIComponent(cedula))
      .then(function (r) { if (r.status === 404) return null; if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        if (!data || !data.volunteer) {
          alertHtml(verifyResult, 'error', 'No se encontró ningún voluntario con la cédula ' + esc(cedula) + '.');
          return;
        }
        var v = data.volunteer;
        var photo = v.photo_url ? '<img class="photo" src="' + esc(v.photo_url) + '" alt="Foto" />' : '<div class="photo"></div>';
        verifyResult.innerHTML =
          '<div class="card">' + photo + '<div class="info">' +
            '<h3>' + esc(v.first_name) + ' ' + esc(v.last_name) + '</h3>' +
            row('Cédula', v.cedula) + row('Rol', v.role) + row('Estado', v.status) +
            row('Registrado por', v.registered_by) +
            row('Registrado', v.created_at ? v.created_at.substring(0, 10) : '') +
          '</div></div>';
      })
      .catch(function (err) { alertHtml(verifyResult, 'error', 'Error al buscar. (' + err.message + ')'); })
      .finally(function () { verifyBtn.disabled = false; });
  });

  // ---- Register (admin only) ---------------------------------------------
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

    fetch(cfg.API_BASE + '/api/volunteers', { method: 'POST', headers: authHeaders(), body: fd })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); })
      .then(function (res) {
        if (res.status === 401 || res.status === 403) { forceRelogin(resultEl); return; }
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
