import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";
import { handleCommands } from "./commands.js";

export async function connectBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection }) => {

        if (connection === "open") {
            console.log("✅ Bot conectado a WhatsApp");
        }

        if (connection === "close") {
            console.log("❌ Conexión cerrada");
        }

    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        await handleCommands(sock, msg);

    });

    return sock;
}