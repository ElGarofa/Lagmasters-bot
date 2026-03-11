export async function handleCommands(sock, msg, text) {
    const jid = msg.key.remoteJid;

    if (text.toLowerCase() === "!clan") {
        await sock.sendMessage(jid, {
            text: "🏆 Clan LagMasters\n- Miembros: 42\n- Ranking: Oro 🔥"
        });
    }

    // Podés agregar más comandos aquí
}