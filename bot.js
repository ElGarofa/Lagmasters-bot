const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'lagmasters'
})
.then((client) => start(client))
.catch((error) => console.log(error));

function start(client) {

  client.onParticipantsChanged(async (event) => {

  const grupo = event.chatId;
  const usuario = event.who;

  if (event.action === 'add') {

    await client.sendText(grupo,
`🚀 Bienvenido a *Lag Masters*

@${usuario.split('@')[0]}

Clan de Rocket League Sideswipe
Usa !clan para ver info`,
{
  mentions: [usuario]
});

  }

  if (event.action === 'remove') {

    await client.sendText(grupo,
`👋 Un jugador salió del clan.

Lag Masters sigue creciendo 🚀`);

  }

});

}