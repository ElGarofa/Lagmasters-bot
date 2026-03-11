import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import fs from "fs";
import path from "path";
import { welcomeMessage, exitMessage } from "./messages.js";
import { handleCommands } from "./commands/clan.js";

const AUTH_DIR = path.resolve("./auth");

export async function connectBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;

        if (qr) {
            console.log("📲 Escaneá este QR con WhatsApp:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("✅ LagMasters Bot conectado correctamente!");
        }

        if (connection === "close") {
            console.log("❌ Conexión cerrada. Reconectando...");
            connectBot();
        }
    });

    // Mensajes entrantes
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message?.conversation || "";
        const sender = msg.key.participant || msg.key.remoteJid;

        // Bienvenida y despedida
        if (text === "joined") {
            await sock.sendMessage(msg.key.remoteJid, { text: welcomeMessage.replace("@member", sender) });
        } else if (text === "left") {
            await sock.sendMessage(msg.key.remoteJid, { text: exitMessage.replace("@member", sender) });
        }

        // Comandos
        await handleCommands(sock, msg, text);
    });

    return sock;
}