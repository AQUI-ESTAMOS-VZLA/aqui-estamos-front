/* Consola de Registros — registry volunteers add / browse / verify / delete records.
 * Auth: Supabase magic-link (gated by the registry allowlist) with a shared-token
 * fallback for local mock dev. Mirrors the admin console auth flow. */
(function () {
  var cfg = window.AE_CONFIG;
  var TOKEN_KEY = 'ae_registro_token';
  var useSupabase = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  var sb = useSupabase ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  var accessToken = '';
  var allRegistros = [];

  var STATUS = {
    localizada:'Localizada', en_refugio:'En refugio', hospitalizada:'Hospitalizada',
    buscada:'Buscada por familiares', fallecida:'Fallecida'
  };
  var STATUS_CLS = { localizada:'ok', en_refugio:'info', hospitalizada:'info', buscada:'warn', fallecida:'muted' };

  var $ = function (id) { return document.getElementById(id); };
  var gate = $('gate'), panel = $('panel');
  var loginEmail = $('login-email'), loginToken = $('login-token');
  var loginEmailBtn = $('login-email-btn'), loginTokenBtn = $('login-token-btn');
  var loginResult = $('login-result'), who = $('who'), logout = $('logout');
  var regForm = $('reg-form'), regSubmit = $('reg-submit'), regResult = $('reg-result');
  var listEl = $('list'), filterEl = $('filter');

  function getToken(){ return sessionStorage.getItem(TOKEN_KEY) || ''; }
  function setToken(t){ sessionStorage.setItem(TOKEN_KEY, t); }
  function clearToken(){ sessionStorage.removeItem(TOKEN_KEY); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function alertHtml(el,k,m){ el.innerHTML = '<div class="alert '+k+'">'+m+'</div>'; }
  function authHeaders(){ return useSupabase ? { 'Authorization':'Bearer '+accessToken } : { 'x-admin-token':getToken() }; }

  function showPanel(email){ gate.hidden=true; panel.hidden=false; who.textContent=email||''; loadList(); }
  function showGate(){ panel.hidden=true; gate.hidden=false; }
  function forceRelogin(el){ if(useSupabase){ sb.auth.signOut(); accessToken=''; } else clearToken(); if(el) alertHtml(el,'error','Sesión expirada. Vuelve a iniciar sesión.'); showGate(); }

  function checkAccess(){
    return fetch(cfg.API_BASE+'/api/registro/check',{headers:authHeaders()})
      .then(function(r){ return r.json().then(function(b){ return {ok:r.ok,status:r.status,body:b}; }); });
  }

  // ---- Auth setup ----
  if (useSupabase) {
    loginEmail.hidden = false;
    function onSession(session){
      if(session && session.access_token){
        accessToken = session.access_token;
        checkAccess().then(function(res){
          if(res.ok){ loginResult.innerHTML=''; showPanel(res.body.email); }
          else if(res.status===403){ alertHtml(loginResult,'error','Tu cuenta no está autorizada para el registro.'); sb.auth.signOut(); accessToken=''; showGate(); }
          else showGate();
        });
      } else showGate();
    }
    sb.auth.getSession().then(function(r){ onSession(r.data.session); });
    sb.auth.onAuthStateChange(function(_e,session){ onSession(session); });
    loginEmail.addEventListener('submit', function(e){
      e.preventDefault();
      var email = $('reg_email').value.trim(); if(!email) return;
      loginEmailBtn.disabled = true; alertHtml(loginResult,'info','Enviando enlace…');
      sb.auth.signInWithOtp({ email: email, options:{ emailRedirectTo: location.href.split('#')[0] } })
        .then(function(r){ if(r.error) alertHtml(loginResult,'error','No se pudo enviar: '+esc(r.error.message)); else alertHtml(loginResult,'success','Revisa tu correo ('+esc(email)+') y abre el enlace.'); })
        .finally(function(){ loginEmailBtn.disabled = false; });
    });
  } else {
    loginToken.hidden = false;
    var t = getToken();
    if(t) checkAccess().then(function(res){ res.ok ? showPanel() : (clearToken(), showGate()); }).catch(showGate);
    else showGate();
    loginToken.addEventListener('submit', function(e){
      e.preventDefault();
      var token = $('reg_token').value.trim(); if(!token) return;
      loginTokenBtn.disabled = true; alertHtml(loginResult,'info','Verificando…'); setToken(token);
      checkAccess().then(function(res){ if(res.ok){ loginResult.innerHTML=''; showPanel(); } else { clearToken(); alertHtml(loginResult,'error','Clave inválida.'); } })
        .catch(function(err){ clearToken(); alertHtml(loginResult,'error','No se pudo contactar el servidor. ('+err.message+')'); })
        .finally(function(){ loginTokenBtn.disabled = false; });
    });
  }
  logout.addEventListener('click', function(e){ e.preventDefault(); if(useSupabase){ sb.auth.signOut(); accessToken=''; } else clearToken(); showGate(); });

  // ---- Photo preview ----
  var photo = $('photo'), preview = $('photo-preview');
  photo.addEventListener('change', function(){ var f=photo.files[0]; if(f){ preview.src=URL.createObjectURL(f); preview.classList.add('show'); } else preview.classList.remove('show'); });

  // ---- Add registro ----
  var FIELDS = ['first_name','last_name','approximate_age','city','status','exact_address','gps','facility','phones','emails','family_data','id_document','medical_info','video_url','internal_notes'];
  regForm.addEventListener('submit', function(e){
    e.preventDefault();
    var fd = new FormData();
    FIELDS.forEach(function(k){ var el=$(k); if(el) fd.append(k, el.value.trim()); });
    if(photo.files[0]) fd.append('photo', photo.files[0]);
    regSubmit.disabled = true; alertHtml(regResult,'info','Guardando…');
    fetch(cfg.API_BASE+'/api/registros',{ method:'POST', headers:authHeaders(), body:fd })
      .then(function(r){ return r.json().then(function(b){ return {ok:r.ok,status:r.status,body:b}; }); })
      .then(function(res){
        if(res.status===401||res.status===403){ forceRelogin(regResult); return; }
        if(!res.ok){ alertHtml(regResult,'error','No se pudo guardar: '+esc((res.body&&res.body.detail)||('Error '+res.status))); return; }
        var v = res.body.registro;
        alertHtml(regResult,'success','Registro <strong>'+esc(v.registro_number)+'</strong> creado: '+esc(v.first_name)+' '+esc(v.last_name)+'.');
        regForm.reset(); preview.classList.remove('show'); loadList();
      })
      .catch(function(err){ alertHtml(regResult,'error','No se pudo contactar el servidor. ('+err.message+')'); })
      .finally(function(){ regSubmit.disabled = false; });
  });

  // ---- List / verify / delete ----
  function loadList(){
    listEl.innerHTML = '<div class="alert info spinner">Cargando…</div>';
    fetch(cfg.API_BASE+'/api/registros',{ headers:authHeaders() })
      .then(function(r){ if(r.status===401||r.status===403){ forceRelogin(); throw new Error('auth'); } if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(function(d){ allRegistros = d.registros||[]; renderList(); })
      .catch(function(err){ if(err.message!=='auth') listEl.innerHTML='<div class="alert error">No se pudo cargar. ('+esc(err.message)+')</div>'; });
  }

  function priv(label, value){ return value ? '<div class="row"><span class="k">'+esc(label)+':</span>'+esc(value)+'</div>' : ''; }

  function renderList(){
    var f = (filterEl.value||'').trim().toLowerCase();
    var rows = allRegistros.filter(function(r){
      if(!f) return true;
      return ((r.first_name||'')+' '+(r.last_name||'')+' '+(r.city||'')+' '+(r.registro_number||'')).toLowerCase().indexOf(f) >= 0;
    });
    if(!rows.length){ listEl.innerHTML='<p class="muted small">Sin registros'+(f?' para “'+esc(f)+'”':'')+'.</p>'; return; }
    listEl.innerHTML = rows.map(function(r){
      var photo = r.photo_url ? '<img class="photo" src="'+esc(r.photo_url)+'" alt="Foto" />' : '<div class="photo"></div>';
      var st = STATUS[r.status]||r.status;
      return '<div class="card">'+photo+'<div class="info" style="width:100%">'+
        '<h3 style="margin-bottom:.4rem">'+esc(r.first_name)+' '+esc(r.last_name)+'</h3>'+
        '<div style="margin-bottom:.5rem"><span class="status-pill s-'+(STATUS_CLS[r.status]||'muted')+'">'+esc(st)+'</span></div>'+
        priv('N.º', r.registro_number)+priv('Ciudad', r.city)+(r.approximate_age?priv('Edad', r.approximate_age+' años'):'')+
        priv('Dirección', r.exact_address)+priv('Hospital/Refugio', r.facility)+priv('GPS', r.gps)+
        priv('Teléfonos', r.phones)+priv('Correos', r.emails)+priv('Documento', r.id_document)+
        priv('Familiares', r.family_data)+priv('Médico', r.medical_info)+priv('Video', r.video_url)+
        priv('Notas', r.internal_notes)+priv('Registrado por', r.registered_by)+
        '<button class="rm" data-num="'+esc(r.registro_number)+'" style="margin-top:.7rem">Eliminar</button>'+
      '</div></div>';
    }).join('');
  }

  filterEl.addEventListener('input', renderList);
  listEl.addEventListener('click', function(e){
    var btn = e.target.closest('.rm'); if(!btn) return;
    var num = btn.getAttribute('data-num');
    if(!confirm('¿Eliminar el registro '+num+'? Esta acción no se puede deshacer.')) return;
    btn.disabled = true;
    fetch(cfg.API_BASE+'/api/registros/'+encodeURIComponent(num),{ method:'DELETE', headers:authHeaders() })
      .then(function(r){ if(r.status===401||r.status===403){ forceRelogin(); throw new Error('auth'); } if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(function(){ allRegistros = allRegistros.filter(function(x){ return x.registro_number!==num; }); renderList(); })
      .catch(function(err){ if(err.message!=='auth'){ alert('No se pudo eliminar. ('+err.message+')'); btn.disabled=false; } });
  });
})();
