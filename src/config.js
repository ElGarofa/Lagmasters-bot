// config.js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prefijo de los comandos
export const PREFIX = "!";

// Nombre del bot
export const BOT_NAME = "LagMasters";

// Carpeta para guardar sesiones, temp, etc.
export const TEMP_DIR = path.join(__dirname, "..", "assets", "auth");

// Versión de WhatsApp Web que vamos a usar
export const WAWEB_VERSION = [2, 2324, 9]; // ejemplo, versión estable

// Timeout para eventos (ms)
export const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

// ID del grupo donde el bot solo respondería (opcional)
export const ONLY_GROUP_ID = "";

// Modo desarrollo
export const DEVELOPER_MODE = false;