import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"

export async function connectBot() {

const { state, saveCreds } = await useMultiFileAuthState("auth")

const sock = makeWASocket({
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (update) => {

const { connection, qr } = update

if (qr) {
console.log("📱 Escanea este QR:")
console.log(qr)
}

if (connection === "open") {
console.log("✅ Bot conectado")
}

if (connection === "close") {
console.log("❌ Conexión cerrada")
}

})

}