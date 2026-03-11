import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"

export async function connectBot() {

const { state, saveCreds } = await useMultiFileAuthState("./auth")

const sock = makeWASocket({
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", ({ connection, qr }) => {

if(qr){
console.log("Escanea el QR:")
qrcode.generate(qr, { small: true })
}

if(connection === "open"){
console.log("✅ Bot conectado")
}

if(connection === "close"){
console.log("❌ Conexión cerrada")
}

})

sock.ev.on("messages.upsert", ({ messages }) => {

const msg = messages[0]

if(!msg.message) return

console.log("📩 Mensaje recibido")

})

}