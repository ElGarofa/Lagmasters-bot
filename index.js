import { connectBot } from "./src/connection.js";

async function start() {
    console.log("🚀 Iniciando bot LagMasters...");

    const sock = await connectBot();

}

start();