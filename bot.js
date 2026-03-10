const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("auth")

const sock = makeWASocket({
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (update)=>{
const { qr } = update

if(qr){
qrcode.generate(qr,{small:true})
}
})

sock.ev.on("messages.upsert", ({messages})=>{

const msg = messages[0]

if(!msg.message) return

const text = msg.message.conversation || ""

if(text === "!clan"){
sock.sendMessage(msg.key.remoteJid,{text:"🚀 Lag Masters\nClan competitivo"})
}

})

}

startBot()