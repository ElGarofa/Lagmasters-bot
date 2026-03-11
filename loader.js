// loader.js

export function load(socket) {

  socket.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0];

    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      "";

    console.log("📩 Mensaje recibido:", text);

    // comando simple
    if (text === "!ping") {

      await socket.sendMessage(from, {
        text: "🏓 Pong! Bot LagMasters activo."
      });

    }

  });

}