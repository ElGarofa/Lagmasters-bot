import { PREFIX } from "../config.js";

export async function handleCommands(sock, msg) {

    const from = msg.key.remoteJid;

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text;

    if (!text) return;

    if (!text.startsWith(PREFIX)) return;

    const command = text.slice(1).toLowerCase();

    if (command === "clan") {

        const message = `
🏆 *LAGMASTERS CLAN*

🎮 Clan oficial
🔥 Comunidad gamer

📌 Discord
https://discord.gg/

🌐 Web
https://lagmasters.com

`;

        await sock.sendMessage(from, { text: message });

    }

}