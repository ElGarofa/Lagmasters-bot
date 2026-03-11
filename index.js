// index.js
import { connectBot } from "./connection.js";
import { connectBot } from "./config.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { bannerLog, errorLog, infoLog, warningLog } from "./utils/logger.js";

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) return;
  errorLog(`Error crítico no capturado: ${error.message}`);
});

process.on("unhandledRejection", (reason) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) return;
  errorLog(`Promesa rechazada no tratada: ${reason}`);
});

async function startBot() {
  try {
    process.setMaxListeners(1500);
    bannerLog();
    infoLog("Iniciando bot LagMasters...");

    const socket = await connectBot();
    load(socket);

    setInterval(() => {
      const stats = badMacHandler.getStats();
      if (stats.errorCount > 0) {
        warningLog(
          `BadMacHandler stats: ${stats.errorCount}/${stats.maxRetries} errores`
        );
      }
    }, 300_000);
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      warningLog("Error Bad MAC al iniciar. Reintentando...");
      setTimeout(startBot, 5000);
      return;
    }
    errorLog(`Error al iniciar el bot: ${error.message}`);
    process.exit(1);
  }
}

startBot();