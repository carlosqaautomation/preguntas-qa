/* ================================================================
   app.js — Lógica principal de la SPA (QA/Testing Edition)
   ================================================================ */

const LOCAL_SERVER = 'ttps://9162-181-66-150-8.ngrok-free.app'; // reemplazá con tu dominio de ngrok

const state = {
  currentView: 'home',
  currentTopic: null,
  filteredQuestions: [],
  whatsappMode: false,
  whatsappPhone: '',
  serverAvailable: false
};

// ── Bootstrap ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderTopics();
  bindNavEvents();
  bindModalEvents();
  checkServer();
});

// ── Verificar servidor local ───────────────────────────────────
async function checkServer() {
  try {
    const res = await fetch(`${LOCAL_SERVER}/status`, { signal: AbortSignal.timeout(2000) });
    const data = await res.json();
    state.serverAvailable = data.ready;
    updateServerBadge();
  } catch {
    state.serverAvailable = false;
    updateServerBadge();
  }
}

function updateServerBadge() {
  const badge = document.getElementById('serverBadge');
  if (!badge) return;
  if (state.serverAvailable) {
    badge.textContent = '🟢 Servidor conectado';
    badge.style.color = '#16a34a';
  } else {
    badge.textContent = '🔴 Servidor offline';
    badge.style.color = '#dc2626';
  }
}

// ── Render topic cards on home ─────────────────────────────────
function renderTopics() {
  const grid = document.getElementById('topicsGrid');

  grid.innerHTML = Object.entries(topics).map(([key, topic]) => {
    const count = questions.filter(q => q.topics.includes(key)).length;
    return `
      <div class="topic-card" data-topic="${key}" style="--card-color: ${topic.color}">
        <div class="topic-icon">${topic.icon}</div>
        <h3 class="topic-name">${topic.name}</h3>
        <span class="topic-count">${count} pregunta${count !== 1 ? 's' : ''}</span>
        <span class="topic-arrow">→</span>
      </div>`;
  }).join('');

  grid.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => showQA(card.dataset.topic));
  });
}

// ── Show QA for a topic ────────────────────────────────────────
function showQA(topicKey) {
  state.currentTopic = topicKey;
  state.filteredQuestions = questions.filter(q => q.topics.includes(topicKey));

  const topic = topics[topicKey];
  document.getElementById('qaTitle').textContent = `${topic.icon}  ${topic.name}`;
  document.getElementById('statTopic').textContent = topic.name;
  document.getElementById('statCount').textContent = state.filteredQuestions.length;

  renderQACards();
  syncWhatsAppButton();
  switchView('qa');
}

// ── Render Q&A cards ───────────────────────────────────────────
function renderQACards() {
  const container = document.getElementById('qaContainer');

  container.innerHTML = state.filteredQuestions.map((item, i) => {
    const topicChips = item.topics
      .map(t => `<span class="topic-tag" style="--tag-color:${topics[t].color}">${topics[t].icon} ${topics[t].name}</span>`)
      .join('');

    return `
      <article class="qa-card">
        <div class="qa-question">
          <span class="qa-badge">P${i + 1}</span>
          <div class="qa-question-body">
            <p>${escapeHtml(item.q)}</p>
            <div class="topic-tags">${topicChips}</div>
          </div>
        </div>
        <div class="qa-answer">
          <span class="qa-answer-label">R</span>
          <p>${escapeHtml(item.a)}</p>
        </div>
        ${state.whatsappMode ? buildWhatsAppAction(i) : ''}
      </article>`;
  }).join('');

  if (state.whatsappMode) {
    container.querySelectorAll('.btn-send-whatsapp').forEach(btn => {
      btn.addEventListener('click', () => sendToWhatsApp(Number(btn.dataset.index)));
    });
  }
}

function buildWhatsAppAction(index) {
  return `
    <div class="qa-actions">
      <button class="btn-send-whatsapp" data-index="${index}" title="Enviar esta respuesta por WhatsApp">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94
          1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297
          -.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149
          -.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272
          .297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262
          .489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413
          -.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648
          -.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825
          9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16
          5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554
          0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Enviar por WhatsApp
      </button>
    </div>`;
}

