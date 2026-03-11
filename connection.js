import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";

import { bannerLog, successLog, infoLog, warningLog } from "./utils/logger.js";
import { load } from "./loader.js";

export async function connectBot() {

  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const socket = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  socket.ev.on("creds.update", saveCreds);

  socket.ev.on("connection.update", (update) => {

    const { connection, lastDisconnect } = update;

    if (connection === "open") {

      bannerLog();
      successLog("Bot LagMasters conectado!");

    }

    if (connection === "close") {

      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      warningLog("Conexión cerrada");

      if (shouldReconnect) {
        connectBot();
      }

    }

    if (connection === "connecting") {
      infoLog("Conectando...");
    }

  });

  load(socket);

  return socket;

}