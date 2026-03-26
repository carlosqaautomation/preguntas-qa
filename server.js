/**
 * server.js — Backend local para envío automático de WhatsApp
 * Usa whatsapp-web.js para conectarse a tu cuenta de WhatsApp via QR
 *
 * PRIMERA VEZ: escanea el QR que aparece en la terminal con tu WhatsApp
 * SIGUIENTE VEZ: la sesión queda guardada, no necesitas escanear más
 *
 * Cómo usar:
 *   npm install
 *   node server.js
 */

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode   = require('qrcode-terminal');
const express  = require('express');
const cors     = require('cors');

const app  = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

// ── WhatsApp Client ────────────────────────────────────────────
const client = new Client({
  authStrategy: new LocalAuth(),   // guarda la sesión localmente
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let isReady = false;

client.on('qr', (qr) => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  📱  Escanea este QR con tu WhatsApp:');
  console.log('  (Ajustes → Dispositivos vinculados → Vincular dispositivo)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  isReady = true;
  console.log('\n✅  WhatsApp conectado y listo para enviar mensajes');
  console.log(`🌐  Servidor corriendo en http://localhost:${PORT}\n`);
});

client.on('auth_failure', () => {
  console.error('❌  Error de autenticación. Borra la carpeta .wwebjs_auth y vuelve a iniciar.');
});

client.on('disconnected', () => {
  isReady = false;
  console.warn('⚠️   WhatsApp desconectado. Reinicia el servidor.');
});

client.initialize();

// ── Endpoint: estado ───────────────────────────────────────────
app.get('/status', (req, res) => {
  res.json({ ready: isReady });
});

// ── Endpoint: enviar mensaje ───────────────────────────────────
// POST /send  { phone: "521XXXXXXXXXX", message: "texto" }
app.post('/send', async (req, res) => {
  const { phone, message } = req.body;

  if (!isReady) {
    return res.status(503).json({ ok: false, error: 'WhatsApp no está listo aún. Escanea el QR o espera.' });
  }

  if (!phone || !message) {
    return res.status(400).json({ ok: false, error: 'Faltan campos: phone y message son requeridos.' });
  }

  // Formato: número internacional sin + ni espacios, con @c.us
  const chatId = phone.replace(/\D/g, '') + '@c.us';

  try {
    await client.sendMessage(chatId, message);
    console.log(`📤  Mensaje enviado a ${phone}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al enviar:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀  Servidor iniciando en puerto ${PORT}...`);
  console.log('⏳  Inicializando WhatsApp (puede tardar unos segundos)...\n');
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌  El puerto ${PORT} ya está en uso.`);
    console.error(`   Ejecuta este comando para liberarlo y volver a intentarlo:`);
    console.error(`   lsof -ti :${PORT} | xargs kill -9 && node server.js\n`);
  } else {
    console.error('Error al iniciar el servidor:', err.message);
  }
  process.exit(1);
});