// ── WhatsApp send ──────────────────────────────────────────────
async function sendToWhatsApp(index) {
  const item  = state.filteredQuestions[index];
  const topic = topics[state.currentTopic];

  const message =
    `*${topic.icon} ${topic.name} — Pregunta QA*\n\n` +
    `*❓ Pregunta:*\n${item.q}\n\n` +
    `*✅ Respuesta:*\n${item.a}\n\n` +
    `_Preparación de entrevistas QA_`;

  // ── Envío AUTOMÁTICO vía servidor local ─────────────────────
  if (state.whatsappPhone && state.serverAvailable) {
    const btn = document.querySelector(`.btn-send-whatsapp[data-index="${index}"]`);
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Enviando…'; }

    try {
      const res = await fetch(`${LOCAL_SERVER}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: state.whatsappPhone, message })
      });
      const data = await res.json();
      if (data.ok) {
        showToast('✅ ¡Mensaje enviado por WhatsApp!', 'success');
        if (btn) { btn.textContent = '✅ Enviado'; }
        setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = 'Enviar por WhatsApp'; } }, 3000);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (err) {
      showToast(`❌ ${err.message}`, 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar por WhatsApp'; }
    }
    return;
  }

  // ── Fallback: abrir WhatsApp con el mensaje ─────────────────
  const phone = state.whatsappPhone;
  const url   = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('¡Abriendo WhatsApp!', 'success');
}

// ── Toggle WhatsApp mode ───────────────────────────────────────
function toggleWhatsAppMode() {
  if (!state.whatsappMode) {
    openPhoneModal();
  } else {
    state.whatsappMode = false;
    state.whatsappPhone = '';
    syncWhatsAppButton();
    renderQACards();
    showToast('Modo WhatsApp desactivado', 'info');
  }
}

function syncWhatsAppButton() {
  const btn  = document.getElementById('btnToggleWhatsapp');
  const badge = document.getElementById('modeBadge');

  if (state.whatsappMode) {
    btn.textContent = '❌  Desactivar WhatsApp';
    btn.classList.add('active');
    badge.className = 'mode-badge whatsapp';
    badge.textContent = state.serverAvailable ? '🤖 Envío Automático' : '📱 Modo WhatsApp';
  } else {
    btn.textContent = '📱  Modo WhatsApp';
    btn.classList.remove('active');
    badge.className = 'mode-badge normal';
    badge.textContent = '👁 Modo Lectura';
  }
}

// ── Phone modal ────────────────────────────────────────────────
function openPhoneModal() {
  document.getElementById('phoneModal').classList.add('active');
  document.getElementById('phoneInput').focus();
}

function closePhoneModal() {
  document.getElementById('phoneModal').classList.remove('active');
}

function confirmPhone() {
  const raw = document.getElementById('phoneInput').value.trim();
  state.whatsappPhone = raw.replace(/\D/g, '');
  state.whatsappMode  = true;
  closePhoneModal();
  checkServer().then(() => {
    syncWhatsAppButton();
    renderQACards();
    if (state.serverAvailable) {
      showToast(`🤖 Envío automático listo para +${state.whatsappPhone}`, 'success');
    } else {
      showToast('📱 Modo WhatsApp activado (servidor offline → abrirá WhatsApp)', 'info');
    }
  });
}

// ── View routing ───────────────────────────────────────────────
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(view + 'View').classList.add('active');
  state.currentView = view;
  if (view === 'home') {
    state.currentTopic = null;
    state.filteredQuestions = [];
    state.whatsappMode = false;
    state.whatsappPhone = '';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Nav & modal bindings ───────────────────────────────────────
function bindNavEvents() {
  document.getElementById('navBrand').addEventListener('click', () => switchView('home'));
  document.getElementById('btnHome').addEventListener('click', () => switchView('home'));
  document.getElementById('btnBack').addEventListener('click', () => switchView('home'));
  document.getElementById('btnToggleWhatsapp').addEventListener('click', toggleWhatsAppMode);
}

function bindModalEvents() {
  document.getElementById('btnModalCancel').addEventListener('click', closePhoneModal);
  document.getElementById('btnModalConfirm').addEventListener('click', confirmPhone);
  document.getElementById('phoneInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmPhone();
    if (e.key === 'Escape') closePhoneModal();
  });
  // Close on backdrop click
  document.getElementById('phoneModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closePhoneModal();
  });
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(24px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ── Utility ───────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
