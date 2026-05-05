    // GLOBAL PAGINATION HELPER
    window._PAGINATION = {};
    function applyGenericPagination(id, data, renderRowsFnOrString, subId, subTemplate) {
      if (typeof renderRowsFnOrString === 'string' && !window[renderRowsFnOrString]) {
        console.error('renderRowsFn not found: ', renderRowsFnOrString);
        return;
      }
      window._PAGINATION[id] = window._PAGINATION[id] || { page: 1, data: [], render: null, subId: subId, subTemplate: subTemplate };
      window._PAGINATION[id].data = data;
      window._PAGINATION[id].page = 1;
      
      if (typeof renderRowsFnOrString === 'function') {
         window._PAGINATION[id].render = renderRowsFnOrString;
      } else if (typeof renderRowsFnOrString === 'string') {
         window._PAGINATION[id].render = window[renderRowsFnOrString];
      }
      
      renderGenericPage(id);
    }
    
    function renderGenericPage(id) {
      const pData = window._PAGINATION[id];
      if (!pData) return;
      const data = pData.data;
      const page = pData.page;
      const render = pData.render;
      const subId = pData.subId;
      const subTemplate = pData.subTemplate;
      
      const perPage = 25;
      const totalPages = Math.ceil(data.length / perPage) || 1;
      const sliced = data.slice((page - 1) * perPage, page * perPage);
      
      const tbody = document.getElementById(id);
      if(tbody && render) tbody.innerHTML = render(sliced);
      
      const subEl = document.getElementById(subId);
      if(subEl) subEl.textContent = subTemplate.replace('{count}', data.length);
      
      if(!tbody) return;
      let sc = tbody.closest('.sc');
      if(!sc) return;
      let pagEl = sc.querySelector('#pag-'+id);
      if(!pagEl) {
        pagEl = document.createElement('div');
        pagEl.id = 'pag-'+id;
        sc.appendChild(pagEl);
      }
      pagEl.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:12px;padding:14px;font-family:var(--fb);font-size:13px;color:var(--gmid)';
      pagEl.innerHTML = '<button onclick="window._PAGINATION[\''+id+'\'].page=Math.max(1,window._PAGINATION[\''+id+'\'].page-1);renderGenericPage(\''+id+'\')" style="border:1px solid var(--bdr);background:#fff;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px" ' + (page<=1?'disabled':'') + '>←</button> Página ' + page + ' de ' + totalPages + ' <button onclick="window._PAGINATION[\''+id+'\'].page=Math.min('+totalPages+',window._PAGINATION[\''+id+'\'].page+1);renderGenericPage(\''+id+'\')" style="border:1px solid var(--bdr);background:#fff;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px" ' + (page>=totalPages?'disabled':'') + '>→</button> <span style="margin-left:8px">' + perPage + ' filas</span>';
    }
  
    function renderDirTareasPage() {
      const data = window._DT_DATA || [];
      const page = window._DT_PAGE || 1;
      const perPage = 25;
      const totalPages = Math.ceil(data.length / perPage) || 1;
      const sliced = data.slice((page - 1) * perPage, page * perPage);
      document.getElementById('dir-tareas-tbody').innerHTML = renderDirTareasRows(sliced);
      document.getElementById('dt-sub').textContent = data.length + ' tareas';
      let pagEl = document.getElementById('dt-pagination');
      if (!pagEl) { pagEl = document.createElement('div'); pagEl.id = 'dt-pagination'; document.getElementById('dir-tareas-tbody').closest('.sc').appendChild(pagEl); }
      pagEl.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:12px;padding:14px;font-family:var(--fb);font-size:13px;color:var(--gmid)';
      pagEl.innerHTML = '<button onclick="window._DT_PAGE=Math.max(1,window._DT_PAGE-1);renderDirTareasPage()" style="border:1px solid var(--bdr);background:#fff;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px" ' + (page<=1?'disabled':'') + '>←</button> Página ' + page + ' de ' + totalPages + ' <button onclick="window._DT_PAGE=Math.min('+totalPages+',window._DT_PAGE+1);renderDirTareasPage()" style="border:1px solid var(--bdr);background:#fff;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px" ' + (page>=totalPages?'disabled':'') + '>→</button> <span style="margin-left:8px">' + perPage + ' filas</span>';
    }


    // """"""""""""""""""""""""""""""""""""""""""""""
    // DATOS
    // """"""""""""""""""""""""""""""""""""""""""""""
    const TAREAS = [
      { id: 'ENS-VID-001', comision: 'Enseñanza', responsable: 'Rafael Einar Chalco Huanca', desc: 'Consolidar ideas y entregar guion final del TikTok al equipo de edición', fecha: '2026-03-02', prioridad: 'Alta', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'ENS-VID-002', comision: 'Enseñanza', responsable: 'Rafael Einar Chalco Huanca', desc: 'Organizar lista de tres personas para el video', fecha: '2026-03-04', prioridad: 'Alta', estado: 'En revisión', evidencia: 'drive.google.com/file1', entrega: '2026-03-03', validacion: null },
      { id: 'ENS-VID-003', comision: 'Enseñanza', responsable: 'Huáscar Omar Quenta Chambi', desc: 'Editar el video promocional y coordinar con personas en casa', fecha: '2026-03-04', prioridad: 'Alta', estado: 'En revisión', evidencia: 'drive.google.com/file2', entrega: '2026-03-04', validacion: null },
      { id: 'ENS-VID-004', comision: 'Enseñanza', responsable: 'Vivian Sthefanny Mendoza Marquez', desc: 'Apoyar en recopilación de material audiovisual', fecha: '2026-03-03', prioridad: 'Alta', estado: 'Aprobada', evidencia: 'drive.google.com/file3', entrega: '2026-03-03', validacion: 'Aprobada' },
      { id: 'ENS-DIF-001', comision: 'Enseñanza', responsable: 'Andrea Marina Castro Quispe', desc: 'Enviar formulario de retroalimentación al grupo', fecha: '2026-03-02', prioridad: 'Media', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'ENS-VID-007', comision: 'Enseñanza', responsable: 'Andrea Marina Castro Quispe', desc: 'Grabar frase para el guion del TikTok', fecha: '2026-03-05', prioridad: 'Alta', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'ENS-LOG-001', comision: 'Enseñanza', responsable: 'Andrea Marina Castro Quispe', desc: 'Coordinar modalidad de apoyo logístico para charlas', fecha: '2026-03-06', prioridad: 'Media', estado: 'Rechazada', evidencia: 'drive.google.com/file4', entrega: '2026-03-05', validacion: 'Rechazada' },
      { id: 'ENS-GRP-001', comision: 'Enseñanza', responsable: 'Oscar Kevin Cortez Aguilar', desc: 'Revisar y votar actividad prioritaria para difusión', fecha: '2026-03-02', prioridad: 'Alta', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'ENS-VID-008', comision: 'Enseñanza', responsable: 'Oscar Kevin Cortez Aguilar', desc: 'Colaborar en definición de estructura del video', fecha: '2026-03-03', prioridad: 'Alta', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'ENS-ORG-001', comision: 'Enseñanza', responsable: 'Diego Ariel Rivera Claure', desc: 'Coordinar día semanal para distribución de certificados Aspen', fecha: '2026-03-04', prioridad: 'Media', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'INV-001', comision: 'Investigación y Desarrollo', responsable: 'Socio A', desc: 'Preparar informe mensual de avances', fecha: '2026-03-10', prioridad: 'Alta', estado: 'Pendiente', evidencia: null, entrega: null, validacion: null },
      { id: 'INV-002', comision: 'Investigación y Desarrollo', responsable: 'Socio B', desc: 'Revisar bibliografía del proyecto', fecha: '2026-03-12', prioridad: 'Media', estado: 'Aprobada', evidencia: 'drive...', entrega: '2026-03-11', validacion: 'Aprobada' },
      { id: 'RED-001', comision: 'Redacción Científica', responsable: 'Socio C', desc: 'Redactar abstract del artículo', fecha: '2026-03-08', prioridad: 'Alta', estado: 'En revisión', evidencia: 'drive...', entrega: '2026-03-07', validacion: null },
    ];

    const ASISTENCIA = [
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Rafael Einar Chalco Huanca', asistencia: 'Presente', hora: '19:56', tiempo: '01:24:36' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Andrea Marina Castro Quispe', asistencia: 'Presente', hora: '20:31', tiempo: '00:49:20' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Dayana Fiorela Cruz Mendoza', asistencia: 'Ausente', hora: '-', tiempo: '-' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Diana Carolina Cruz Laura', asistencia: 'Presente', hora: '20:33', tiempo: '00:46:55' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Diego Ariel Rivera Claure', asistencia: 'Presente', hora: '20:54', tiempo: '00:26:09' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Gabriel Omar Huayllani Mamani', asistencia: 'Presente', hora: '20:34', tiempo: '00:46:23' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Huáscar Omar Quenta Chambi', asistencia: 'Presente', hora: '20:28', tiempo: '00:52:12' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Nayeli Milenca Agustin Cortez', asistencia: 'Presente', hora: '20:40', tiempo: '00:35:08' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Oscar Kevin Cortez Aguilar', asistencia: 'Presente', hora: '20:31', tiempo: '00:49:06' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Rouseth Katia Rojas Huanca', asistencia: 'Ausente', hora: '-', tiempo: '-' },
      { fecha: '2026-03-01', comision: 'Enseñanza', reunion: 1, socio: 'Vivian Sthefanny Mendoza Marquez', asistencia: 'Presente', hora: '20:23', tiempo: '00:58:03' },
      { fecha: '2026-02-15', comision: 'Enseñanza', reunion: 0, socio: 'Rafael Einar Chalco Huanca', asistencia: 'Presente', hora: '20:05', tiempo: '01:10:00' },
      { fecha: '2026-02-15', comision: 'Enseñanza', reunion: 0, socio: 'Andrea Marina Castro Quispe', asistencia: 'Ausente', hora: '-', tiempo: '-' },
      { fecha: '2026-02-15', comision: 'Enseñanza', reunion: 0, socio: 'Nayeli Milenca Agustin Cortez', asistencia: 'Con Permiso', hora: '-', tiempo: '-' },
    ];

    const COMISIONES_DATA = [
      { nombre: 'Investigación y Desarrollo', tareas: 12, completadas: 4, asistencia: 80, color: '#F39C12' },
      { nombre: 'Redacción Científica', tareas: 8, completadas: 6, asistencia: 90, color: '#8E44AD' },
      { nombre: 'Ingeniería Experimental', tareas: 10, completadas: 3, asistencia: 70, color: '#E53935' },
      { nombre: 'Interacción Social', tareas: 6, completadas: 5, asistencia: 85, color: '#29B6F6' },
      { nombre: 'Becas y Pasantía', tareas: 9, completadas: 7, asistencia: 75, color: '#8BC34A' },
      { nombre: 'Visitas Industriales', tareas: 7, completadas: 2, asistencia: 65, color: '#F39C12' },
      { nombre: 'Diálogo Estudiantil', tareas: 5, completadas: 4, asistencia: 95, color: '#8E44AD' },
      { nombre: 'Enseñanza', tareas: 15, completadas: 5, asistencia: 82, color: '#29B6F6' },
      { nombre: 'Media, Publicidad y Redes', tareas: 11, completadas: 8, asistencia: 78, color: '#E53935' },
      { nombre: 'Difusión y Divulgación', tareas: 8, completadas: 3, asistencia: 72, color: '#8BC34A' },
    ];

    // """"""""""""""""""""""""""""""""""""""""""""""
    // SUPABASE
    // """"""""""""""""""""""""""""""""""""""""""""""
    const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sb = supabase.createClient(SUPA_URL, SUPA_KEY);

    // """"""""""""""""""""""""""""""""""""""""""""""
    // ESTADO GLOBAL
    // """"""""""""""""""""""""""""""""""""""""""""""
    let CU = null;
    let tareasData = [];
    let asistData = [];
    let modalCallback = null;
    let activeCom = null;
    let ACTIVE_COM_NAMES = [];

    // """"""""""""""""""""""""""""""""""""""""""""""
    // HELPERS UI LOGIN
    // """"""""""""""""""""""""""""""""""""""""""""""
    function showPanel(p) {
      document.getElementById('panel-login').style.display = p === 'login' ? 'block' : 'none';
      document.getElementById('panel-register').style.display = p === 'register' ? 'block' : 'none';
      document.getElementById('panel-forgot').style.display = p === 'forgot' ? 'block' : 'none';
      document.getElementById('login-error').style.display = 'none';
      document.getElementById('register-msg').style.display = 'none';
      document.getElementById('forgot-msg').style.display = 'none';
    }

    async function doForgot() {
      const email = document.getElementById('forgot-email').value.trim();
      const el = document.getElementById('forgot-msg');
      if (!email) {
        el.style.display = 'block'; el.textContent = 'Ingresa tu correo.';
        el.style.background = '#FFEBEE'; el.style.color = '#C62828'; el.style.borderLeftColor = '#E53935';
        return;
      }
      setBtnLoading('btn-forgot', true, 'Enviar link de recuperación');
      try {
        const { error } = await sb.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.href
        });
        if (error) throw error;
        el.style.display = 'block';
        el.textContent = '¡Listo! Revisa tu correo — te enviamos un link para restablecer tu contraseña.';
        el.style.background = '#E8F5E9'; el.style.color = '#2E7D32'; el.style.borderLeftColor = '#4CAF50';
      } catch (e) {
        el.style.display = 'block';
        el.textContent = 'Error: ' + e.message;
        el.style.background = '#FFEBEE'; el.style.color = '#C62828'; el.style.borderLeftColor = '#E53935';
      } finally { setBtnLoading('btn-forgot', false, 'Enviar link de recuperación'); }
    }
    function setLoginError(msg) {
      const el = document.getElementById('login-error');
      el.style.display = msg ? 'block' : 'none'; el.textContent = msg || '';
    }
    function setRegisterMsg(msg, ok) {
      const el = document.getElementById('register-msg');
      el.style.display = msg ? 'block' : 'none'; el.textContent = msg || '';
      el.style.background = ok ? '#E8F5E9' : '#FFEBEE';
      el.style.color = ok ? '#2E7D32' : '#C62828';
      el.style.borderLeftColor = ok ? '#4CAF50' : '#E53935';
    }
    function setBtnLoading(id, loading, label) {
      const b = document.getElementById(id);
      if (b) { b.disabled = loading; b.textContent = loading ? 'Cargando...' : label; }
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // AUTH — SUPABASE REAL
    // """"""""""""""""""""""""""""""""""""""""""""""
    async function doLogin() {
      const email = document.getElementById('lu').value.trim();
      const pass = document.getElementById('lp').value;
      if (!email || !pass) { setLoginError('Completa todos los campos.'); return; }
      setLoginError(''); setBtnLoading('btn-login', true, 'Ingresar al sistema');
      try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        await loadUserAndEnter(data.user);
      } catch (e) {
        setLoginError(e.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : e.message);
      } finally { setBtnLoading('btn-login', false, 'Ingresar al sistema'); }
    }

    async function doRegister() {
      const email = document.getElementById('reg-email').value.trim();
      const pass = document.getElementById('reg-pass').value;
      const pass2 = document.getElementById('reg-pass2').value;
      setRegisterMsg('');
      if (!email || !pass || !pass2) { setRegisterMsg('Completa todos los campos.'); return; }
      if (pass !== pass2) { setRegisterMsg('Las contraseñas no coinciden.'); return; }
      if (pass.length < 6) { setRegisterMsg('La contraseña debe tener al menos 6 caracteres.'); return; }
      setBtnLoading('btn-register', true, 'Crear cuenta');
      try {
        const { data: usr } = await sb.from('usuarios').select('id').eq('email', email).single();
        if (!usr) { setRegisterMsg('Este correo no está registrado como socio. Contacta a la directiva.'); return; }
        const { error } = await sb.auth.signUp({ email, password: pass });
        if (error) throw error;
        setRegisterMsg('¡Cuenta creada! Revisa tu correo para confirmarla y luego inicia sesión.', true);
      } catch (e) {
        setRegisterMsg(e.message === 'User already registered' ? 'Este correo ya tiene cuenta. Inicia sesión.' : e.message);
      } finally { setBtnLoading('btn-register', false, 'Crear cuenta'); }
    }

    async function loadUserAndEnter(authUser) {
      const { data: usr, error } = await sb.from('usuarios').select('id,nombre_completo,email').eq('email', authUser.email).single();
      if (error || !usr) { setLoginError('No se encontró tu perfil. Contacta a la directiva.'); return; }
      const { data: mems } = await sb.from('usuario_comisiones').select('cargo,comision_id,comisiones(nombre)').eq('usuario_id', usr.id).eq('activo', true);
      const cargos = mems ? mems.map(m => m.cargo) : [];
      const rol = cargos.includes('directiva') ? 'directiva' : cargos.includes('lider') ? 'lider' : 'socio';
      const comisiones = mems ? [...new Set(mems.map(m => m.comisiones?.nombre).filter(Boolean))] : [];
      const comisionesLider = mems ? mems.filter(m => m.cargo === 'lider').map(m => m.comisiones?.nombre).filter(Boolean) : [];
      CU = { id: usr.id, nombre: usr.nombre_completo, email: usr.email, rol, comisiones: rol === 'directiva' ? ['Todas'] : comisiones, comisionesLider, filtro: usr.nombre_completo };
      activeCom = CU.comisiones[0];
      document.getElementById('view-login').classList.remove('active');
      document.getElementById('view-app').classList.add('active');
      document.getElementById('sb-name').textContent = CU.nombre;
      document.getElementById('sb-role').textContent = (rol === 'directiva' ? 'Directiva' : rol === 'lider' ? 'Líder' : 'Socio') + ' · ' + (rol === 'directiva' ? 'Todas las comisiones' : CU.comisiones.join(', '));
      document.getElementById('tb-rol').textContent = rol === 'directiva' ? 'Directiva' : rol === 'lider' ? 'Líder' : 'Socio';
      document.getElementById('tb-com').textContent = rol === 'directiva' ? 'Todas' : CU.comisiones.join(', ');
      await Promise.all([loadTareas(), loadAsistencia()]);
      const { data: acComs } = await sb.from('comisiones').select('nombre').eq('activa', true);
      ACTIVE_COM_NAMES = (acComs || []).map(c => c.nombre);
      buildNav();
      goPage(rol === 'directiva' ? 'dir-resumen' : 'resumen');
    }

    async function doLogout() {
      await sb.auth.signOut();
      CU = null; tareasData = []; asistData = []; ACTIVE_COM_NAMES = [];
      document.getElementById('view-app').classList.remove('active');
      document.getElementById('view-login').classList.add('active');
      document.getElementById('lu').value = '';
      document.getElementById('lp').value = '';
      showPanel('login');
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // CARGA DE DATOS DESDE SUPABASE
    // """"""""""""""""""""""""""""""""""""""""""""""
    async function loadTareas() {
      let query = sb.from('tareas').select('id,tarea_codigo,descripcion,fecha_limite,prioridad,estado,evidencia_url,fecha_entrega,validacion,comisiones(nombre),usuarios(nombre_completo)');
      if (CU.rol === 'socio') query = query.eq('responsable_id', CU.id);
      else if (CU.rol === 'lider') {
        const { data: coms } = await sb.from('usuario_comisiones').select('comision_id').eq('usuario_id', CU.id).eq('cargo', 'lider');
        const ids = coms ? coms.map(c => c.comision_id) : [];
        if (ids.length) query = query.in('comision_id', ids);
      }
      const { data, error } = await query.order('fecha_limite', { ascending: true });
      if (error) { console.error(error); return; }
      tareasData = (data || []).sort((a, b) => new Date(b.fecha_limite) - new Date(a.fecha_limite)).map(t => ({ id: t.tarea_codigo, comision: t.comisiones?.nombre || '', responsable: t.usuarios?.nombre_completo || '', desc: t.descripcion, fecha: t.fecha_limite, prioridad: t.prioridad, estado: t.estado, evidencia: t.evidencia_url, entrega: t.fecha_entrega, validacion: t.validacion, db_id: t.id }));
    }

    async function loadAsistencia() {
      let query = sb.from('asistencia').select('id,fecha_reunion,numero_reunion,estado,hora_ingreso,tiempo_llamada,comisiones(nombre),usuarios(nombre_completo)');
      if (CU.rol === 'socio') query = query.eq('socio_id', CU.id);
      else if (CU.rol === 'lider') {
        const { data: coms } = await sb.from('usuario_comisiones').select('comision_id').eq('usuario_id', CU.id).eq('cargo', 'lider');
        const ids = coms ? coms.map(c => c.comision_id) : [];
        if (ids.length) query = query.in('comision_id', ids);
      }
      const { data, error } = await query.order('fecha_reunion', { ascending: false });
      if (error) { console.error(error); return; }
      asistData = (data || []).map(a => ({ fecha: a.fecha_reunion, comision: a.comisiones?.nombre || '', reunion: a.numero_reunion, socio: a.usuarios?.nombre_completo || '', asistencia: a.estado, hora: a.hora_ingreso || '-', tiempo: a.tiempo_llamada || '-', db_id: a.id }));
    }

    async function updateEstadoTarea(dbId, nuevoEstado) {
      const { error } = await sb.from('tareas').update({ estado: nuevoEstado }).eq('id', dbId);
      if (error) throw error;
    }
    async function updateValidacion(dbId, validacion) {
      const { error } = await sb.from('tareas').update({ estado: validacion, validacion: validacion }).eq('id', dbId);
      if (error) throw error;
    }

    window.addEventListener('DOMContentLoaded', async () => {
      const { data: { session } } = await sb.auth.getSession();
      if (session?.user) { try { await loadUserAndEnter(session.user); } catch (e) { console.log('Sesión expirada'); } }
    });

    // """"""""""""""""""""""""""""""""""""""""""""""
    // NAV
    // """"""""""""""""""""""""""""""""""""""""""""""
    const NAV_SOCIO = [
      { sec: 'Inicio', items: [{ id: 'resumen', ic: '📊', label: 'Resumen' }] },
      { sec: 'Tareas', items: [{ id: 'mis-tareas', ic: '📋', label: 'Mis tareas' }, { id: 'entregar', ic: '📤', label: 'Entregar tarea' }, { id: 'entregadas', ic: '📁', label: 'Tareas entregadas' }] },
      { sec: 'Asistencia', items: [{ id: 'asistencia', ic: '📅', label: 'Mi asistencia' }] },
    ];
    const NAV_LIDER = [
      { sec: 'Inicio', items: [{ id: 'resumen', ic: '📊', label: 'Resumen' }] },
      { sec: 'Tareas', items: [{ id: 'mis-tareas', ic: '📋', label: 'Tareas comisión' }, { id: 'validar', ic: '✅', label: 'Validar entregas' }, { id: 'entregadas', ic: '📁', label: 'Tareas entregadas' }] },
      { sec: 'Asistencia', items: [{ id: 'asistencia', ic: '📅', label: 'Asistencia' }] },
      { sec: 'Actas', items: [{ id: 'subir', ic: '📤', label: 'Subir acta' }] },
    ];
    const NAV_DIR = [
      { sec: 'Inicio', items: [{ id: 'dir-resumen', ic: '📊', label: 'Resumen global' }] },
      { sec: 'Tareas', items: [{ id: 'dir-tareas', ic: '📋', label: 'Base de tareas' }, { id: 'dir-validar', ic: '✅', label: 'Por validar' }, { id: 'dir-entregadas', ic: '📁', label: 'Tareas entregadas' }] },
      { sec: 'Asistencia', items: [{ id: 'dir-asistencia', ic: '📅', label: 'Base asistencia' }] },
      { sec: 'Análisis', items: [{ id: 'dir-socio', ic: '👤', label: 'Productividad socio' }, { id: 'dir-limites', ic: '⚠️', label: 'Límites Supabase' }] },
      { sec: 'Directorio', items: [{ id: 'dir-directorio', ic: '👥', label: 'Listado por Comisión' }] },
      { sec: 'Admin', items: [{ id: 'dir-admin', ic: '⚙️', label: 'Gestión y Accesos' }] },
    ];
    function buildNav() {
      const map = { socio: NAV_SOCIO, lider: NAV_LIDER, directiva: NAV_DIR };
      const nav = map[CU.rol];
      let html = '';
      nav.forEach(g => {
        html += `<div class="nav-sec">${g.sec}</div>`;
        g.items.forEach(i => { html += `<button class="nav-item" id="nav-${i.id}" onclick="goPage('${i.id}')"><span class="ic">${i.ic}</span>${i.label}</button>`; });
      });
      document.getElementById('sidebar-nav').innerHTML = html;
    }

    const PAGE_META = {
      'resumen': { title: 'Resumen', sub: 'Vista general de tu actividad' },
      'mis-tareas': { title: 'Mis tareas', sub: 'Todas las tareas asignadas a ti' },
      'entregar': { title: 'Entregar tarea', sub: 'Selecciona tu tarea y sube tu evidencia' },
      'entregadas': { title: 'Tareas entregadas', sub: 'Historial de tus entregas con evidencia' },
      'asistencia': { title: 'Mi asistencia', sub: 'Historial de asistencia a reuniones' },
      'validar': { title: 'Validar entregas', sub: 'Tareas en revisión de tu comisión' },
      'subir': { title: 'Subir acta', sub: 'Carga los archivos de la reunión' },
      'dir-resumen': { title: 'Resumen global', sub: 'Indicadores de todas las comisiones' },
      'dir-tareas': { title: 'Base de tareas', sub: 'Todas las tareas de la organización' },
      'dir-validar': { title: 'Revisión de tareas', sub: 'Aprobadas, rechazadas y por validar' },
      'dir-entregadas': { title: 'Tareas entregadas', sub: 'Material de evidencia por comisión y socio' },
      'dir-asistencia': { title: 'Base de asistencia', sub: 'Registro completo de asistencia' },
      'dir-socio': { title: 'Productividad por socio', sub: 'Rendimiento individual de tareas y asistencia' },
      'dir-limites': { title: 'Límites del Servidor', sub: 'Control y cuotas del nivel gratuito en Supabase' },
      'dir-directorio': { title: 'Directorio de Socios', sub: 'Lista de integración por comisión' },
      'dir-admin': { title: 'Gestión y Accesos', sub: 'Administración de personal y comisiones' },
    };

    let currentPage = '';
    async function goPage(id) {
      currentPage = id;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      const nb = document.getElementById('nav-' + id);
      if (nb) nb.classList.add('active');
      const m = PAGE_META[id] || { title: id, sub: '' };
      document.getElementById('page-title').textContent = m.title;
      document.getElementById('page-sub').textContent = m.sub;
      const ca = document.getElementById('content-area');
      const renders = {
        'resumen': CU.rol === 'lider' ? renderLiderResumen : renderSocioResumen,
        'mis-tareas': CU.rol === 'lider' ? renderLiderTareas : renderSocioTareas,
        'entregar': renderEntregar,
        'entregadas': CU.rol === 'lider' ? renderEntregadas_lider : renderEntregadas,
        'asistencia': CU.rol === 'lider' ? renderLiderAsistencia : renderSocioAsistencia,
        'validar': renderValidar,
        'subir': renderSubir,
        'dir-resumen': renderDirResumen,
        'dir-tareas': renderDirTareas,
        'dir-validar': renderDirValidar,
        'dir-entregadas': renderDirEntregadas,
        'dir-asistencia': renderDirAsistencia,
        'dir-socio': renderDirSocio,
        'dir-limites': renderDirLimites,
        'dir-directorio': renderDirDirectorio,
        'dir-admin': renderDirAdmin,
      };
      ca.innerHTML = '';
      if (renders[id]) await renders[id](ca);
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // HELPERS
    // """"""""""""""""""""""""""""""""""""""""""""""
    function estadoBadge(e) { const cls = { Pendiente: 'pendiente', 'En revisión': 'revision', Aprobada: 'aprobada', Rechazada: 'rechazada' }[e] || 'pendiente'; return `<span class="badge ${cls}">${e}</span>` }
    function priorBadge(p) { const cls = { Alta: 'alta', Media: 'media', Baja: 'baja' }[p] || ''; return `<span class="badge ${cls}">${p}</span>` }
    function asistBadge(a) { const m = { Presente: '● Presente', Ausente: '✗ Ausente', 'Con Permiso': '● Con Permiso' }; const c = { Presente: 'presente', Ausente: 'ausente', 'Con Permiso': 'permiso' }; return `<span class="badge ${c[a] || 'ausente'}">${m[a] || a}</span>` }
    function shortName(n) { const p = n.split(' '); return p[0] + ' ' + p[2] }
    function sumaMinutos(lista) {
      return lista.filter(a => a.tiempo && a.tiempo !== '-').reduce((s, a) => {
        const val = parseInt(a.tiempo);
        if (!isNaN(val)) return s + val;
        if (typeof a.tiempo === 'string' && a.tiempo.includes(':')) {
          const [h, m, sec] = a.tiempo.split(':').map(Number);
          return s + (h * 60 + m + Math.round((sec||0) / 60));
        }
        return s;
      }, 0);
    }
    function minToHM(min) { return `${Math.floor(min / 60)}h ${min % 60}min` }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // SOCIO — RESUMEN
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderSocioResumen(ca) {
      const coms = CU.comisiones;
      let tabsHtml = '';
      if (coms.length > 1) {
        tabsHtml = '<div class="com-tabs" style="margin-top:16px;margin-bottom:16px">' + coms.map(c => `<button class="com-tab${c === activeCom ? ' active' : ''}" onclick="switchCom('${c}')">${c}</button>`).join('') + '</div>';
      }

      // GLOBAL KPIs
      const allTareas = tareasData.filter(t => t.responsable === CU.filtro);
      const allAsist = asistData.filter(a => a.socio === CU.filtro);
      
      const gTareasTotales = allTareas.length;
      const gAprobadas = allTareas.filter(t => t.estado === 'Aprobada').length;
      
      const allMyComs = [...new Set(allTareas.map(t => t.comision))].filter(cc => ACTIVE_COM_NAMES.includes(cc));
      const comProd = allMyComs.map(cc => {
        const ct = allTareas.filter(t => t.comision === cc);
        const done = ct.filter(t => t.estado === 'Aprobada').length;
        const pctT = ct.length ? Math.round(done / ct.length * 100) : 0;
        const ca2 = allAsist.filter(a => a.comision === cc);
        const pctA = ca2.length ? Math.round(ca2.filter(a => a.asistencia === 'Presente').length / ca2.length * 100) : 0;
        return Math.round((pctT + pctA) / 2);
      });
      const gProductividad = comProd.length ? Math.round(comProd.reduce((a,b)=>a+b,0) / comProd.length) : 0;

      // SPECIFIC COMISSION KPIs
      const tareas = allTareas.filter(t => t.comision === activeCom);
      const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;
      const revision = tareas.filter(t => t.estado === 'En revisión').length;
      const aprobadas = tareas.filter(t => t.estado === 'Aprobada').length;
      const rechazadas = tareas.filter(t => t.estado === 'Rechazada').length;
      
      const miAsist = allAsist.filter(a => a.comision === activeCom);
      const pctAsist = miAsist.length ? Math.round(miAsist.filter(a => a.asistencia === 'Presente').length / miAsist.length * 100) : 0;
      
      const pctTareas = tareas.length ? Math.round(aprobadas / tareas.length * 100) : 0;
      const cProductividad = Math.round((pctTareas + pctAsist) / 2);

      ca.innerHTML = `
  <!-- GLOBAL KPIs -->
  <div style="background:linear-gradient(135deg,#1e293b,#334155);border-radius:var(--r);padding:24px;margin-bottom:20px;text-align:center;color:#fff;display:flex;justify-content:space-around;flex-wrap:wrap;gap:16px">
    <div>
      <p style="font-size:12px;opacity:0.7;margin:0 0 4px">TAREAS TOTALES</p>
      <p style="font-size:32px;font-weight:800;color:#cbd5e1;margin:0">${gTareasTotales}</p>
    </div>
    <div>
      <p style="font-size:12px;opacity:0.7;margin:0 0 4px">APROBADAS</p>
      <p style="font-size:32px;font-weight:800;color:var(--green);margin:0">${gAprobadas}</p>
    </div>
    <div>
      <p style="font-size:12px;opacity:0.7;margin:0 0 4px">PRODUCTIVIDAD TOTAL</p>
      <p style="font-size:32px;font-weight:800;color:var(--orange);margin:0">${gProductividad}%</p>
    </div>
  </div>

  <!-- TABS FILTER -->
  ${tabsHtml}

  <!-- COMISSION KPIs -->
  <div class="kpi-grid">
    <div class="kpi-card orange"><div class="kpi-lbl">Mis tareas</div><div class="kpi-val">${tareas.length}</div><div class="kpi-sub">En ${activeCom}</div></div>
    <div class="kpi-card" style="background:#f1f5f9"><div class="kpi-lbl">Pendientes</div><div class="kpi-val" style="color:var(--gdark)">${pendientes}</div><div class="kpi-sub">Sin entregar</div></div>
    <div class="kpi-card blue" style="background:var(--blue-l)"><div class="kpi-lbl">En revisión</div><div class="kpi-val" style="color:var(--blue)">${revision}</div><div class="kpi-sub">Esperando validación</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Aprobadas</div><div class="kpi-val">${aprobadas}</div><div class="kpi-sub">Validadas ok</div></div>
    <div class="kpi-card red"><div class="kpi-lbl">Rechazadas</div><div class="kpi-val">${rechazadas}</div><div class="kpi-sub">A corregir</div></div>
    <div class="kpi-card blue"><div class="kpi-lbl">Mi asistencia</div><div class="kpi-val">${pctAsist}%</div><div class="kpi-sub">${miAsist.filter(a => a.asistencia === 'Presente').length} presentes</div></div>
  </div>
  
  <div style="margin-top:16px;background:#fff;border-radius:14px;padding:24px;border:2px solid ${cProductividad >= 80 ? 'var(--green)' : cProductividad >= 50 ? 'var(--orange)' : 'var(--red)'};text-align:center">
    <p style="font-size:14px;font-weight:700;color:var(--gdark);margin:0 0 8px">PRODUCTIVIDAD EN ${activeCom.toUpperCase()}</p>
    <p style="font-size:42px;font-weight:800;color:${cProductividad >= 80 ? 'var(--green)' : cProductividad >= 50 ? 'var(--orange)' : 'var(--red)'};margin:0">${cProductividad}%</p>
  </div>
  `;
    }

    function switchCom(c) { activeCom = c; goPage(currentPage) }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // SOCIO — MIS TAREAS
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderSocioTareas(ca) {
      let tareas = tareasData.filter(t => t.responsable === CU.filtro);
      const coms = [...new Set(tareas.map(t => t.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="f-com-socio" onchange="applyFilters('socio')">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="f-est-socio" onchange="applyFilters('socio')">
      <option value="">Todos</option><option>Pendiente</option><option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
    <span class="filter-label">Desde:</span>
    <input type="date" class="finput" id="f-desde-socio" onchange="applyFilters('socio')">
    <span class="filter-label">Hasta:</span>
    <input type="date" class="finput" id="f-hasta-socio" onchange="applyFilters('socio')">
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3 id="st-title">Mis tareas</h3><p id="st-sub">${tareas.length} tareas asignadas</p></div></div>
    <table><thead><tr><th>ID</th><th>Comisión</th><th>Descripción</th><th>Fecha límite</th><th>Prioridad</th><th>Estado</th></tr></thead>
    <tbody id="socio-tareas-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyFilters('socio'); }, 0);
    }
    function renderTareasRows(list) {
      if (!list.length) return `<tr><td colspan="6" style="text-align:center;color:var(--gmid);padding:20px">Sin resultados</td></tr>`;
      return list.map(t => `<tr><td style="font-size:11px;color:var(--gmid)">${t.id}</td><td>${t.comision}</td><td>${t.desc}</td><td>${t.fecha}</td><td>${priorBadge(t.prioridad)}</td><td>${estadoBadge(t.estado)}</td></tr>`).join('');
    }
    function applyFilters(rol) {
      if (rol === 'socio') {
        let t = tareasData.filter(x => x.responsable === CU.filtro);
        const com = document.getElementById('f-com-socio')?.value;
        const est = document.getElementById('f-est-socio')?.value;
        const desde = document.getElementById('f-desde-socio')?.value;
        const hasta = document.getElementById('f-hasta-socio')?.value;
        if (com) t = t.filter(x => x.comision === com);
        if (est) t = t.filter(x => x.estado === est);
        if (desde) t = t.filter(x => x.fecha >= desde);
        if (hasta) t = t.filter(x => x.fecha <= hasta);
        applyGenericPagination('socio-tareas-tbody', t, 'renderTareasRows', 'st-sub', '{count} tareas encontradas');
        
      }
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // SOCIO — ASISTENCIA
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderSocioAsistencia(ca) {
      const miAsist = asistData.filter(a => a.socio === CU.filtro);
      const socios = [...new Set(miAsist.map(a => a.socio))].sort();
      const coms = [...new Set(miAsist.map(a => a.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fa-com" onchange="applyAsistFilters()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Desde:</span>
    <input type="date" class="finput" id="fa-desde" onchange="applyAsistFilters()">
    <span class="filter-label">Hasta:</span>
    <input type="date" class="finput" id="fa-hasta" onchange="applyAsistFilters()">
    <button class="btn" onclick="clearAsistFiltros('socio')" style="font-size:12px;padding:7px 12px">🔄 Limpiar</button>
  </div>
  <div id="tiempo-total-socio"></div>
  <div class="sc">
    <div class="sc-head"><div><h3>Mi historial de asistencia</h3><p id="sa-sub">Todas las reuniones del año</p></div></div>
    <table><thead><tr><th>Fecha reunión</th><th>Comisión</th><th>Asistencia</th><th>Hora ingreso</th><th>Tiempo en llamada</th></tr></thead>
    <tbody id="socio-asist-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyAsistFilters(); }, 0);
      updateTiempoTotal(miAsist);
      
    }
    function renderAsistRows(list) {
      if (!list.length) return `<tr><td colspan="5" style="text-align:center;color:var(--gmid);padding:20px">Sin registros</td></tr>`;
      return list.map(a => `<tr><td>${a.fecha}</td><td>${a.comision}</td><td>${asistBadge(a.asistencia)}</td><td>${a.hora}</td><td>${a.tiempo}</td></tr>`).join('');
    }
    function updateTiempoTotal(list) {
      const min = sumaMinutos(list);
      const el = document.getElementById('tiempo-total-socio');
      if (el) el.innerHTML = `<div class="tiempo-total">⏱ Tiempo total en reuniones: <strong>${minToHM(min)}</strong></div>`;
    }
    function clearAsistFiltros(rol) {
      if (rol === 'socio') {
        const ids = ['fa-com', 'fa-desde', 'fa-hasta'];
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        applyAsistFilters();
      } else if (rol === 'lider') {
        const ids = ['fla-socio', 'fla-desde', 'fla-hasta'];
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        applyLiderAsist();
      } else {
        const ids = ['fda-com', 'fda-desde', 'fda-hasta'];
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        applyDirAsist();
      }
    }
    function applyAsistFilters() {
      let list = asistData.filter(a => a.socio === CU.filtro);
      const com = document.getElementById('fa-com')?.value;
      const desde = document.getElementById('fa-desde')?.value;
      const hasta = document.getElementById('fa-hasta')?.value;
      if (com) list = list.filter(a => a.comision === com);
      if (desde) list = list.filter(a => a.fecha >= desde);
      if (hasta) list = list.filter(a => a.fecha <= hasta);
      applyGenericPagination('socio-asist-tbody', list, 'renderAsistRows', 'sa-sub', '{count} registros');
      
      updateTiempoTotal(list);
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // SOCIO — ENTREGA❌ TAREA
    // """"""""""""""""""""""""""""""""""""""""""""""
    async function renderEntregar(ca) {
      ca.innerHTML = `<div style="padding:40px;text-align:center;color:var(--gmid)">Cargando tus tareas pendientes...</div>`;

      // Cargar tareas pendientes del socio desde Supabase
      const { data: pendientes, error } = await sb.from('tareas')
        .select('id, tarea_codigo, descripcion, fecha_limite, prioridad, comisiones(nombre)')
        .eq('responsable_id', CU.id)
        .eq('estado', 'Pendiente')
        .order('fecha_limite', { ascending: true });

      if (error) { ca.innerHTML = `<div class="notif error">Error cargando tareas: ${error.message}</div>`; return; }

      const opciones = (pendientes || []).map(t =>
        `<option value="${t.id}" data-desc="${t.descripcion.replace(/"/g, '&quot;')}" data-fecha="${t.fecha_limite}" data-prior="${t.prioridad}" data-com="${t.comisiones?.nombre || ''}" data-cod="${t.tarea_codigo}">
      [${t.tarea_codigo}] ${t.descripcion.substring(0, 60)}${t.descripcion.length > 60 ? '...' : ''}
    </option>`
      ).join('');

      ca.innerHTML = `
  <div id="notif-entrega"></div>
  <div class="sc" style="max-width:680px">
    <div class="sc-head"><div><h3>Entregar tarea</h3><p>Selecciona la tarea y adjunta tu evidencia</p></div></div>
    <div style="padding:22px 24px">

      <div class="fg" style="margin-bottom:18px">
        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:6px;color:var(--gdark)">Selecciona tu tarea pendiente</label>
        ${!pendientes || !pendientes.length
          ? `<div class="notif success">✅ No tienes tareas pendientes en este momento. ¡Buen trabajo!</div>`
          : `<select class="fsel" id="sel-tarea" onchange="onSelectTarea()" style="width:100%;padding:11px 14px;font-size:13.5px">
              <option value="">— Elige una tarea —</option>
              ${opciones}
            </select>`
        }
      </div>

      <div id="tarea-detalle" style="display:none;margin-bottom:18px;padding:14px 16px;background:var(--orange-l);border-radius:var(--rs);border-left:4px solid var(--orange)">
        <div style="font-size:12px;color:var(--orange-d);font-weight:600;margin-bottom:4px" id="det-codigo"></div>
        <div style="font-size:14px;font-weight:500;color:#1a1a2e;margin-bottom:8px" id="det-desc"></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <span style="font-size:12px;color:var(--gmid)">📅 Fecha límite: <strong id="det-fecha"></strong></span>
          <span style="font-size:12px;color:var(--gmid)">🏢 Comisión: <strong id="det-com"></strong></span>
          <span id="det-prior-wrap" style="font-size:12px"></span>
        </div>
      </div>

      <div id="form-entrega" style="display:none">
        <!-- TABS: archivo o link -->
        <div style="display:flex;gap:0;margin-bottom:16px;border:1.5px solid var(--bdr);border-radius:var(--rs);overflow:hidden">
          <button id="tab-archivo" onclick="switchEvidTab('archivo')" style="flex:1;padding:10px;border:none;background:var(--orange);color:#fff;font-family:var(--fb);font-size:13px;font-weight:600;cursor:pointer">📄 Subir archivo</button>
          <button id="tab-link" onclick="switchEvidTab('link')" style="flex:1;padding:10px;border:none;background:#fff;color:var(--gmid);font-family:var(--fb);font-size:13px;font-weight:500;cursor:pointer">🔗 Pegar link</button>
        </div>

        <!-- PANEL: subir archivo -->
        <div id="panel-archivo">
          <div style="border:2px dashed var(--bdr);border-radius:var(--rs);padding:24px;text-align:center;cursor:pointer;transition:all .2s;background:#fff" id="drop-zone" onclick="document.getElementById('inp-archivo').click()" ondragover="event.preventDefault();this.style.borderColor='var(--orange)'" ondragleave="this.style.borderColor='var(--bdr)'" ondrop="handleDrop(event)">
            <div style="font-size:32px;margin-bottom:8px">📄</div>
            <p style="font-size:13.5px;font-weight:500;color:#1a1a2e;margin-bottom:4px">Haz clic o arrastra tu archivo aquí</p>
            <p style="font-size:12px;color:var(--gmid)">PDF, Excel, Word, imagen — máximo 5MB</p>
            <input type="file" id="inp-archivo" accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png,.gif" style="display:none" onchange="handleArchivoSelect(event)">
          </div>
          <div id="archivo-preview" style="display:none;margin-top:10px;padding:10px 14px;background:var(--green-l);border-radius:var(--rs);border-left:3px solid var(--green);align-items:center;gap:10px">
            <span id="archivo-icon" style="font-size:20px"></span>
            <div style="flex:1">
              <div id="archivo-nombre" style="font-size:13px;font-weight:500;color:#1a1a2e"></div>
              <div id="archivo-size" style="font-size:12px;color:var(--gmid)"></div>
            </div>
            <button onclick="clearArchivo()" style="border:none;background:none;cursor:pointer;color:var(--gmid);font-size:16px">🔄</button>
          </div>
          <div id="archivo-error" style="display:none;margin-top:8px;padding:8px 12px;background:var(--red-l);border-radius:var(--rs);font-size:12.5px;color:var(--red)"></div>
        </div>

        <!-- PANEL: pegar link -->
        <div id="panel-link" style="display:none">
          <input type="url" id="inp-evidencia" class="finput" style="width:100%;padding:11px 14px;font-size:13.5px" placeholder="https://drive.google.com/... o https://www.canva.com/...">
          <p style="font-size:12px;color:var(--gmid);margin-top:5px">Pega el link de Drive, Canva, YouTube, o cualquier URL pública</p>
          <div id="link-preview" style="display:none;margin-top:8px"></div>
        </div>


        <button class="btn-primary" id="btn-entregar" onclick="entregarTarea()" style="width:auto;padding:12px 28px">
          Enviar entrega 📤
        </button>
      </div>

    </div>
  </div>

  <div class="sc" style="max-width:680px;margin-top:16px">
    <div class="sc-head"><div><h3>Mis entregas recientes</h3><p>Tareas que ya enviaste</p></div></div>
    <table><thead><tr><th>Tarea</th><th>Descripción</th><th>Fecha entrega</th><th>Estado</th></tr></thead>
    <tbody>${renderEntregasRecientes()}</tbody></table>
  </div>`;
    }

    function renderEntregasRecientes() {
      const entregadas = tareasData.filter(t =>
        t.responsable === CU.filtro &&
        ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado)
      ).slice(0, 5);
      if (!entregadas.length) return `<tr><td colspan="4" style="text-align:center;color:var(--gmid);padding:16px">Sin entregas aún</td></tr>`;
      return entregadas.map(t => `
    <tr>
      <td style="font-size:11.5px;color:var(--gmid)">${t.id}</td>
      <td style="font-size:13px">${t.desc}</td>
      <td style="font-size:12px">${t.entrega || '—'}</td>
      <td>${estadoBadge(t.estado)}</td>
    </tr>`).join('');
    }

    function onSelectTarea() {
      const sel = document.getElementById('sel-tarea');
      const opt = sel.options[sel.selectedIndex];
      const detalle = document.getElementById('tarea-detalle');
      const form = document.getElementById('form-entrega');
      if (!sel.value) { detalle.style.display = 'none'; form.style.display = 'none'; return; }

      document.getElementById('det-codigo').textContent = opt.dataset.cod;
      document.getElementById('det-desc').textContent = opt.dataset.desc;
      document.getElementById('det-fecha').textContent = opt.dataset.fecha;
      document.getElementById('det-com').textContent = opt.dataset.com;
      const prior = opt.dataset.prior;
      const cls = { Alta: 'alta', Media: 'media', Baja: 'baja' }[prior] || '';
      document.getElementById('det-prior-wrap').innerHTML = `<span class="badge ${cls}">${prior}</span>`;
      detalle.style.display = 'block';
      form.style.display = 'block';
    }

    // —— EVIDENCIA: tabs, archivo, link ——————————————————————————————————
    let archivoSeleccionado = null;
    const TIPOS_ICONO = {
      'pdf': '📄', 'xlsx': '📊', 'xls': '📊', 'docx': '📝', 'doc': '📝',
      'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️'
    };

    function switchEvidTab(tab) {
      const esArchivo = tab === 'archivo';
      document.getElementById('panel-archivo').style.display = esArchivo ? 'block' : 'none';
      document.getElementById('panel-link').style.display = esArchivo ? 'none' : 'block';
      document.getElementById('tab-archivo').style.background = esArchivo ? 'var(--orange)' : '#fff';
      document.getElementById('tab-archivo').style.color = esArchivo ? '#fff' : 'var(--gmid)';
      document.getElementById('tab-link').style.background = esArchivo ? '#fff' : 'var(--orange)';
      document.getElementById('tab-link').style.color = esArchivo ? 'var(--gmid)' : '#fff';
    }

    function handleDrop(event) {
      event.preventDefault();
      document.getElementById('drop-zone').style.borderColor = 'var(--bdr)';
      const file = event.dataTransfer.files[0];
      if (file) procesarArchivo(file);
    }

    function handleArchivoSelect(event) {
      const file = event.target.files[0];
      if (file) procesarArchivo(file);
    }

    function procesarArchivo(file) {
      const errEl = document.getElementById('archivo-error');
      const ext = file.name.split('.').pop().toLowerCase();
      const permitidos = ['pdf', 'xlsx', 'xls', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif'];
      errEl.style.display = 'none';

      if (!permitidos.includes(ext)) {
        errEl.style.display = 'block';
        errEl.textContent = `Tipo de archivo no permitido. Solo: PDF, Excel, Word, imágenes.`;
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        errEl.style.display = 'block';
        errEl.textContent = `El archivo pesa ${(file.size / 1024 / 1024).toFixed(1)}MB. El máximo es 5MB. Usa la opción de link para archivos más grandes.`;
        return;
      }
      archivoSeleccionado = file;
      const preview = document.getElementById('archivo-preview');
      preview.style.display = 'flex';
      document.getElementById('archivo-icon').textContent = TIPOS_ICONO[ext] || '📄';
      document.getElementById('archivo-nombre').textContent = file.name;
      document.getElementById('archivo-size').textContent = `${(file.size / 1024).toFixed(0)} KB`;
    }

    function clearArchivo() {
      archivoSeleccionado = null;
      document.getElementById('archivo-preview').style.display = 'none';
      document.getElementById('inp-archivo').value = '';
    }

    async function entregarTarea() {
      const sel = document.getElementById('sel-tarea');
      const dbId = sel.value;
      const notif = document.getElementById('notif-entrega');
      const esArchivo = document.getElementById('panel-archivo').style.display !== 'none';
      const linkVal = document.getElementById('inp-evidencia')?.value.trim() || '';

      if (!dbId) { notif.innerHTML = `<div class="notif warn">Selecciona una tarea primero.</div>`; return; }

      // Validar evidencia según el tab activo
      if (esArchivo && !archivoSeleccionado) {
        notif.innerHTML = `<div class="notif warn">Selecciona un archivo o cambia a la opción de link.</div>`; return;
      }
      if (!esArchivo && !linkVal) {
        notif.innerHTML = `<div class="notif warn">El link de evidencia es obligatorio.</div>`; return;
      }
      if (!esArchivo && !linkVal.startsWith('http')) {
        notif.innerHTML = `<div class="notif warn">El link debe comenzar con http:// o https://</div>`; return;
      }

      setBtnLoading('btn-entregar', true, 'Enviando...');
      try {
        let evidenciaUrl = linkVal;

        // Si es archivo, subirlo a Supabase Storage
        if (esArchivo && archivoSeleccionado) {
          const ext = archivoSeleccionado.name.split('.').pop().toLowerCase();
          const path = `${CU.id}/${dbId}_${Date.now()}.${ext}`;
          const { data: upData, error: upErr } = await sb.storage
            .from('evidencias')
            .upload(path, archivoSeleccionado, { upsert: true });
          if (upErr) throw upErr;

          const { data: urlData } = sb.storage.from('evidencias').getPublicUrl(upData.path);
          evidenciaUrl = urlData.publicUrl;
        }

        const hoy = new Date().toISOString().split('T')[0];
        const { error } = await sb.from('tareas').update({
          estado: 'En revisión',
          evidencia_url: evidenciaUrl,
          fecha_entrega: hoy,
        }).eq('id', dbId);
        if (error) throw error;

        await loadTareas();
        notif.innerHTML = `<div class="notif success">✅ Entrega registrada correctamente. Tu líder la revisará pronto.</div>`;

        // Limpiar todo
        sel.value = '';
        document.getElementById('tarea-detalle').style.display = 'none';
        document.getElementById('form-entrega').style.display = 'none';
        document.getElementById('inp-evidencia').value = '';
        
        clearArchivo();
        switchEvidTab('archivo');

        const opt = document.querySelector(`#sel-tarea option[value="${dbId}"]`);
        if (opt) opt.remove();

      } catch (e) {
        notif.innerHTML = `<div class="notif error">❌ Error: ${e.message}</div>`;
      } finally {
        setBtnLoading('btn-entregar', false, 'Enviar entrega 📤');
      }
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // LÍDER — RESUMEN
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderLiderResumen(ca) {
      const com = CU.comisiones[0];
      const tareas = tareasData.filter(t => t.comision === com);
      const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;
      const revision = tareas.filter(t => t.estado === 'En revisión').length;
      const aprobadas = tareas.filter(t => t.estado === 'Aprobada').length;
      const asist = asistData.filter(a => a.comision === com);
      const reuniones = [...new Set(asist.map(a => a.fecha))];
      const pct = asist.length ? Math.round(asist.filter(a => a.asistencia === 'Presente').length / asist.length * 100) : 0;
      // Top 3 socios productivos
      const socioNames = [...new Set(tareas.map(t => t.responsable))];
      const socioStats = socioNames.map(name => {
        const st = tareas.filter(t => t.responsable === name);
        const done = st.filter(t => t.estado === 'Aprobada').length;
        const pctDone = st.length ? Math.round(done / st.length * 100) : 0;
        const sa = asist.filter(a => a.socio === name);
        const pctAsist = sa.length ? Math.round(sa.filter(a => a.asistencia === 'Presente').length / sa.length * 100) : 0;
        const score = Math.round((pctDone + pctAsist) / 2);
        return { name: shortName(name), tareas: st.length, done, pctDone, pctAsist, score };
      }).sort((a, b) => b.score - a.score).slice(0, 3);
      const medals = ['🥇', '🥈', '🥉'];

      const rechazadas = tareas.filter(t => t.estado === 'Rechazada').length;
      const promedioProd = socioStats.length ? Math.round(socioStats.reduce((acc, s) => acc + s.score, 0) / socioStats.length) : 0;

      ca.innerHTML = `
  <div class="kpi-grid">
    <div class="kpi-card orange"><div class="kpi-lbl">Total tareas</div><div class="kpi-val">${tareas.length}</div><div class="kpi-sub">Comisión ${com}</div></div>
    <div class="kpi-card blue" style="background:var(--blue-l)"><div class="kpi-lbl">En revisión</div><div class="kpi-val" style="color:var(--blue)">${revision}</div><div class="kpi-sub">Esperando validación</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Aprobadas</div><div class="kpi-val">${aprobadas}</div><div class="kpi-sub">Validadas ok</div></div>
    <div class="kpi-card red"><div class="kpi-lbl">Rechazadas</div><div class="kpi-val">${rechazadas}</div><div class="kpi-sub">A corregir</div></div>
    <div class="kpi-card" style="background:#f1f5f9"><div class="kpi-lbl">Pendientes</div><div class="kpi-val" style="color:var(--gdark)">${pendientes}</div><div class="kpi-sub">Sin entregar</div></div>
    <div class="kpi-card" style="background:linear-gradient(135deg,#1e293b,#334155)"><div class="kpi-lbl" style="color:#cbd5e1">Productividad Promedio</div><div class="kpi-val" style="color:#fff">${promedioProd}%</div><div class="kpi-sub" style="color:#94a3b8">Score general</div></div>
  </div>`;

      ca.innerHTML += `
  <div class="sc">
    <div class="sc-head"><div><h3>🏆 Top 3 Socios más productivos</h3><p>Basado en tareas aprobadas y asistencia de ${com}</p></div></div>
    <div style="padding:16px 20px;display:flex;gap:16px;flex-wrap:wrap">
      ${socioStats.map((s, i) => `
        <div style="flex:1;min-width:200px;background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-radius:14px;padding:20px;border:1px solid #e2e8f0;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${medals[i]}</div>
          <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:6px">${s.name}</div>
          <div style="font-size:13px;color:var(--gmid);margin-bottom:10px">${s.done}/${s.tareas} tareas aprobadas</div>
          <div style="display:flex;gap:12px;justify-content:center">
            <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:var(--green)">${s.pctDone}%</div><div style="font-size:11px;color:var(--gmid)">Tareas</div></div>
            <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:var(--blue)">${s.pctAsist}%</div><div style="font-size:11px;color:var(--gmid)">Asistencia</div></div>
            <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:var(--orange)">${s.score}%</div><div style="font-size:11px;color:var(--gmid)">Score</div></div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // LÍDER — TAREAS COMISIN
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderLiderTareas(ca) {
      const com = CU.comisiones[0];
      let tareas = tareasData.filter(t => t.comision === com);
      const responsables = [...new Set(tareas.map(t => shortName(t.responsable)))].sort();
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Responsable:</span>
    <select class="fsel" id="fl-resp" onchange="applyLiderFilters()">
      <option value="">Todos</option>${responsables.map(r => `<option>${r}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fl-est" onchange="applyLiderFilters()">
      <option value="">Todos</option><option>Pendiente</option><option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
    <span class="filter-label">Prioridad:</span>
    <select class="fsel" id="fl-prior" onchange="applyLiderFilters()">
      <option value="">Todas</option><option>Alta</option><option>Media</option><option>Baja</option>
    </select>
    <span class="filter-label">Desde:</span>
    <input type="date" class="finput" id="fl-desde" onchange="applyLiderFilters()">
    <span class="filter-label">Hasta:</span>
    <input type="date" class="finput" id="fl-hasta" onchange="applyLiderFilters()">
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Tareas — ${com}</h3><p id="lt-sub">${tareas.length} tareas registradas</p></div></div>
    <table><thead><tr><th>ID</th><th>Responsable</th><th>Descripción</th><th>Fecha límite</th><th>Prioridad</th><th>Estado</th><th>Acción</th></tr></thead>
    <tbody id="lider-tareas-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyLiderFilters(); }, 0);
    }
    function renderLiderTareasRows(list) {
      if (!list.length) return `<tr><td colspan="7" style="text-align:center;color:var(--gmid);padding:20px">Sin resultados</td></tr>`;
      return list.map((t, i) => {
        const idx = tareasData.findIndex(x => x.id === t.id);
        const locked = (t.estado === 'Aprobada' || t.estado === 'Rechazada');
        const actionCol = locked
          ? '<span style="font-size:11px;color:var(--green);font-weight:600">✅ Finalizado</span>'
          : `<select class="fsel" style="font-size:11.5px;padding:4px 8px" onchange="promptEstado(${idx}, this.value, this)"><option value="">Validar...</option><option>Aprobada</option><option>Rechazada</option></select>`;
        return `<tr>
      <td style="font-size:11px;color:var(--gmid)">${t.id}</td>
      <td>${shortName(t.responsable)}</td>
      <td>${t.desc}</td>
      <td>${t.fecha}</td>
      <td>${priorBadge(t.prioridad)}</td>
      <td id="est-${idx}">${estadoBadge(t.estado)}</td>
      <td>${actionCol}</td>
    </tr>`;
      }).join('');
    }
    function applyLiderFilters() {
      const com = CU.comisiones[0];
      let t = tareasData.filter(x => x.comision === com);
      const resp = document.getElementById('fl-resp')?.value;
      const est = document.getElementById('fl-est')?.value;
      const prior = document.getElementById('fl-prior')?.value;
      const desde = document.getElementById('fl-desde')?.value;
      const hasta = document.getElementById('fl-hasta')?.value;
      if (resp) t = t.filter(x => shortName(x.responsable) === resp);
      if (est) t = t.filter(x => x.estado === est);
      if (prior) t = t.filter(x => x.prioridad === prior);
      if (desde) t = t.filter(x => x.fecha >= desde);
      if (hasta) t = t.filter(x => x.fecha <= hasta);
      applyGenericPagination('lider-tareas-tbody', t, 'renderLiderTareasRows', 'lt-sub', '{count} tareas encontradas');
          }

    // """""""""""""""""""""""""""""""""""""""""
    // MODAL CAMBIO ESTADO
    // """"""""""""""""""""""""""""""""""""""""""""

    // """"""""""""""""""""""""""""""""""""""""""""
    // LIDE❌ - ASISTENCIA
    // """"""""""""""""""""""""""""""""""""""""""""
    function renderLiderAsistencia(ca) {
      const com = CU.comisiones[0];
      const miAsist = asistData.filter(a => a.comision === com);
      const socios = [...new Set(miAsist.map(a => a.socio))].sort();
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Socio:</span>
    <select class="fsel" id="fla-socio" onchange="applyLiderAsist()">
      <option value="">Todos</option>${socios.map(s => `<option>${s}</option>`).join('')}
    </select>
    <span class="filter-label">Desde:</span>
    <input type="date" class="finput" id="fla-desde" onchange="applyLiderAsist()">
    <span class="filter-label">Hasta:</span>
    <input type="date" class="finput" id="fla-hasta" onchange="applyLiderAsist()">
    <button class="btn" onclick="clearAsistFiltros('lider')" style="font-size:12px;padding:7px 12px">Limpiar</button>
  </div>
  <div id="tiempo-total-lider"></div>
  <div class="sc">
    <div class="sc-head"><div><h3>Asistencia de ${com}</h3><p id="la-sub">${miAsist.length} registros</p></div></div>
    <table><thead><tr><th>Fecha reunion</th><th>Socio</th><th>Asistencia</th><th>Hora ingreso</th><th>Tiempo en llamada</th></tr></thead>
    <tbody id="lider-asist-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyLiderAsist(); }, 0);
      updateTiempoTotalLider(miAsist);
    }
    function renderLiderAsistRows(list) {
      if (!list.length) return '<tr><td colspan="5" style="text-align:center;color:var(--gmid);padding:20px">Sin registros de asistencia</td></tr>';
      return list.map(a => '<tr><td>' + a.fecha + '</td><td>' + a.socio + '</td><td>' + asistBadge(a.asistencia) + '</td><td>' + a.hora + '</td><td>' + a.tiempo + '</td></tr>').join('');
    }
    function updateTiempoTotalLider(list) {
      const min = sumaMinutos(list);
      const el = document.getElementById('tiempo-total-lider');
      if (el) el.innerHTML = '<div class="tiempo-total">Tiempo total en reuniones: <strong>' + minToHM(min) + '</strong></div>';
    }
    function applyLiderAsist() {
      const com = CU.comisiones[0];
      let list = asistData.filter(a => a.comision === com);
      const socio = document.getElementById('fla-socio')?.value;
      if (socio) list = list.filter(a => a.socio === socio);
      const desde = document.getElementById('fla-desde')?.value;
      const hasta = document.getElementById('fla-hasta')?.value;
      if (desde) list = list.filter(a => a.fecha >= desde);
      if (hasta) list = list.filter(a => a.fecha <= hasta);
      applyGenericPagination('lider-asist-tbody', list, 'renderLiderAsistRows', 'la-sub', '{count} registros');
            updateTiempoTotalLider(list);
    }

    let pendingIdx = -1, pendingVal = '', pendingSelect = null, pendingContext = 'estado';
    function promptEstado(idx, newVal, sel) {
      if (!newVal) return;
      pendingIdx = idx; pendingVal = newVal; pendingSelect = sel; pendingContext = 'estado';
      const t = tareasData[idx];
      document.getElementById('modal-desc').innerHTML = `¿Estás seguro de cambiar el estado de:<br><strong>"${t.desc}"</strong><br>de <strong>${t.estado}</strong> a <strong>${newVal}</strong>?`;
      document.getElementById('modal-estado').classList.add('open');
    }
    function promptValidacion(idx, newVal) {
      pendingIdx = idx; pendingVal = newVal; pendingSelect = null; pendingContext = 'validacion';
      const t = tareasData[idx];
      document.getElementById('modal-desc').innerHTML = newVal === 'Aprobada'
        ? `¿Estás seguro de <strong style="color:var(--green)">APROBAR</strong> la evidencia de:<br><strong>"${t.desc}"</strong>?<br><br><span style="color:var(--gmid);font-size:13.5px">Esta acción completará satisfactoriamente el registro del socio.</span>`
        : `¿Estás seguro de <strong style="color:var(--red)">RECHAZAR</strong> la evidencia de:<br><strong>"${t.desc}"</strong>?<br><br><span style="color:var(--gmid);font-size:13.5px">El socio deberá modificar su evidencia y volverla a subir.</span>`;
      document.getElementById('modal-estado').classList.add('open');
    }
    function closeModal() {
      document.getElementById('modal-estado').classList.remove('open');
      if (pendingSelect) { if (pendingContext === 'estado') pendingSelect.value = ''; pendingSelect = null; }
      pendingIdx = -1; pendingVal = '';
    }
    async function confirmEstado() {
      if (pendingIdx < 0) return;
      const t = tareasData[pendingIdx];
      try {
        if (pendingContext === 'validacion') {
          if (t.db_id) await updateValidacion(t.db_id, pendingVal);
          tareasData[pendingIdx].estado = pendingVal; tareasData[pendingIdx].validacion = pendingVal;
          const bdg = document.getElementById('val-' + pendingIdx);
          if (bdg) bdg.innerHTML = estadoBadge(pendingVal);
          const row = document.getElementById('vrow-' + pendingIdx);
          if (row) { row.style.opacity = '.45'; row.querySelectorAll('button').forEach(b => { b.disabled = true }); }
        } else {
          if (t.db_id) await updateEstadoTarea(t.db_id, pendingVal);
          tareasData[pendingIdx].estado = pendingVal;
          goPage('mis-tareas');
        }
        document.getElementById('modal-estado').classList.remove('open');
        pendingSelect = null;
      } catch (e) {
        alert('Error al guardar: ' + e.message);
      }
    }

    // """""""""""""""""""""""""""""""""""""""""""""
    // LÍDER — VALIDAR
    // """"""""""""""""""""""""""""""""""""""""""""
    function renderValidar(ca) {
      const com = CU.comisiones[0];
      const enRev = tareasData.filter(t => t.comision === com && t.estado === 'En revisión');
      const socios = [...new Set(enRev.map(t => shortName(t.responsable)))].sort();
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Socio:</span>
    <select class="fsel" id="fv-socio" onchange="applyValidarFilter()">
      <option value="">Todos</option>${socios.map(s => `<option>${s}</option>`).join('')}
    </select>
  </div>
  <div class="notif info">Solo se muestran tareas en estado "En revisión". Revisa la evidencia y valida.</div>
  <div class="sc">
    <div class="sc-head"><div><h3>Validar entregas — ${com}</h3><p id="vl-sub">${enRev.length} tareas por revisar</p></div></div>
    <table><thead><tr><th>Socio</th><th>Descripción</th><th>Fecha entrega</th><th>Evidencia</th><th>Validación</th><th>Acción</th></tr></thead>
    <tbody id="validar-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyValidarFilter(); }, 0);
    }
    function evidenciaBtn(url) {
      if (!url) return `<span style="color:var(--gmid);font-size:12px">Sin adjunto</span>`;
      const esSupabase = url.includes('supabase.co/storage');
      const ext = url.split('.').pop().split('?')[0].toLowerCase();
      const icono = { pdf: '📄', xlsx: '📊', xls: '📊', docx: '📝', doc: '📝', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️' }[ext] || '🔗';
      const label = esSupabase ? `${icono} Ver archivo` : `🔗 Ver link`;
      return `<a href="${url}" target="_blank" rel="noopener" style="color:var(--blue);font-size:12px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:3px">${label}</a>`;
    }

    function renderValidarRows(list) {
      if (!list.length) return `<tr><td colspan="6" style="text-align:center;color:var(--gmid);padding:20px">No hay tareas en revisión</td></tr>`;
      return list.map(t => {
        const idx = tareasData.findIndex(x => x.id === t.id);
        return `<tr id="vrow-${idx}">
      <td>${shortName(t.responsable)}</td>
      <td>${t.desc}</td>
      <td>${t.entrega || '-'}</td>
      <td>${evidenciaBtn(t.evidencia)}</td>
      <td id="val-${idx}">${t.validacion ? estadoBadge(t.validacion) : '<span style="color:var(--gmid)">Pendiente</span>'}</td>
      <td>
        <button class="btn-sm btn-aprobar" onclick="promptValidacion(${idx},'Aprobada')">✓ Aprobar</button>
        <button class="btn-sm btn-rechazar" style="margin-left:4px" onclick="promptValidacion(${idx},'Rechazada')">❌ Rechazar</button>
      </td>
    </tr>`;
      }).join('');
    }
    function applyValidarFilter() {
      const com = CU.comisiones[0];
      let enRev = tareasData.filter(t => t.comision === com && t.estado === 'En revisión');
      const socio = document.getElementById('fv-socio')?.value;
      if (socio) enRev = enRev.filter(t => shortName(t.responsable) === socio);
      applyGenericPagination('validar-tbody', enRev, 'renderValidarRows', 'lv-sub', '{count} tareas');
      document.getElementById('vl-sub').textContent = enRev.length + ' tareas por revisar';
    }

    // """""""""""""""""""""    
    async function renderSubir(ca) {
      ca.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:16px"><div class="lds-ring"><div></div><div></div><div></div><div></div></div><p style="color:var(--gmid);font-size:14px;font-weight:500">Cargando formulario de actas...</p></div>';

      const liderCom = CU.comisiones[0];
      const { data: cData } = await sb.from('comisiones').select('id').eq('nombre', liderCom).single();
      let usArr = [];
      let comID = null;
      const COM_ACRONYMS = { 'Investigación y Desarrollo': 'IYD', 'Diálogo Estudiantil': 'DLG', 'Media Publicidad y Redes': 'MED', 'Enseñanza': 'ENS', 'Visitas Industriales': 'VIS', 'Interacción Social': 'INT', 'Redacción Científica': 'RED', 'Becas y Pasantía': 'BEC', 'Difusión y Divulgación Científica': 'DIF', 'Ingeniería Experimental CIE': 'CIE' };
      const acrSearch = Object.keys(COM_ACRONYMS).find(k => liderCom.includes(k) || k.includes(liderCom));
      let comCode = acrSearch ? COM_ACRONYMS[acrSearch] : 'GEN';
      if (cData) {
        comID = cData.id;
        const { data: usCom } = await sb.from('usuario_comisiones').select('usuarios(id,nombre_completo)').eq('comision_id', cData.id).eq('activo', true);
        usArr = (usCom || []).map(x => x.usuarios).filter(Boolean);
      }

      // Filtro alfabético y excluir roles generales
      usArr = usArr.filter(u => {
         const n = u.nombre_completo.toLowerCase();
         return !n.includes('líder') && !n.includes('lider') && !n.includes('directiva');
      }).sort((a, b) => a.nombre_completo.localeCompare(b.nombre_completo));

      
      
      const { data: lastAsist } = await sb.from('asistencia').select('numero_reunion').eq('comision_id', comID).order('fecha_reunion', { ascending: false }).limit(1);
      const nextReunion = (lastAsist && lastAsist.length > 0) ? (parseInt(lastAsist[0].numero_reunion) || 0) + 1 : 1;

      window.SOC_ARR = usArr;
      window.CURR_COM_ID = comID;
      window.CURR_COM_CODE = comCode;

      const optsSoc = usArr.map(u => `<option value="${u.nombre_completo}"></option>`).join('');

      ca.innerHTML = `
  <style>
    .ss-tab { padding:10px 16px; border:none; background:#eee; font-family:'Montserrat',sans-serif; font-weight:600; font-size:13px; cursor:pointer; border-radius:8px 8px 0 0; color:var(--gmid); transition:0.2s; }
    .ss-tab.active { background:#fff; color:var(--blue); border-bottom:3px solid var(--blue); }
    .ss-panel { display:none; background:#fff; padding:20px; border-radius:0 8px 8px 8px; box-shadow:var(--sh); margin-bottom:24px; }
    .ss-panel.active { display:block; animation: fadeUp 0.3s; }
    .ig-input { width:100%; border:1px solid transparent; padding:8px; background:transparent; font-family:'Questrial',sans-serif; border-radius:4px; font-size:14px; min-width:110px; }
    .ig-input:focus { background:#fff; border-color:var(--blue); outline:none; }
    .ig-input.error { border-color: red !important; background: #ffebee !important; }
    .ig-table { width:max-content; border-collapse:collapse; min-width:100%; white-space:nowrap; }
    .ig-table th { background:var(--gdark); color:#fff; font-size:12px; font-weight:600; padding:10px; text-align:left; }
    .ig-table td { border-bottom:1px solid var(--bdr); padding:4px; }
    .btn-add-r { width:100%; background:#fafafa; border:1px dashed #ccc; padding:10px; border-radius:6px; color:var(--gmid); font-weight:600; cursor:pointer; margin-top:12px; }
    .btn-add-r:hover { background:#f1f1f1; border-color:#aaa; }
    .btn-del-row { background:none; border:none; color:#ccc; cursor:pointer; font-size:18px; transition:0.2s; padding:0 10px; }
    .btn-del-row:hover { color:var(--red); transform: scale(1.2); }
    .t-desc { font-weight: 500; color: #444; }
  
    .swal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; width:100vw; height:100vh; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; z-index:99999; animation:swalFadeIn 0.2s ease-out; backdrop-filter:blur(3px); }
    .swal-box { background:white; border-radius:20px; padding:36px 40px; max-width:440px; width:88%; box-shadow:0 25px 80px rgba(0,0,0,0.3); text-align:center; animation:swalScaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1); position:relative; }
    .swal-box h3 { margin:0 0 14px 0; font-size:20px; color:var(--gdark); font-weight:700; }
    .swal-box p { margin:0 0 24px 0; font-size:14.5px; color:#555; line-height:1.6; }
    .swal-box .swal-btn { padding:12px 30px; border:none; border-radius:10px; font-weight:700; font-size:14px; cursor:pointer; margin:0 6px; transition:all 0.15s; }
    .swal-ok { background:linear-gradient(135deg, #2563eb, #1d4ed8); color:white; }
    .swal-ok:hover { opacity:0.9; }
    /* Loader Spinner */
    .lds-ring { display:inline-block; position:relative; width:50px; height:50px; }
    .lds-ring div { box-sizing:border-box; display:block; position:absolute; width:40px; height:40px; margin:5px; border:4px solid var(--blue); border-radius:50%; animation:lds-ring 1.2s cubic-bezier(0.5,0,0.5,1) infinite; border-color:var(--blue) transparent transparent transparent; }
    .lds-ring div:nth-child(1) { animation-delay:-0.45s; }
    .lds-ring div:nth-child(2) { animation-delay:-0.3s; }
    .lds-ring div:nth-child(3) { animation-delay:-0.15s; }
    @keyframes lds-ring { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }

    
      .admin-row .ig-input, .admin-row select { min-width:100%; width:100%; box-sizing:border-box; }
      .admin-btn { width:100%; justify-content:center; padding:13px; font-size:14px; }
      .admin-card { padding:18px 16px; border-radius:12px; }
    }

    @keyframes swalScaleIn { from { transform:scale(0.7) translateY(20px); opacity:0; } to { transform:scale(1) translateY(0); opacity:1; } }
    @keyframes swalFadeIn { from { opacity:0; } to { opacity:1; } }

  </style>

  <datalist id="dl-socios">${optsSoc}</datalist>
  <datalist id="dl-prio"><option value="Alta"></option><option value="Media"></option><option value="Baja"></option></datalist>
  <datalist id="dl-asist"><option value="Presente"></option><option value="Ausente"></option><option value="Con Permiso"></option></datalist>

  
  
  <div style="display:flex; gap:20px; margin-bottom:20px; background:#f9fafb; padding:16px; border-radius:8px; border:1px solid var(--bdr);">
     <div><label style="font-size:12px;font-weight:600;display:block">Fecha de Reunión</label><input type="date" id="i-f-asist" class="ig-input" style="background:#fff;border:1px solid #ccc" value="${new Date().toISOString().split('T')[0]}"></div>
     <div><label style="font-size:12px;font-weight:600;display:block">N° Reunión</label><input type="number" id="i-n-asist" class="ig-input" style="background:#fff;border:1px solid #ccc" value="${nextReunion}"></div>
  </div>
  <div id="notif-upload" style="margin-top:16px;"></div>



  <!-- PANEL TAREAS -->
  <div id="p-tareas" class="ss-panel" style="display:block; border-radius:8px; margin-bottom:16px; border-bottom:none;">
    <h3>Registro de Tareas</h3>
    <p style="font-size:13px;color:var(--gmid);margin-bottom:16px;">Escribe manualmente o pega directamente desde Excel: <b>Responsable, Descripción, Fecha, Prioridad</b>.</p>
    <div style="overflow-x:auto">
      <table class="ig-table">
        <thead><tr><th>ID Automático</th><th>Responsable</th><th>Descripción</th><th>Fecha Límite</th><th>Prioridad</th><th style="width:40px"></th></tr></thead>
        <tbody id="tb-tareas">
          ${[1,2,3,4].map(()=>window.genRowT()).join('')}
        </tbody>
      </table>
      <button class="btn-add-r" onclick="document.getElementById('tb-tareas').insertAdjacentHTML('beforeend', window.genRowT())">+ Añadir fila vacía</button>
    </div>
    
  </div>

  <!-- PANEL ASISTENCIA -->
  <div id="p-asist" class="ss-panel" style="display:block; border-radius:8px; margin-bottom:16px;">
    <h3>Toma de Asistencia</h3>
    
       
    <p style="font-size:13px;color:var(--gmid);margin-bottom:16px;">Márcalos presentes o faltantes. Al pegar de Excel respeta columnas: <b>Asistencia, Hora, Puntos</b>.</p>
    <div style="overflow-x:auto">
       <table class="ig-table">
         <thead><tr><th>Socio</th><th>Asistencia</th><th>Hora Ingreso</th><th>Tiempo (mins)</th></tr></thead>
         <tbody id="tb-asist">
            ${usArr.map(u => `
              <tr data-sid="${u.id}">
                <td style="font-weight:600;font-size:13px;padding:8px 16px">${u.nombre_completo}</td>
                <td><input class="ig-input a-est" list="dl-asist" value="Presente" placeholder="Presente"></td>
                <td><input type="time" class="ig-input a-hor"></td>
                <td><input type="number" class="ig-input a-min" placeholder="Ej: 60"></td>
              </tr>
            `).join('')}
         </tbody>
       </table>
    </div>
    
    <div style="margin-top:30px; text-align:center;">
      <button class="btn btn-primary" id="btn-save-acta" onclick="guardarActaCompleta()" style="padding:14px 40px; font-size:16px; width:100%; max-width:400px; background:var(--orange); border:none; box-shadow:var(--sh2)">
        ✔️ GUARDAR ACTA COMPLETA
      </button>
      <p style="font-size:12px; color:var(--gmid); margin-top:8px;">Se guardarán la Asistencia y las Tareas asignadas simultáneamente.</p>
    </div>
  </div>


  
  <div class="sc" style="margin-top:12px">
    <div class="sc-head"><div><h3>Subir acta completa</h3><p>El documento se almacena en Google Drive</p></div></div>
    
  </div>

  
  <div class="sc" style="margin-top:24px">
    <div class="sc-head"><div><h3>Evidencia en Google Drive</h3><p>Almacenamiento obligatorio del documento en PDF</p></div></div>
    <div style="padding:20px">
      <a href="https://drive.google.com" target="_blank" style="text-decoration:none; color:inherit;">
        <div class="drive-card" style="cursor:pointer; transition:transform 0.2s; background:#f4f8ff; border:1px solid var(--blue-l);">
          <div class="drive-icon">📁</div>
          <div>
            <h3>Carpeta de Actas — Abrir Drive ↗</h3>
            <p style="margin-top:4px;">Haz clic aquí para subir el documento PDF de esta reunión directamente a tu carpeta.</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="sc" style="margin-top:12px" id="sc-historial">
    <div class="sc-head"><div><h3>Historial de sesión</h3><p>Registros enviados en esta visita</p></div></div>
    <div style="padding:16px;">
      <ul id="lista-historial-sesion" style="list-style:none; padding:0; margin:0; font-size:13px; color:var(--gdark)">
        <li style="color:var(--gmid); padding:8px 0;">Aún no has enviado información en esta sesión.</li>
      </ul>
    </div>
  </div>

    
  </div>

  `;
      
      // Paste Events Support
      setTimeout(() => {
        window.actualizarListaHistorial && window.actualizarListaHistorial();
        document.getElementById('tb-tareas').addEventListener('paste', e => handleGridPaste(e, 'tareas'));
        document.getElementById('tb-asist').addEventListener('paste', e => handleGridPaste(e, 'asist'));
      }, 100);
    }

    // Funciones Helper Globales para Grid
    window.genRowT = function() {
      const d = new Date();
      const uuid = Math.floor(Math.random() * 1000000).toString(16).padStart(5,'0').toUpperCase();
      const rId = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}-${window.CURR_COM_CODE}-${uuid}`;
      return `<tr>
        <td><input class="ig-input t-id" value="${rId}" readonly style="color:#aaa;cursor:not-allowed"></td>
        <td><input class="ig-input t-resp" list="dl-socios" placeholder="Nombre completo" style="min-width:220px"></td>
        <td><input class="ig-input t-desc" placeholder="Descripción de la tarea" style="min-width:550px; font-weight:500;"></td>
        <td><input type="date" class="ig-input t-fec" style="min-width:140px"></td>
        <td><input class="ig-input t-prio" list="dl-prio" placeholder="Alta/Media/Baja" style="min-width:120px"></td>
        <td style="text-align:center"><button class="btn-del-row" onclick="this.closest('tr').remove()" title="Eliminar fila">✕</button></td>
      </tr>`;
    };

    window.switchSsTab = function(pid, btn) {
      document.querySelectorAll('.ss-panel').forEach(e => e.classList.remove('active'));
      document.querySelectorAll('.ss-tab').forEach(e => e.classList.remove('active'));
      document.getElementById(pid).classList.add('active');
      btn.classList.add('active');
    };

    window.parsePastedDate = function(str) {
      if(!str) return '';
      if(/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
      const parts = str.split('/');
      if(parts.length === 3) {
         let m = parseInt(parts[0], 10);
         let d = parseInt(parts[1], 10);
         let y = parseInt(parts[2], 10);
         if (m > 12) { let temp = m; m = d; d = temp; } // Assume MM/DD/YYYY or DD/MM/YYYY
         return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      }
      return str;
    };

    window.handleGridPaste = function(e, type) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const rows = text.split(/\\r?\\n/).filter(r => r.trim() !== '');
      const target = e.target;
      const tr = target.closest('tr');
      const tbody = target.closest('tbody');
      if (!tr || !tbody) return;
      
      const startRowIdx = Array.from(tbody.children).indexOf(tr);
      const targetCell = target.closest('td');
      const startColIdx = Array.from(tr.children).indexOf(targetCell);

      rows.forEach((rowStr, i) => {
        let currTr = tbody.children[startRowIdx + i];
        if (!currTr && type === 'tareas') {
          tbody.insertAdjacentHTML('beforeend', window.genRowT());
          currTr = tbody.children[startRowIdx + i];
        }
        if (!currTr) return; 

        const cols = rowStr.split('\t');
        cols.forEach((colStr, j) => {
          let currTd = currTr.children[startColIdx + j];
          if (currTd) {
            let input = currTd.querySelector('input, select, textarea');
            if (input && !input.readOnly) {
              if(input.type === 'date') {
                 input.value = window.parsePastedDate(colStr.trim());
              } else {
                 input.value = colStr.trim();
              }
            }
          }
        });
      });
    };

    
    async function renderDirResumen(ca) {
      const total = tareasData.length;
      const pend = tareasData.filter(t => t.estado === 'Pendiente').length;
      const rev = tareasData.filter(t => t.estado === 'En revisión').length;
      const comp = tareasData.filter(t => t.estado === 'Aprobada').length;
      const pctComp = total ? Math.round(comp / total * 100) : 0;
      
      const presentes = asistData.filter(a => a.asistencia === 'Presente').length;
      const totAsist = asistData.length;
      const avgAsist = totAsist ? Math.round(presentes / totAsist * 100) : 0;

      const { data: comisListRaw } = await sb.from('comisiones').select('*');
      const comisList = (comisListRaw || []).filter(c => c.activa !== false);
      const { data: tareasAll } = await sb.from('tareas').select('comisiones(nombre),estado');
      const { data: asistAll } = await sb.from('asistencia').select('comisiones(nombre),estado');

      const comColors = { 
        'Investigación y Desarrollo': '#38B6FF', 'Diálogo Estudiantil': '#F59735', 
        'Media Publicidad y Redes': '#E93438', 'Enseñanza': '#91C54D', 
        'Visitas Industriales': '#8901D1', 'Interacción Social': '#005c99', 
        'Redacción Científica': '#387c00', 'Becas y Pasantía': '#c4161a',
        'Difusión y Divulgación Científica': '#ff00ff', 'Ingeniería Experimental CIE': '#000'
      };

      const comStats = (comisList || []).map((c, i) => {
        const ct = tareasAll?.filter(t => t.comisiones?.nombre === c.nombre) || [];
        const ca2 = asistAll?.filter(a => a.comisiones?.nombre === c.nombre) || [];
        const ctComp = ct.filter(t => t.estado === 'Aprobada').length;
        const casPres = ca2.filter(a => a.estado === 'Presente').length;
        const asistPct = ca2.length ? Math.round(casPres / ca2.length * 100) : 0;
        return { nombre: c.nombre, tareas: ct.length, completadas: ctComp, asistencia: asistPct, color: comColors[c.nombre] || '#F59735' };
      });

      // Cargar uso de almacenamiento
      const { data: archivos } = await sb.storage.from('evidencias').list('', { limit: 1000 });
      const totalBytes = (archivos || []).reduce((s, f) => s + (f.metadata?.size || 0), 0);
      const usadoMB = (totalBytes / 1024 / 1024).toFixed(1);
      const limiteMB = 1024;
      const pctStorage = Math.min(Math.round((totalBytes / (limiteMB * 1024 * 1024)) * 100), 100);
      const storColor = pctStorage >= 80 ? 'var(--red)' : pctStorage >= 50 ? 'var(--orange)' : 'var(--green)';

      ca.innerHTML = `
  <div class="kpi-grid">
    <div class="kpi-card orange"><div class="kpi-lbl">Comisiones activas</div><div class="kpi-val">${comisList?.length || 10}</div><div class="kpi-sub">Este ciclo</div></div>
    <div class="kpi-card blue"><div class="kpi-lbl">Tareas totales</div><div class="kpi-val">${total}</div><div class="kpi-sub">${pend} pendientes · ${rev} en revisión</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Aprobadas</div><div class="kpi-val">${comp}</div><div class="kpi-sub">${pctComp}% del total</div></div>
    <div class="kpi-card red"><div class="kpi-lbl">Asistencia prom.</div><div class="kpi-val">${avgAsist}%</div><div class="kpi-sub">${presentes}/${totAsist} registros presentes</div></div>
  </div>

  <div style="background:#fff;border-radius:var(--r);box-shadow:var(--sh);padding:18px 22px;margin-bottom:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div>
        <span style="font-family:'Forum', serif;font-size:18px;font-weight:700;color:#1a1a2e">Almacenamiento de evidencias</span>
        <span style="font-size:12px;color:var(--gmid);margin-left:10px">Supabase Storage — plan gratuito</span>
      </div>
      <span style="font-family:var(--fh);font-size:15px;font-weight:700;color:${storColor}">${usadoMB} MB / 1,024 MB</span>
    </div>
    <div style="height:8px;background:var(--glight);border-radius:4px;overflow:hidden">
      <div style="height:100%;width:${pctStorage}%;background:${storColor};border-radius:4px;transition:width .5s"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--gmid)">
      <span>${pctStorage}% usado · ${(archivos || []).length} archivos subidos</span>
      <span>${pctStorage >= 80 ? '⚠️ Espacio casi lleno — considera limpiar archivos antiguos' : pctStorage >= 50 ? 'Espacio moderado' : 'Espacio disponible'}</span>
    </div>
  </div>
  <div class="com-grid">${comStats.map(c => {
        const pct = c.tareas ? Math.round(c.completadas / c.tareas * 100) : 0;
        return `<div class="com-card" style="border-top-color:${c.color}">
      <h4>${c.nombre}</h4>
      <div class="com-bar"><div class="com-bar-fill" style="width:${pct}%;background:${c.color}"></div></div>
      <div class="com-stats">
        <span>${c.completadas}/${c.tareas} tareas (${pct}%)</span>
        <span>Asist. ${c.asistencia}%</span>
      </div>
    </div>`;
      }).join('')}</div>`;
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // DIRECTIVA — BASE TAREAS
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderDirTareas(ca) {
      const coms = [...new Set(tareasData.map(t => t.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      const responsables = [...new Set(tareasData.map(t => shortName(t.responsable)))].sort();
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fd-com" onchange="applyDirTareas()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fd-est" onchange="applyDirTareas()">
      <option value="">Todos</option><option>Pendiente</option><option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Base de datos — tareas</h3><p id="dt-sub">${tareasData.length} tareas en total</p></div></div>
    <table><thead><tr><th>ID</th><th>Comisión</th><th>Responsable</th><th>Descripción</th><th>Fecha límite</th><th>Prioridad</th><th>Estado</th></tr></thead>
    <tbody id="dir-tareas-tbody"></tbody></table>
  </div>`;
      setTimeout(applyDirTareas, 0);
    }
    function renderDirTareasRows(list) {
      if (!list.length) return `<tr><td colspan="7" style="text-align:center;color:var(--gmid);padding:20px">Sin resultados</td></tr>`;
      return list.map(t => `<tr><td style="font-size:11px;color:var(--gmid)">${t.id}</td><td>${t.comision}</td><td>${shortName(t.responsable)}</td><td>${t.desc}</td><td>${t.fecha}</td><td>${priorBadge(t.prioridad)}</td><td>${estadoBadge(t.estado)}</td></tr>`).join('');
    }
    function applyDirTareas() {
      let t = tareasData;
      const com = document.getElementById('fd-com')?.value;
      const est = document.getElementById('fd-est')?.value;
      if (com) t = t.filter(x => x.comision === com);
      if (est) t = t.filter(x => x.estado === est);
      window._DT_PAGE = 1; window._DT_DATA = t;
      renderDirTareasPage();
      
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // DIRECTIVA — VALIDAR (VER REVISADAS)
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderDirValidar(ca) {
      const coms = [...new Set(tareasData.map(t => t.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fdv-com" onchange="applyDirValidar()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fdv-est" onchange="applyDirValidar()">
      <option value="">Todos</option><option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
  </div>
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
    <div class="kpi-card blue"><div class="kpi-lbl">En revisión</div><div class="kpi-val" id="kpi-rev">${tareasData.filter(t => t.estado === 'En revisión').length}</div><div class="kpi-sub">Pendiente de validar</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Aprobadas</div><div class="kpi-val" id="kpi-apr">${tareasData.filter(t => t.estado === 'Aprobada').length}</div><div class="kpi-sub">Validadas ok</div></div>
    <div class="kpi-card red"><div class="kpi-lbl">Rechazadas</div><div class="kpi-val" id="kpi-rej">${tareasData.filter(t => t.estado === 'Rechazada').length}</div><div class="kpi-sub">Requieren revisión</div></div>
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Revisión de tareas</h3><p id="dv-sub">—</p></div></div>
    <table><thead><tr><th>Comisión</th><th>Socio</th><th>Descripción</th><th>Fecha entrega</th><th>Evidencia</th><th>Estado</th><th>Validación</th></tr></thead>
    <tbody id="dir-val-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyDirValidar(); }, 0);
    }
    function applyDirValidar() {
      let t = tareasData.filter(x => ['En revisión', 'Aprobada', 'Rechazada'].includes(x.estado));
      const com = document.getElementById('fdv-com')?.value;
      const est = document.getElementById('fdv-est')?.value;
      if (com) t = t.filter(x => x.comision === com);
      if (est) t = t.filter(x => x.estado === est);
      
      const kpiRev = document.getElementById('kpi-rev');
      const kpiApr = document.getElementById('kpi-apr');
      const kpiRej = document.getElementById('kpi-rej');
      if (kpiRev) kpiRev.textContent = t.filter(x => x.estado === 'En revisión').length;
      if (kpiApr) kpiApr.textContent = t.filter(x => x.estado === 'Aprobada').length;
      if (kpiRej) kpiRej.textContent = t.filter(x => x.estado === 'Rechazada').length;
      applyGenericPagination('dir-val-tbody', t, function(sliced) { return sliced.length ? sliced.map(x => `<tr>
      <td>${x.comision}</td>
      <td>${shortName(x.responsable)}</td>
      <td>${x.desc.substring(0, 42)}...</td>
      <td>${x.entrega || '-'}</td>
      <td>${evidenciaBtn(x.evidencia)}</td>
      <td>${estadoBadge(x.estado)}</td>
      <td>${x.validacion ? estadoBadge(x.validacion) : '<span style="color:var(--gmid)">—</span>'}</td>
    </tr>`).join('') : 
        `<tr><td colspan="7" style="text-align:center;color:var(--gmid);padding:20px">Sin resultados</td></tr>`; }, 'dv-sub', '{count} tareas');
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // DIRECTIVA — ASISTENCIA
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderDirAsistencia(ca) {
      const coms = [...new Set(asistData.map(a => a.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      const socios = [...new Set(asistData.map(a => a.socio))].sort();
      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fda-com" onchange="applyDirAsist()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Desde:</span>
    <input type="date" class="finput" id="fda-desde" onchange="applyDirAsist()">
    <span class="filter-label">Hasta:</span>
    <input type="date" class="finput" id="fda-hasta" onchange="applyDirAsist()">
    <button class="btn" onclick="clearAsistFiltros('dir')" style="font-size:12px;padding:7px 12px">🔄 Limpiar</button>
  </div>
  <div id="dir-asist-tiempo"></div>
  <div class="sc">
    <div class="sc-head"><div><h3>Base de datos — asistencia</h3><p id="da-sub">${asistData.length} registros</p></div></div>
    <table><thead><tr><th>Fecha reunión</th><th>Comisión</th><th>Socio</th><th>Asistencia</th><th>Hora ingreso</th><th>Tiempo en llamada</th></tr></thead>
    <tbody id="dir-asist-tbody"></tbody></table>
  </div>`;
      setTimeout(() => { applyDirAsist(); }, 0);
      updDirTiempo(asistData);
    }
    function renderDirAsistRows(list) {
      if (!list.length) return `<tr><td colspan="6" style="text-align:center;color:var(--gmid);padding:20px">Sin registros</td></tr>`;
      return list.map(a => `<tr><td>${a.fecha}</td><td>${a.comision}</td><td>${a.socio.split(' ').slice(0, 2).join(' ')}</td><td>${asistBadge(a.asistencia)}</td><td>${a.hora}</td><td>${a.tiempo}</td></tr>`).join('');
    }
    function updDirTiempo(list) {
      const el = document.getElementById('dir-asist-tiempo');
      if (el) { const min = sumaMinutos(list.filter(a => a.asistencia === 'Presente')); el.innerHTML = `<div class="tiempo-total">⏱ Tiempo total acumulado (presentes): <strong>${minToHM(min)}</strong></div>`; }
    }
    function applyDirAsist() {
      let list = asistData;
      const com = document.getElementById('fda-com')?.value;
      const desde = document.getElementById('fda-desde')?.value;
      const hasta = document.getElementById('fda-hasta')?.value;
      if (com) list = list.filter(a => a.comision === com);
      if (desde) list = list.filter(a => a.fecha >= desde);
      if (hasta) list = list.filter(a => a.fecha <= hasta);
      applyGenericPagination('dir-asist-tbody', list, 'renderDirAsistRows', 'da-sub', '{count} registros');
      
      updDirTiempo(list);
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // DIRECTIVA — PRODUCTIVIDAD SOCIO
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderDirSocio(ca) {
      const todosSocios = [...new Set(tareasData.map(t => t.responsable).concat(asistData.map(a => a.socio)))].sort();
      const todasComs = [...new Set(tareasData.map(t => t.comision).concat(asistData.map(a => a.comision)))].filter(c => ACTIVE_COM_NAMES.includes(c)).sort();
      ca.innerHTML = `
  <div class="filters" style="margin-bottom:20px">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fps-com" onchange="filterSociosList()">
      <option value="">Todas</option>${todasComs.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Socio:</span>
    <select class="fsel" id="fps-socio" onchange="renderSocioPerfil()">
      <option value="">Selecciona un socio...</option>${todosSocios.map(s => `<option>${s}</option>`).join('')}
    </select>
  </div>
  <div id="socio-perfil">
    <div style="text-align:center;padding:60px 20px;color:var(--gmid)">
      <div style="font-size:48px;margin-bottom:14px">👤</div>
      <p style="font-size:15px">Selecciona una comisión y un socio para ver su rendimiento</p>
    </div>
  </div>`;
    }

    function filterSociosList() {
      const com = document.getElementById('fps-com').value;
      const sel = document.getElementById('fps-socio');
      let socios;
      if (com) {
        const deCom = new Set([
          ...tareasData.filter(t => t.comision === com).map(t => t.responsable),
          ...asistData.filter(a => a.comision === com).map(a => a.socio)
        ]);
        socios = [...deCom].sort();
      } else {
        socios = [...new Set(tareasData.map(t => t.responsable).concat(asistData.map(a => a.socio)))].sort();
      }
      sel.innerHTML = `<option value="">Selecciona un socio...</option>` + socios.map(s => `<option>${s}</option>`).join('');
      document.getElementById('socio-perfil').innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--gmid)"><div style="font-size:48px;margin-bottom:14px">👤</div><p style="font-size:15px">Selecciona un socio para ver su rendimiento</p></div>`;
    }

    function renderSocioPerfil() {
      const socio = document.getElementById('fps-socio').value;
      const com = document.getElementById('fps-com').value;
      const el = document.getElementById('socio-perfil');
      if (!socio) { el.innerHTML = ''; return; }

      // datos del socio
      let tareas = tareasData.filter(t => t.responsable === socio);
      let asist = asistData.filter(a => a.socio === socio);
      if (com) { tareas = tareas.filter(t => t.comision === com); asist = asist.filter(a => a.comision === com); }

      const total = tareas.length;
      const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;
      const enRev = tareas.filter(t => t.estado === 'En revisión').length;
      const aprobadas = tareas.filter(t => t.estado === 'Aprobada').length;
      const rechazadas = tareas.filter(t => t.estado === 'Rechazada').length;
      const completPct = total ? Math.round((aprobadas / total) * 100) : 0;

      const totalAsist = asist.length;
      const presentes = asist.filter(a => a.asistencia === 'Presente').length;
      const ausentes = asist.filter(a => a.asistencia === 'Ausente').length;
      const conPermiso = asist.filter(a => a.asistencia === 'Con Permiso').length;
      const asistPct = totalAsist ? Math.round((presentes / totalAsist) * 100) : 0;
      const minTotales = sumaMinutos(asist.filter(a => a.asistencia === 'Presente'));

      // barra de productividad general (promedio de completitud y asistencia)
      const score = Math.round((completPct + asistPct) / 2);
      const scoreColor = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--orange)' : 'var(--red)';
      const comisiones = [...new Set([...tareas.map(t => t.comision), ...asist.map(a => a.comision)])].filter(c => ACTIVE_COM_NAMES.includes(c));

      el.innerHTML = `
  <!-- HEADE❌ SOCIO -->
  <div style="background:#fff;border-radius:var(--r);box-shadow:var(--sh);padding:22px 24px;margin-bottom:18px;display:flex;align-items:center;gap:20px">
    <div style="width:60px;height:60px;border-radius:50%;background:var(--orange-l);display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:20px;font-weight:700;color:var(--orange-d);flex-shrink:0">${socio.split(' ').map(p => p[0]).slice(0, 2).join('')}</div>
    <div style="flex:1">
      <h3 style="font-family:'Forum', serif;font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:2px">${socio}</h3>
      <p style="font-size:13px;color:var(--gmid)">${comisiones.join(' · ')}</p>
    </div>
    <div style="text-align:right">
      <div style="font-family:var(--fh);font-size:28px;font-weight:700;color:${scoreColor}">${score}%</div>
      <div style="font-size:12px;color:var(--gmid)">Productividad general</div>
      <div style="height:6px;background:var(--glight);border-radius:3px;margin-top:6px;width:120px">
        <div style="height:100%;width:${score}%;background:${scoreColor};border-radius:3px;transition:width .5s"></div>
      </div>
    </div>
  </div>

  <!-- KPI GRID -->
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
    <div class="kpi-card orange"><div class="kpi-lbl">Tareas totales</div><div class="kpi-val">${total}</div><div class="kpi-sub">${pendientes} pendientes · ${enRev} en revisión</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Tareas aprobadas</div><div class="kpi-val">${aprobadas}</div><div class="kpi-sub">${completPct}% de completitud</div></div>
    <div class="kpi-card blue"><div class="kpi-lbl">Asistencia</div><div class="kpi-val">${asistPct}%</div><div class="kpi-sub">${presentes}/${totalAsist} reuniones · ${minToHM(minTotales)}</div></div>
  </div>

  <!-- DOS COLUMNAS: tareas + asistencia -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

    <!-- TAREAS -->
    <div class="sc">
      <div class="sc-head"><div><h3>Tareas asignadas</h3><p>${total} tareas${com ? ' en ' + com : ''}</p></div></div>
      ${total ? `
      <div style="padding:14px 18px;display:flex;gap:8px;flex-wrap:wrap">
        ${[['Pendiente', 'pendiente', pendientes], ['En revisión', 'revision', enRev], ['Aprobada', 'aprobada', aprobadas], ['Rechazada', 'rechazada', rechazadas]].filter(x => x[2] > 0).map(x => `<span class="badge ${x[1]}">${x[0]}: ${x[2]}</span>`).join('')}
      </div>
      <table><thead><tr><th>Descripción</th><th>Fecha</th><th>Estado</th></tr></thead>
      <tbody>${tareas.map(t => `<tr><td style="font-size:12px">${t.desc}</td><td style="font-size:12px;white-space:nowrap">${t.fecha}</td><td>${estadoBadge(t.estado)}</td></tr>`).join('')}</tbody></table>`
          : `<div style="padding:24px;text-align:center;color:var(--gmid);font-size:13px">Sin tareas registradas</div>`}
    </div>

    <!-- ASISTENCIA -->
    <div class="sc">
      <div class="sc-head"><div><h3>Historial de asistencia</h3><p>${totalAsist} reuniones${com ? ' en ' + com : ''}</p></div></div>
      ${totalAsist ? `
      <div style="padding:14px 18px;display:flex;gap:8px">
        <span class="badge presente">Presente: ${presentes}</span>
        <span class="badge ausente">Ausente: ${ausentes}</span>
        ${conPermiso ? `<span class="badge permiso">Con Permiso: ${conPermiso}</span>` : ''}
        <span class="tiempo-total" style="padding:3px 10px;font-size:12px">⏱ ${minToHM(minTotales)}</span>
      </div>
      <table><thead><tr><th>Fecha reunión</th><th>Comisión</th><th>Estado</th><th>Tiempo</th></tr></thead>
      <tbody>${asist.map(a => `<tr><td style="font-size:12px">${a.fecha}</td><td style="font-size:12px">${a.comision}</td><td>${asistBadge(a.asistencia)}</td><td style="font-size:12px">${a.tiempo}</td></tr>`).join('')}</tbody></table>`
          : `<div style="padding:24px;text-align:center;color:var(--gmid);font-size:13px">Sin registros de asistencia</div>`}
    </div>

  </div>`;
    }
    // """"""""""""""""""""""""""""""""""""""""""""""
    // TAREAS ENTREGADAS — SOCIO
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderEntregadas(ca) {
      const lista = tareasData.filter(t =>
        t.responsable === CU.filtro &&
        ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado)
      );
      const coms = [...new Set(lista.map(t => t.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));

      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fe-com" onchange="applyEntregadasSocio()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fe-est" onchange="applyEntregadasSocio()">
      <option value="">Todos</option>
      <option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Mis tareas entregadas</h3><p id="fe-sub">${lista.length} entregas registradas</p></div></div>
    <table>
      <thead><tr><th>ID tarea</th><th>Descripción</th><th>Fecha límite</th><th>Fecha entrega</th><th>Prioridad</th><th>Estado</th><th>Evidencia</th></tr></thead>
      <tbody id="fe-tbody"></tbody>
    </table>
  </div>`;
      setTimeout(() => { applyEntregadasSocio(); }, 0);
    }
    function renderEntregadasRows(list) {
      if (!list.length) return `<tr><td colspan="7" style="text-align:center;color:var(--gmid);padding:20px">Sin entregas registradas</td></tr>`;
      return list.map(t => `<tr>
    <td style="font-size:11px;color:var(--gmid)">${t.id}</td>
    <td style="font-size:13px">${t.desc}</td>
    <td style="font-size:12px">${t.fecha}</td>
    <td style="font-size:12px">${t.entrega || '—'}</td>
    <td>${priorBadge(t.prioridad)}</td>
    <td>${estadoBadge(t.estado)}</td>
    <td>${evidenciaBtn(t.evidencia)}</td>
  </tr>`).join('');
    }
    function applyEntregadasSocio() {
      let list = tareasData.filter(t => t.responsable === CU.filtro && ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado));
      const com = document.getElementById('fe-com')?.value;
      const est = document.getElementById('fe-est')?.value;
      if (com) list = list.filter(t => t.comision === com);
      if (est) list = list.filter(t => t.estado === est);
      applyGenericPagination('fe-tbody', list, 'renderEntregadasRows', 'se-sub', '{count} tareas entregadas');
      document.getElementById('fe-sub').textContent = list.length + ' entregas encontradas';
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // TAREAS ENTREGADAS — LÍDER
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderEntregadas_lider(ca) {
      const com = CU.comisiones[0];
      const lista = tareasData.filter(t => t.comision === com && ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado) && t.evidencia);
      const socios = [...new Set(lista.map(t => shortName(t.responsable)))];

      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Socio:</span>
    <select class="fsel" id="fl-soc" onchange="applyEntregadasLider()">
      <option value="">Todos</option>${socios.map(s => `<option>${s}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fl-est2" onchange="applyEntregadasLider()">
      <option value="">Todos</option>
      <option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Tareas entregadas — ${com}</h3><p id="fl-sub">${lista.length} entregas con evidencia</p></div></div>
    <table>
      <thead><tr><th>ID tarea</th><th>Responsable</th><th>Descripción</th><th>Fecha límite</th><th>Fecha entrega</th><th>Prioridad</th><th>Estado</th><th>Evidencia</th></tr></thead>
      <tbody id="fl-tbody"></tbody>
    </table>
  </div>`;
      setTimeout(() => { applyEntregadasLider(); }, 0);
    }
    function renderEntregadasLiderRows(list) {
      if (!list.length) return `<tr><td colspan="8" style="text-align:center;color:var(--gmid);padding:20px">Sin entregas con evidencia</td></tr>`;
      return list.map(t => `<tr>
    <td style="font-size:11px;color:var(--gmid)">${t.id}</td>
    <td style="font-size:13px">${shortName(t.responsable)}</td>
    <td style="font-size:13px">${t.desc}</td>
    <td style="font-size:12px">${t.fecha}</td>
    <td style="font-size:12px">${t.entrega || '—'}</td>
    <td>${priorBadge(t.prioridad)}</td>
    <td>${estadoBadge(t.estado)}</td>
    <td>${evidenciaBtn(t.evidencia)}</td>
  </tr>`).join('');
    }
    function applyEntregadasLider() {
      const com = CU.comisiones[0];
      let list = tareasData.filter(t => t.comision === com && ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado) && t.evidencia);
      const soc = document.getElementById('fl-soc')?.value;
      const est = document.getElementById('fl-est2')?.value;
      if (soc) list = list.filter(t => shortName(t.responsable) === soc);
      if (est) list = list.filter(t => t.estado === est);
      applyGenericPagination('fl-tbody', list, 'renderEntregadasLiderRows', 'le-sub', '{count} tareas');
      document.getElementById('fl-sub').textContent = list.length + ' entregas encontradas';
    }

    // """"""""""""""""""""""""""""""""""""""""""""""
    // TAREAS ENTREGADAS — DIRECTIVA
    // """"""""""""""""""""""""""""""""""""""""""""""
    function renderDirEntregadas(ca) {
      const lista = tareasData.filter(t => ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado) && t.evidencia);
      const coms = [...new Set(lista.map(t => t.comision))].filter(c => ACTIVE_COM_NAMES.includes(c));
      const socios = [...new Set(lista.map(t => shortName(t.responsable)))].sort();

      ca.innerHTML = `
  <div class="filters">
    <span class="filter-label">Comisión:</span>
    <select class="fsel" id="fde-com" onchange="applyDirEntregadas()">
      <option value="">Todas</option>${coms.map(c => `<option>${c}</option>`).join('')}
    </select>
    <span class="filter-label">Socio:</span>
    <select class="fsel" id="fde-soc" onchange="applyDirEntregadas()">
      <option value="">Todos</option>${socios.map(s => `<option>${s}</option>`).join('')}
    </select>
    <span class="filter-label">Estado:</span>
    <select class="fsel" id="fde-est" onchange="applyDirEntregadas()">
      <option value="">Todos</option>
      <option>En revisión</option><option>Aprobada</option><option>Rechazada</option>
    </select>
  </div>
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
    <div class="kpi-card blue"><div class="kpi-lbl">Total entregas</div><div class="kpi-val" id="kpi-de-total">${lista.length}</div><div class="kpi-sub">Con evidencia adjunta</div></div>
    <div class="kpi-card green"><div class="kpi-lbl">Aprobadas</div><div class="kpi-val" id="kpi-de-aprob">${lista.filter(t => t.estado === 'Aprobada').length}</div><div class="kpi-sub">Validadas por líder</div></div>
    <div class="kpi-card orange"><div class="kpi-lbl">En revisión</div><div class="kpi-val" id="kpi-de-rev">${lista.filter(t => t.estado === 'En revisión').length}</div><div class="kpi-sub">Pendientes de validar</div></div>
  </div>
  <div class="sc">
    <div class="sc-head"><div><h3>Material de evidencia — todas las comisiones</h3><p id="fde-sub">${lista.length} entregas con evidencia</p></div></div>
    <table>
      <thead><tr><th>ID tarea</th><th>Comisión</th><th>Responsable</th><th>Descripción</th><th>Fecha límite</th><th>Fecha entrega</th><th>Prioridad</th><th>Estado</th><th>Evidencia</th></tr></thead>
      <tbody id="fde-tbody"></tbody>
    </table>
  </div>`;
      setTimeout(() => { applyDirEntregadas(); }, 0);
    }
    function renderDirEntregadasRows(list) {
      if (!list.length) return `<tr><td colspan="9" style="text-align:center;color:var(--gmid);padding:20px">Sin entregas con evidencia</td></tr>`;
      return list.map(t => `<tr>
    <td style="font-size:11px;color:var(--gmid)">${t.id}</td>
    <td style="font-size:12px">${t.comision}</td>
    <td style="font-size:13px">${shortName(t.responsable)}</td>
    <td style="font-size:13px">${t.desc}</td>
    <td style="font-size:12px">${t.fecha}</td>
    <td style="font-size:12px">${t.entrega || '—'}</td>
    <td>${priorBadge(t.prioridad)}</td>
    <td>${estadoBadge(t.estado)}</td>
    <td>${evidenciaBtn(t.evidencia)}</td>
  </tr>`).join('');
    }
    function applyDirEntregadas() {
      let list = tareasData.filter(t => ['En revisión', 'Aprobada', 'Rechazada'].includes(t.estado) && t.evidencia);
      const com = document.getElementById('fde-com')?.value;
      const soc = document.getElementById('fde-soc')?.value;
      const est = document.getElementById('fde-est')?.value;
      if (com) list = list.filter(t => t.comision === com);
      if (soc) list = list.filter(t => shortName(t.responsable) === soc);
      if (est) list = list.filter(t => t.estado === est);
      applyGenericPagination('fde-tbody', list, 'renderDirEntregadasRows', 'de-sub', '{count} tareas');
      document.getElementById('fde-sub').textContent = list.length + ' entregas encontradas';

      const kpiTotal = document.getElementById('kpi-de-total');
      const kpiAprob = document.getElementById('kpi-de-aprob');
      const kpiRev = document.getElementById('kpi-de-rev');
      if (kpiTotal) kpiTotal.textContent = list.length;
      if (kpiAprob) kpiAprob.textContent = list.filter(t => t.estado === 'Aprobada').length;
      if (kpiRev) kpiRev.textContent = list.filter(t => t.estado === 'En revisión').length;
    }
    async function renderDirLimites(ca) {
      ca.innerHTML = `<div style="padding:40px;text-align:center;color:var(--gmid)">Calculando uso de los servidores en tiempo real...</div>`;

      // 1. Storage
      const { data: archivos } = await sb.storage.from('evidencias').list('', { limit: 1000 });
      const totalBytes = (archivos || []).reduce((s, f) => s + (f.metadata?.size || 0), 0);
      const storMB = (totalBytes / 1024 / 1024).toFixed(1);
      const storLimit = 1024;
      const storPct = Math.min(Math.round((totalBytes / (storLimit * 1024 * 1024)) * 100), 100);

      // 2. Auth (Usuarios)
      const { count: usersCount } = await sb.from('usuarios').select('*', { count: 'exact', head: true });
      const authVal = usersCount || 0;
      const authLimit = 50000;
      const authPct = Math.max(0.1, Math.min(Math.round((authVal / authLimit) * 100), 100));

      // 3. Database (Approx 4KB per row mapped, free tier = 500MB)
      const { count: tCount } = await sb.from('tareas').select('*', { count: 'exact', head: true });
      const { count: aCount } = await sb.from('asistencia').select('*', { count: 'exact', head: true });
      const rowCount = (tCount || 0) + (aCount || 0) + authVal;
      const dbBytes = rowCount * 4096; // 4KB de estimación pesada por fila en Postgres
      const dbMB = (dbBytes / 1024 / 1024).toFixed(3);
      const dbLimit = 500;
      const dbPct = Math.max(0.1, Math.min(Math.round((dbBytes / (dbLimit * 1024 * 1024)) * 100), 100));

      const bar = (title, sub, used, limit, pct, col) => {
        const color = pct >= 80 ? 'var(--red)' : pct >= 50 ? 'var(--orange)' : col;
        return `
    <div style="background:#fff;border-radius:var(--r);box-shadow:var(--sh);padding:24px 28px;margin-bottom:20px;border: 1px solid var(--bdr); transition: transform 0.2s; cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='var(--sh2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='var(--sh)'">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div style="display:flex; align-items:baseline; gap:12px;">
          <span style="font-family:'Forum', serif;font-size:20px;font-weight:700;color:#1a1a2e">${title}</span>
          <span style="font-size:13px;color:var(--gmid);font-weight:600;">${sub}</span>
        </div>
        <span style="font-family:'Bebas Neue', sans-serif;font-size:22px;letter-spacing:1px;color:${color}">${used} / ${limit}</span>
      </div>
      <div style="height:10px;background:var(--glight);border-radius:5px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:5px;transition:width 1.2s cubic-bezier(0.16, 1, 0.3, 1)"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:13px;color:var(--gmid);font-weight:600;">
        <span>${pct}% usado ${title.includes('Storage') ? '· ' + (archivos || []).length + ' archivos subidos' : ''}</span>
        <span>${pct >= 80 ? '⚠️ Límite cercano. Urge depuración' : pct >= 50 ? 'Uso de servidor moderado' : 'Espacio altamente disponible'}</span>
      </div>
    </div>`;
      };

      ca.innerHTML = `
  <div style="max-width:1000px; margin:0 auto; padding-bottom: 40px;">
    <div style="margin-bottom: 32px; padding: 0 10px;">
      <h3 style="font-family:'Forum', serif; font-size:28px; color:var(--gdark); margin-bottom:6px;">Límites de Cuota (Supabase Free)</h3>
      <p style="font-size:15px; color:var(--gmid);">Monitoreo visual del servidor en la nube. Las métricas de red (transferencia) requieren acceso de administrador.</p>
    </div>
    
    ${bar('Storage', 'Almacenamiento de evidencias', storMB + ' MB', '1,024 MB', storPct, 'var(--orange)')}
    ${bar('Database', 'Leads, asistencia, tareas', dbMB + ' MB (Aprox)', '500 MB', dbPct, 'var(--blue)')}
    ${bar('Auth', 'Cuentas de usuario', authVal, '50,000', authPct, 'var(--green)')}
    ${bar('Edge Functions', 'Lógica backend', '0', '~500K ejec.', 0, '#8901D1')}
    ${bar('Transferencia Red', 'Descargas', 'No medible', '2 GB / mes', 0, 'var(--gdark)')}

    <div class="notif info" style="margin-top:24px;">
      <span>💡</span>
      <span><strong>Recomendación a Directiva:</strong> Conforme el proyecto escale, vigilen el <em>Storage</em> de evidencias. Si el color cambia a naranja (>500MB) o rojo (>800MB), ordenen descargar un backup (copia de seguridad) y pida a los líderes subir el material mediante <strong>Links de Google Drive o Canva</strong> en vez de subir el PDF o Excel directamente.</span>
    </div>
  </div>`;
    }

  


    window.actualizarListaHistorial = function() {
      const ul = document.getElementById('lista-historial-sesion');
      if(!ul) return;
      const historyText = localStorage.getItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
      const histArr = historyText ? JSON.parse(historyText) : [];
      if(histArr.length === 0) {
        ul.innerHTML = '<li style="color:var(--gmid); padding:8px 0;">No hay envíos recientes en este equipo.</li>';
      } else {
        ul.innerHTML = histArr.map(h => `<li style="padding:10px 0; border-bottom:1px inset #eee;">[${h.time}] ${h.msg}</li>`).join('');
      }
    };

    window.addSessionHistory = function(msg) {
      const historyText = localStorage.getItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
      let histArr = historyText ? JSON.parse(historyText) : [];
      const now = new Date();
      const timeStr = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      histArr.unshift({ time: timeStr, msg: msg });
      if(histArr.length > 20) histArr.pop(); // keep last 20
      localStorage.setItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'), JSON.stringify(histArr));
      actualizarListaHistorial();
    };

    window.clearHistorialLocal = function() {
      if(confirm('¿Seguro que deseas limpiar el historial local de actas subidas?')) {
        localStorage.removeItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
        actualizarListaHistorial();
      }
    };

    



    window.actualizarListaHistorial = function() {
      const ul = document.getElementById('lista-historial-sesion');
      if(!ul) return;
      const historyText = localStorage.getItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
      const histArr = historyText ? JSON.parse(historyText) : [];
      if(histArr.length === 0) {
        ul.innerHTML = '<li style="color:var(--gmid); padding:8px 0;">No hay envíos recientes en este equipo.</li>';
      } else {
        ul.innerHTML = histArr.map(h => `<li style="padding:10px 0; border-bottom:1px inset #eee;">[${h.time}] ${h.msg}</li>`).join('');
      }
    };

    window.addSessionHistory = function(msg) {
      const historyText = localStorage.getItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
      let histArr = historyText ? JSON.parse(historyText) : [];
      const now = new Date();
      const timeStr = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      histArr.unshift({ time: timeStr, msg: msg });
      if(histArr.length > 20) histArr.pop(); 
      localStorage.setItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'), JSON.stringify(histArr));
      actualizarListaHistorial();
    };

    window.clearHistorialLocal = function() {
      if(confirm('¿Seguro que deseas limpiar el historial local de actas subidas?')) {
        localStorage.removeItem('historialActas_v1_' + (window.CURR_COM_CODE || 'GEN'));
        actualizarListaHistorial();
      }
    };

    window.guardarActaCompleta = async function() {
      if(!window.CURR_COM_ID) return alert('No se detectó el ID de la comisión. Por favor refresca la página.');
      const nDiv = document.getElementById('notif-upload');
      
      const fecNodeHead = document.getElementById('i-f-asist');
      const numNodeHead = document.getElementById('i-n-asist');
      if(!fecNodeHead || !numNodeHead) return;
      const dateVal = fecNodeHead.value;
      const numVal = parseInt(numNodeHead.value) || 1;
      
      if(!dateVal) { 
        fecNodeHead.classList.add('error');
        nDiv.innerHTML = '<div class="notif error">❌ Selecciona la <b>Fecha de la reunión</b> antes de guardar.</div>';
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // --- VALIDACION TAREAS ---
      const tbTar = document.getElementById('tb-tareas');
      const rowsTar = tbTar.querySelectorAll('tr');
      const registrosTar = [];
      const userMap = Object.fromEntries((window.SOC_ARR||[]).map(u => [u.nombre_completo.toLowerCase(), u.id]));
      let hasErrTar = false; let errListTar = [];

      rowsTar.forEach((r, idx) => {
        r.querySelectorAll('.ig-input').forEach(i => i.classList.remove('error'));
        const respNode = r.querySelector('.t-resp');
        const descNode = r.querySelector('.t-desc');
        const fecNode = r.querySelector('.t-fec');
        const prioNode = r.querySelector('.t-prio');

        const respName = respNode.value.trim();
        const desc = descNode.value.trim();
        const fec = fecNode.value;
        const prioString = prioNode.value.trim();
        if (!respName && !desc && !fec && !prioString) return; 

        let rErr = false;
        if (!respName || !userMap[respName.toLowerCase()]) { respNode.classList.add('error'); rErr = true; errListTar.push(`Tarea Fila ${idx+1}: Responsable no válido.`); }
        if (!desc) { descNode.classList.add('error'); rErr = true; errListTar.push(`Tarea Fila ${idx+1}: Falta la descripción.`); }
        if (!fec) { fecNode.classList.add('error'); rErr = true; errListTar.push(`Tarea Fila ${idx+1}: Falta la fecha.`); }
        const validPrio = ['Alta','Media','Baja'];
        if (!validPrio.includes(prioString)) { prioNode.classList.add('error'); rErr = true; errListTar.push(`Tarea Fila ${idx+1}: Prioridad no reconocida.`); }

        if (!rErr) {
          registrosTar.push({
            tarea_codigo: r.querySelector('.t-id').value,
            comision_id: window.CURR_COM_ID,
            responsable_id: userMap[respName.toLowerCase()],
            descripcion: desc,
            fecha_limite: fec,
            prioridad: prioString,
            estado: 'Pendiente'
          });
        } else { hasErrTar = true; }
      });

      // --- VALIDACION ASISTENCIA ---
      const tbAsist = document.getElementById('tb-asist');
      const rowsAsist = tbAsist.querySelectorAll('tr');
      const registrosAsist = [];
      let hasErrAsist = false; let errListAsist = [];

      rowsAsist.forEach((r) => {
        r.querySelectorAll('.ig-input').forEach(i => i.classList.remove('error'));
        const sId = r.getAttribute('data-sid');
        const sName = r.querySelector('td:first-child').textContent.trim();
        const estNode = r.querySelector('.a-est');
        const horNode = r.querySelector('.a-hor');
        const minNode = r.querySelector('.a-min');

        let est = estNode.value.trim();
        const hor = horNode.value.trim();
        const min = minNode.value.trim();
        if(!est) return;

        const vEst = ['presente', 'ausente', 'con permiso'];
        if (!vEst.includes(est.toLowerCase())) {
          estNode.classList.add('error'); errListAsist.push(`Asistencia ${sName}: Opción inválida.`); hasErrAsist = true; return;
        }
        if (est.toLowerCase() === 'con permiso') est = 'Con Permiso';
        if (est.toLowerCase() === 'presente') est = 'Presente';
        if (est.toLowerCase() === 'ausente') est = 'Ausente';
        const isPres = est === 'Presente';
        if (isPres) {
          if (!hor) { horNode.classList.add('error'); errListAsist.push(`Asistencia ${sName}: Para asistentes, falta hora.`); hasErrAsist = true; }
          if (!min || isNaN(min)) { minNode.classList.add('error'); errListAsist.push(`Asistencia ${sName}: Para asistentes, falta duración.`); hasErrAsist = true; }
        } else {
          // If NOT Presente, it must be completely blank
          if (hor || min) {
             horNode.classList.add('error'); minNode.classList.add('error');
             errListAsist.push(`Asistencia ${sName}: Si es Ausente o Con Permiso, NO debes colocar hora ni tiempo.`);
             hasErrAsist = true;
          }
        }
        registrosAsist.push({
          socio_id: sId, comision_id: window.CURR_COM_ID, fecha_reunion: dateVal, numero_reunion: numVal,
          estado: est, hora_ingreso: hor || null, tiempo_llamada: (isPres && min) ? parseInt(min) : null,
          _nodes: { estNode, horNode, minNode } 
        });
      });

      if (hasErrTar || hasErrAsist) {
        nDiv.innerHTML = `<div class="notif error">❌ Corrige los errores antes de guardar el acta:<br><ul style="font-size:12px;margin-top:8px">${[...errListTar, ...errListAsist].map(e=>`<li>${e}</li>`).join('')}</ul></div>`;
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (registrosAsist.length === 0 && registrosTar.length === 0) {
        nDiv.innerHTML = '<div class="notif warn">❌ El formulario está completamente en blanco.</div>';
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (registrosAsist.length === 0) {
        nDiv.innerHTML = '<div class="notif warn">❌ Debes registrar la asistencia como requerimiento mínimo.</div>';
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (registrosTar.length === 0) {
        if (!(await showStyledConfirm("⚠️ Acta Sin Tareas", "Vas a procesar esta sesión de trabajo y guardar el acta SIN NINGUNA TAREA NUEVA asignada a los socios.<br><br>¿Estás completamente seguro de continuar solo con la asistencia?"))) {
           return;
        }
      }


      setBtnLoading('btn-save-acta', true, 'Procesando Acta...');
      nDiv.innerHTML = '<div class="notif info">⏳ Guardando todo en la base de datos... no cierres la ventana.</div>';

      try {
        if(registrosTar.length > 0) {
           const { error: err1 } = await sb.from('tareas').upsert(registrosTar, { onConflict: 'tarea_codigo' });
           if (err1) throw new Error("Error en Tareas: " + err1.message);
        }
        if(registrosAsist.length > 0) {
           const dbAsi = registrosAsist.map(({_nodes, ...rest}) => rest);
           const { error: err2 } = await sb.from('asistencia').upsert(dbAsi, { onConflict: 'socio_id,fecha_reunion,comision_id' });
           if (err2) throw new Error("Error en Asistencia: " + err2.message);
        }

        nDiv.innerHTML = '<div class="notif success">✅ <b>ACTA GUARDADA EXITOSAMENTE</b>. Tareas y asistencia registradas.</div>';
        
        tbTar.innerHTML = [1,2,3,4].map(()=>window.genRowT()).join(''); 
        registrosAsist.forEach(r => {
            if(r._nodes) {
                if(r._nodes.estNode) r._nodes.estNode.value = '';
                if(r._nodes.horNode) r._nodes.horNode.value = '';
                if(r._nodes.minNode) r._nodes.minNode.value = '';
            }
        });

        const msgs = [];
        if(registrosTar.length) msgs.push(`<b>${registrosTar.length}</b> Tareas`);
        if(registrosAsist.length) msgs.push(`Asistencia de <b>${registrosAsist.length}</b> socios`);
        
        window.addSessionHistory(`Guardado de Acta N° ${numVal} (${dateVal}) -> ${msgs.join(' y ')}`);

        await loadTareas();
        await loadAsistencia();
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } catch(e) {
        nDiv.innerHTML = '<div class="notif error">❌ Error fatal al guardar acta: ' + e.message + '</div>';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setBtnLoading('btn-save-acta', false, '✔️ GUARDAR ACTA COMPLETA');
      }
    };



    // """"""""""""""""""""""""""""""""""""""""""""""
    // ADMIN DIR PANEL
    // """"""""""""""""""""""""""""""""""""""""""""""
    
    
    window.showStyledAlert = function(title, msg) {
      var o = document.createElement('div');
      o.className = 'swal-overlay';
      var b = document.createElement('div');
      b.className = 'swal-box';
      b.innerHTML = '<h3>'+title+'</h3><p>'+msg+'</p>';
      var btn = document.createElement('button');
      btn.className = 'swal-btn swal-ok';
      btn.textContent = 'Entendido';
      btn.onclick = function(){ o.remove(); };
      b.appendChild(btn);
      o.appendChild(b);
      o.onclick = function(e){ if(e.target===o) o.remove(); };
      document.body.appendChild(o);
    };

    window.showStyledConfirm = function(title, msg) {
      return new Promise(function(resolve) {
        var overlay = document.createElement('div');
        overlay.className = 'swal-overlay';
        var box = document.createElement('div');
        box.className = 'swal-box';
        box.innerHTML = '<h3>' + title + '</h3><p>' + msg + '</p><div style="display:flex;justify-content:center;gap:12px;margin-top:16px"></div>';
        var btnRow = box.querySelector('div:last-child');
        
        var btnNo = document.createElement('button');
        btnNo.className = 'swal-btn';
        btnNo.style.cssText = 'background:#f0f0f0;color:#333;border:1px solid #ddd';
        btnNo.textContent = 'Cancelar';
        btnNo.onclick = function() { overlay.remove(); resolve(false); };
        
        var btnYes = document.createElement('button');
        btnYes.className = 'swal-btn swal-ok';
        btnYes.textContent = 'Sí, continuar';
        btnYes.onclick = function() { overlay.remove(); resolve(true); };
        
        btnRow.appendChild(btnNo);
        btnRow.appendChild(btnYes);
        overlay.appendChild(box);
        overlay.onclick = function(e) { if(e.target === overlay) { overlay.remove(); resolve(false); } };
        document.body.appendChild(overlay);
      });
    };

    window.renderDirDirectorio = async function(ca) {
      ca.innerHTML = '<div style="padding:40px;text-align:center">Cargando directorio...</div>';
      const [{data: usrs}, {data: coms}, {data: ucoms}] = await Promise.all([
        sb.from('usuarios').select('*'),
        sb.from('comisiones').select('*'),
        sb.from('usuario_comisiones').select('*')
      ]);
      const comsActivas = (coms || []).filter(c => c.activa !== false);

      let html = `<div class="sc">
        <div class="sc-head"><div><h3>Directorio de Comisiones</h3><p>Lista de integración por comisión actualmente</p></div></div>
        <div style="padding:32px 28px;">
          <div class="fi-group" style="max-width:400px; margin-bottom:32px;">
            <select id="dir-sel-com" class="fi-select" required onchange="window.showDirectorioCom(this.value)">
              <option value="" selected disabled hidden></option>
              <option value="">Todas las comisiones</option>
              ${comsActivas.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
            </select>
            <label class="fi-label">Filtrar por Comisión</label>
          </div>
          <div id="dir-list-container"></div>
        </div>
      </div>`;

      ca.innerHTML = html;

      window._D_USRS = usrs || [];
      window._D_UCOMS = ucoms || [];

      window.showDirectorioCom = function(cid) {
        const cont = document.getElementById('dir-list-container');
        if(!cid) { cont.innerHTML = ''; return; }
        const activeUcoms = window._D_UCOMS.filter(x => x.comision_id == cid && x.activo !== false);
        const mappedUsers = activeUcoms.map(uc => {
           return window._D_USRS.find(u => u.id === uc.usuario_id);
        }).filter(Boolean); // remove nulls

        if(mappedUsers.length === 0) {
           cont.innerHTML = '<div style="text-align:center;padding:40px;background:#f8fafc;border-radius:16px;border:2px dashed #e2e8f0;"><p style="color:var(--gmid);font-size:14px;margin:0">No hay socios activos registrados en esta comisión.</p></div>';
        } else {
           cont.innerHTML = '<h4 style="margin:0 0 16px 0; color:var(--gdark); font-size:15px; font-weight:700;">Socios en la Comisión ('+mappedUsers.length+')</h4><div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">' + 
             mappedUsers.map(u => `<div style="padding:12px 16px; background:#fff; border:1px solid #e2e8f0; border-radius:12px; display:flex; align-items:center; gap:12px; transition: all 0.2s ease;" onmouseover="this.style.borderColor='var(--blue)';this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                <div style="width:36px; height:36px; border-radius:50%; background:var(--blue-l); color:var(--blue); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0;">${u.nombre_completo.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <span style="font-weight:600; color:var(--gdark); font-size:14px;">${u.nombre_completo}</span>
             </div>`).join('')
           + '</div>';
        }
      };
    };

    window.renderDirAdmin = async function(ca) {
      ca.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:16px"><div class="lds-ring"><div></div><div></div><div></div><div></div></div><p style="color:#94a3b8;font-size:14px;font-weight:500">Cargando panel de administración...</p></div>';
      
      const [{data: usrs}, {data: coms}, {data: ucoms}] = await Promise.all([
        sb.from('usuarios').select('*'),
        sb.from('comisiones').select('*'),
        sb.from('usuario_comisiones').select('*')
      ]);

      var comsActivas = (coms||[]).filter(function(cc){ return cc.activa !== false; });
      var comsInactivas = (coms||[]).filter(function(cc){ return cc.activa === false; });
      var comOpts = comsActivas.map(function(cc){return '<option value="'+cc.id+'">'+cc.nombre+'</option>';}).join('');
      var comInactOpts = comsInactivas.map(function(cc){return '<option value="'+cc.id+'">'+cc.nombre+'</option>';}).join('');
      var usrOpts = (usrs||[]).map(function(uu){return '<option value="'+uu.id+'">'+uu.nombre_completo+'</option>';}).join('');

      ca.innerHTML = '<div class="adm-container">' +
        '<div class="adm-grid">' +

        // Card 1: Nuevo Socio
        '<div class="adm-card">' +
          '<div class="adm-card-header">' +
            '<div class="adm-card-icon blue">👤</div>' +
            '<div><p class="adm-card-title">Añadir Nuevo Socio</p><p class="adm-card-sub">Registra un nuevo miembro y asígnalo a su primera comisión</p></div>' +
          '</div>' +
          '<div class="adm-card-body">' +
            '<div class="fi-group"><input class="fi-input" id="ad-u-nom" placeholder=" " autocomplete="off"><label class="fi-label">Nombre completo del socio</label></div>' +
            '<div class="fi-group"><input class="fi-input" type="email" id="ad-u-em" placeholder=" " autocomplete="off"><label class="fi-label">Correo electrónico (Para que pueda registrarse)</label></div>' +
            '<div class="fi-group"><select class="fi-select" id="ad-u-com"><option value="">Comisión inicial...</option>' + comOpts + '</select></div>' +
            '<button class="adm-action act-blue" onclick="adminCrearUsuario()">✅ Registrar Socio</button>' +
          '</div>' +
        '</div>' +

        // Card 2: Asignar
        '<div class="adm-card">' +
          '<div class="adm-card-header">' +
            '<div class="adm-card-icon cyan">📋</div>' +
            '<div><p class="adm-card-title">Asignar a Comisión</p><p class="adm-card-sub">Mueve un socio existente a una comisión diferente</p></div>' +
          '</div>' +
          '<div class="adm-card-body">' +
            '<div class="fi-group"><select class="fi-select" id="ad-a-com" onchange="window.adminFiltroAddCom(this.value)"><option value="">Seleccione comisión destino...</option>' + comOpts + '</select></div>' +
            '<div class="fi-group"><select class="fi-select" id="ad-a-usr"><option value="">Primero elija una comisión...</option></select><p class="fi-help">Se muestran socios que no pertenecen a la comisión elegida</p></div>' +
            '<button class="adm-action act-blue" onclick="adminAgregarUsuarioComision()">✅ Asignar Socio</button>' +
          '</div>' +
        '</div>' +

        // Card 3: Retirar
        '<div class="adm-card">' +
          '<div class="adm-card-header">' +
            '<div class="adm-card-icon amber">🔄</div>' +
            '<div><p class="adm-card-title">Retirar de Comisión</p><p class="adm-card-sub">Desvincula un socio sin eliminar su historial de participación</p></div>' +
          '</div>' +
          '<div class="adm-card-body">' +
            '<div class="fi-group"><select class="fi-select" id="ad-r-com" onchange="window.adminFiltroRemCom(this.value)"><option value="">Seleccione comisión...</option>' + comOpts + '</select></div>' +
            '<div class="fi-group"><select class="fi-select" id="ad-r-usr"><option value="">Primero elija una comisión...</option></select></div>' +
            '<button class="adm-action act-amber" onclick="adminRetirarUsuarioComision()">⚠️ Retirar de Comisión</button>' +
          '</div>' +
        '</div>' +

        // Card 4: Desactivar Socio
        '<div class="adm-card">' +
          '<div class="adm-card-header">' +
            '<div class="adm-card-icon rose">🚫</div>' +
            '<div><p class="adm-card-title">Retiro Definitivo</p><p class="adm-card-sub">Desactiva completamente a un socio de toda la sociedad</p></div>' +
          '</div>' +
          '<div class="adm-card-body">' +
            '<div class="fi-group"><select class="fi-select" id="ad-d-usr"><option value="">Seleccione socio activo...</option>' + usrOpts + '</select><p class="fi-help">Su historial se conservará pero no podrá ingresar al sistema</p></div>' +
            '<button class="adm-action act-rose" onclick="adminDesactivarSocioFull()">🚫 Desactivar Socio</button>' +
          '</div>' +
        '</div>' +

        // Card 5: Comisiones (full width)
        '<div class="adm-card adm-card-full">' +
          '<div class="adm-card-header">' +
            '<div class="adm-card-icon emerald">🏢</div>' +
            '<div><p class="adm-card-title">Gestión de Comisiones</p><p class="adm-card-sub">Crea, desactiva o reactiva comisiones de la sociedad</p></div>' +
          '</div>' +
          '<div class="adm-card-body" style="display:flex;gap:20px;flex-wrap:wrap">' +
            '<div style="flex:1;min-width:220px">' +
              '<p style="font-size:13px;font-weight:700;color:#1e293b;margin:0 0 12px">➕ Crear nueva</p>' +
              '<div class="fi-group"><input class="fi-input" id="ad-c-nom" placeholder=" " autocomplete="off"><label class="fi-label">Nombre</label></div>' +
              '<div class="fi-group"><input class="fi-input" id="ad-c-cod" placeholder=" " autocomplete="off" style="max-width:140px"><label class="fi-label">Código (3 letras)</label></div>' +
              '<button class="adm-action act-blue" onclick="adminCrearCom()">➕ Crear Comisión</button>' +
            '</div>' +
            '<div style="width:1px;background:#e2e8f0;align-self:stretch"></div>' +
            '<div style="flex:1;min-width:220px">' +
              '<p style="font-size:13px;font-weight:700;color:#1e293b;margin:0 0 12px">⏸️ Desactivar activa</p>' +
              '<div class="fi-group"><select class="fi-select" id="ad-cd-com"><option value="">Comisiones activas...</option>' + comOpts + '</select><p class="fi-help">Se ocultará de KPIs y formularios</p></div>' +
              '<button class="adm-action act-rose" onclick="adminDesactivarCom()">⏸️ Desactivar Comisión</button>' +
            '</div>' +
            '<div style="width:1px;background:#e2e8f0;align-self:stretch"></div>' +
            '<div style="flex:1;min-width:220px">' +
              '<p style="font-size:13px;font-weight:700;color:#16a34a;margin:0 0 12px">▶️ Reactivar inactiva</p>' +
              '<div class="fi-group"><select class="fi-select" id="ad-ca-com"><option value="">Comisiones inactivas...</option>' + comInactOpts + '</select><p class="fi-help">Volverá a aparecer en toda la app</p></div>' +
              '<button class="adm-action act-blue" style="background:linear-gradient(135deg,#16a34a,#15803d)" onclick="adminActivarCom()">▶️ Reactivar Comisión</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '</div></div>';

      // Logic functions scoped to window for the onclick handlers
      window._A_USRS = usrs || [];
      window._A_COMS = coms || [];
      window._A_UCOMS = ucoms || [];

      window.adminFiltroAddCom = function(comId) {
        if(!comId) return;
        const currentIds = window._A_UCOMS.filter(x => x.comision_id == comId && x.activo !== false).map(x => String(x.usuario_id));
        const outUsers = window._A_USRS.filter(u => !currentIds.includes(String(u.id)));
        const select = document.getElementById('ad-a-usr');
        select.innerHTML = '<option value="">Seleccione socio no miembro...</option>' + outUsers.map(u=>`<option value="${u.id}">${u.nombre_completo}</option>`).join('');
      };

      window.adminFiltroRemCom = function(comId) {
        if(!comId) return;
        const currentIds = window._A_UCOMS.filter(x => x.comision_id == comId && x.activo !== false).map(x => String(x.usuario_id));
        const inUsers = window._A_USRS.filter(u => currentIds.includes(String(u.id)));
        const select = document.getElementById('ad-r-usr');
        select.innerHTML = '<option value="">Seleccione socio a retirar...</option>' + inUsers.map(u=>`<option value="${u.id}">${u.nombre_completo}</option>`).join('');
      };

      window.adminCrearUsuario = async function() {
        const nom = document.getElementById('ad-u-nom').value.trim();
        const em = document.getElementById('ad-u-em').value.trim();
        const cid = document.getElementById('ad-u-com').value;
        if(!nom || !em) return alert('Ingrese el nombre y el correo.');
        if(window._A_USRS.find(u => u.nombre_completo.toLowerCase() === nom.toLowerCase())) return alert('Ya existe un socio con este nombre exacto.');
        if(window._A_USRS.find(u => u.email === em)) return alert('Este correo ya está registrado en otro socio.');
        if(!cid) return alert('Elija una comisión inicial.');
        if(!(await showStyledConfirm('👤 Confirmar Alta', `¿Deseas registrar a <b>${nom}</b> como nuevo socio y asignarlo a la comisión seleccionada?`))) return;

        const nomPuro = nom.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        const {data, error} = await sb.from('usuarios').insert({nombre_completo:nom, email:em, usuario: nomPuro + Math.floor(Math.random()*10000)}).select();
        if(error) return alert('Error API: ' + error.message);
        const newUid = data[0].id;
        
        await sb.from('usuario_comisiones').insert({usuario_id: newUid, comision_id: cid, activo: true, cargo: 'socio'});
        showStyledAlert('✅ Socio Registrado', `<b>${nom}</b> fue añadido exitosamente a la base de datos y asignado a su comisión.`);
        goPage('dir-admin');
      };

      window.adminAgregarUsuarioComision = async function() {
        const u = document.getElementById('ad-a-usr').value;
        const c = document.getElementById('ad-a-com').value;
        if(!u || !c) return;
        if(!(await showStyledConfirm('📋 Confirmar Asignación', '¿Estás seguro que deseas asignar a este socio a la comisión seleccionada?'))) return;
        let opError = null;
        const { data: existRecords } = await sb.from('usuario_comisiones').select('id, activo').eq('usuario_id', u).eq('comision_id', c);
        if (existRecords && existRecords.length > 0) {
          if (!existRecords[0].activo) {
            const { error: updErr } = await sb.from('usuario_comisiones').update({ activo: true }).eq('id', existRecords[0].id);
            opError = updErr;
          }
        } else {
          const { error: insErr } = await sb.from('usuario_comisiones').insert({ usuario_id: u, comision_id: c, activo: true, cargo: 'socio' });
          opError = insErr;
        }
        if (opError) return alert('Error API: ' + opError.message);
        showStyledAlert('✅ Asignación Exitosa', 'El socio fue asignado correctamente a la comisión seleccionada.'); goPage('dir-admin');
      };

      window.adminRetirarUsuarioComision = async function() {
        const u = document.getElementById('ad-r-usr').value;
        const c = document.getElementById('ad-r-com').value;
        if(!u || !c) return;
        if(!(await showStyledConfirm('⚠️ Retirar de Comisión', '¿Estás seguro que deseas retirar a este socio de esta comisión específica?'))) return;
        const {error} = await sb.from('usuario_comisiones').update({activo: false}).eq('usuario_id', u).eq('comision_id', c);
        if(error) return alert('Error: '+error.message);
        showStyledAlert('⚠️ Socio Retirado', 'El socio fue retirado de la comisión. Su historial se conserva intacto.'); goPage('dir-admin');
      };

      window.adminDesactivarSocioFull = async function() {
        const u = document.getElementById('ad-d-usr').value;
        if(!u) return;
        if(!(await showStyledConfirm('🚫 Retiro Definitivo', '¿Estás completamente seguro que esta persona dejará DEFINITIVAMENTE la sociedad científica?<br><br>Su historial se conservará pero no podrá ingresar al sistema.'))) return;
        await sb.from('usuario_comisiones').update({activo: false}).eq('usuario_id', u);
        await sb.from('usuarios').update({activo: false}).eq('id', u);
        showStyledAlert('🚫 Retiro Definitivo', 'El socio fue desactivado de todas las comisiones. Su historial permanece para consulta.'); goPage('dir-admin');
      };

      window.adminCrearCom = async function() {
        const n = document.getElementById('ad-c-nom').value.trim();
        const s = document.getElementById('ad-c-cod').value.trim();
        if(!n || !s) return alert('Llene el nombre y la sigla de la comisión');
        if(!(await showStyledConfirm('🏢 Crear Comisión', `¿Deseas crear la comisión <b>${n}</b> con código <b>${s}</b>?`))) return;
        const {error} = await sb.from('comisiones').insert({nombre:n, codigo:s});
        if(error) return alert('Error: '+error.message);
        showStyledAlert('✅ Comisión Creada', 'La nueva comisión fue registrada exitosamente en el sistema.'); goPage('dir-admin');
      };

      window.adminDesactivarCom = async function() {
        const c = document.getElementById('ad-cd-com').value;
        if(!c) return;
        if(!(await showStyledConfirm('⏸️ Desactivar Comisión', '¿Estás seguro que deseas desactivar esta comisión?<br><br>Desaparecerá de los KPIs, formularios y filtros. Sus datos históricos se conservan.'))) return;
        const {error} = await sb.from('comisiones').update({activa: false}).eq('id', c);
        if(error) return alert('Error: '+error.message);
        showStyledAlert('⏸️ Comisión Desactivada', 'La comisión fue desactivada y ya no aparecerá en la operativa de la app.'); goPage('dir-admin');
      };

      window.adminActivarCom = async function() {
        const c = document.getElementById('ad-ca-com').value;
        if(!c) return;
        if(!(await showStyledConfirm('▶️ Reactivar Comisión', '¿Deseas reactivar esta comisión?<br><br>Volverá a aparecer en KPIs, formularios y toda la app.'))) return;
        const {error} = await sb.from('comisiones').update({activa: true}).eq('id', c);
        if(error) return alert('Error: '+error.message);
        showStyledAlert('✅ Comisión Reactivada', 'La comisión fue reactivada exitosamente y ya está disponible en toda la app.'); goPage('dir-admin');
      };

    };


// Expose to window for inline HTML handlers
window.applyGenericPagination = applyGenericPagination;
window.renderGenericPage = renderGenericPage;
window.renderDirTareasPage = renderDirTareasPage;
window.showPanel = showPanel;
window.doForgot = doForgot;
window.setLoginError = setLoginError;
window.setRegisterMsg = setRegisterMsg;
window.setBtnLoading = setBtnLoading;
window.doLogin = doLogin;
window.doRegister = doRegister;
window.loadUserAndEnter = loadUserAndEnter;
window.doLogout = doLogout;
window.loadTareas = loadTareas;
window.loadAsistencia = loadAsistencia;
window.updateEstadoTarea = updateEstadoTarea;
window.updateValidacion = updateValidacion;
window.buildNav = buildNav;
window.goPage = goPage;
window.estadoBadge = estadoBadge;
window.priorBadge = priorBadge;
window.asistBadge = asistBadge;
window.shortName = shortName;
window.sumaMinutos = sumaMinutos;
window.minToHM = minToHM;
window.renderSocioResumen = renderSocioResumen;
window.switchCom = switchCom;
window.renderSocioTareas = renderSocioTareas;
window.renderTareasRows = renderTareasRows;
window.applyFilters = applyFilters;
window.renderSocioAsistencia = renderSocioAsistencia;
window.renderAsistRows = renderAsistRows;
window.updateTiempoTotal = updateTiempoTotal;
window.clearAsistFiltros = clearAsistFiltros;
window.applyAsistFilters = applyAsistFilters;
window.renderEntregar = renderEntregar;
window.renderEntregasRecientes = renderEntregasRecientes;
window.onSelectTarea = onSelectTarea;
window.switchEvidTab = switchEvidTab;
window.handleDrop = handleDrop;
window.handleArchivoSelect = handleArchivoSelect;
window.procesarArchivo = procesarArchivo;
window.clearArchivo = clearArchivo;
window.entregarTarea = entregarTarea;
window.renderLiderResumen = renderLiderResumen;
window.renderLiderTareas = renderLiderTareas;
window.renderLiderTareasRows = renderLiderTareasRows;
window.applyLiderFilters = applyLiderFilters;
window.renderLiderAsistencia = renderLiderAsistencia;
window.renderLiderAsistRows = renderLiderAsistRows;
window.updateTiempoTotalLider = updateTiempoTotalLider;
window.applyLiderAsist = applyLiderAsist;
window.promptEstado = promptEstado;
window.promptValidacion = promptValidacion;
window.closeModal = closeModal;
window.confirmEstado = confirmEstado;
window.renderValidar = renderValidar;
window.evidenciaBtn = evidenciaBtn;
window.renderValidarRows = renderValidarRows;
window.applyValidarFilter = applyValidarFilter;
window.renderSubir = renderSubir;
window.renderDirResumen = renderDirResumen;
window.renderDirTareas = renderDirTareas;
window.renderDirTareasRows = renderDirTareasRows;
window.applyDirTareas = applyDirTareas;
window.renderDirValidar = renderDirValidar;
window.applyDirValidar = applyDirValidar;
window.renderDirAsistencia = renderDirAsistencia;
window.renderDirAsistRows = renderDirAsistRows;
window.updDirTiempo = updDirTiempo;
window.applyDirAsist = applyDirAsist;
window.renderDirSocio = renderDirSocio;
window.filterSociosList = filterSociosList;
window.renderSocioPerfil = renderSocioPerfil;
window.renderEntregadas = renderEntregadas;
window.renderEntregadasRows = renderEntregadasRows;
window.applyEntregadasSocio = applyEntregadasSocio;
window.renderEntregadas_lider = renderEntregadas_lider;
window.renderEntregadasLiderRows = renderEntregadasLiderRows;
window.applyEntregadasLider = applyEntregadasLider;
window.renderDirEntregadas = renderDirEntregadas;
window.renderDirEntregadasRows = renderDirEntregadasRows;
window.applyDirEntregadas = applyDirEntregadas;
window.renderDirLimites = renderDirLimites;