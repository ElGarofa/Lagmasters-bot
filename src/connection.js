import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";
import readline from "readline";
import { handleCommands } from "./commands.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(text) {
    return new Promise(resolve => rl.question(text, resolve));
}

export async function connectBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    if (!sock.authState.creds.registered) {

        const number = await question("📱 Ingresa tu número (ej: 5491122334455): ");

        const code = await sock.requestPairingCode(number);

        console.log("\n🔑 Código de vinculación:");
        console.log(code);
        console.log("\nEn tu WhatsApp:");
        console.log("Dispositivos vinculados → Vincular con código");
    }

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

        if (connection === "open") {
            console.log("✅ Bot conectado correctamente");
        }

        if (connection === "close") {

            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("🔄 Reconectando...");
                connectBot();
            } else {
                console.log("❌ Sesión cerrada. Volvé a iniciar.");
            }
        }

    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        await handleCommands(sock, msg);

    });

    return sock;
}