// connection.js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { TEMP_DIR, WAWEB_VERSION, PREFIX } from "./src/config.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { bannerLog, successLog, infoLog, warningLog, errorLog } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpeta temporal si no existe
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

export async function connectBot() {
  const authFolder = path.resolve(__dirname, "..", "assets", "auth");

  // Estado de autenticación
  const { state, saveCreds } = await useMultiFileAuthState(authFolder);

  const socket = makeWASocket({
    version: WAWEB_VERSION,
    auth: state,
    printQRInTerminal: true, // Opcional si querés ver QR en consola
    connectTimeoutMs: 20_000,
    keepAliveIntervalMs: 30_000,
  });

  // Guardar credenciales
  socket.ev.on("creds.update", saveCreds);

  // Eventos de conexión
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      warningLog(`Conexión cerrada. Status: ${code}`);
      if (lastDisconnect?.error?.toString().includes("Bad MAC")) {
        warningLog("Bad MAC detectado. Limpiando credenciales...");
        badMacHandler.clearProblematicSessionFiles();
      }
      // Reintentar reconexión
      setTimeout(connectBot, 5000);
    } else if (connection === "open") {
      bannerLog();
      successLog("✅ Bot LagMasters conectado!");
      infoLog(`Prefix: ${PREFIX}`);
    } else if (connection === "connecting") {
      infoLog("Conectando...");
    }
  });

  return socket;
}