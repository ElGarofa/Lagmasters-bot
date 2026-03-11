import { connectBot } from "./connection.js"

async function start(){
console.log("🚀 Iniciando LagMasters Bot...")
await connectBot()
}

start()