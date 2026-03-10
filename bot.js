const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'lagmasters',
  headless: true,
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
})
.then((client) => start(client))
.catch((error) => console.log(error));

function start(client) {

  console.log("BOT LAG MASTERS INICIADO");

  client.onMessage((message) => {

    if (message.body === '!clan') {
      client.sendText(message.from,
      `🚀 *Lag Masters*

Clan competitivo de Rocket League Sideswipe.

Links:
🌐 Web: (tu web)
💬 Discord: (tu discord)
🔥 WhatsApp: grupo oficial

¡Con lag pero con estilo!`);
    }

    if (message.body === '!discord') {
      client.sendText(message.from,
      "💬 Discord del clan:\n(link de discord)");
    }

    if (message.body === '!torneo') {
      client.sendText(message.from,
      "🏆 Próximo torneo del clan pronto...");
    }

    if (message.body === '!clip') {
      client.sendText(message.from,
      "🎥 Mira nuestros clips en TikTok!");
    }

  });

}