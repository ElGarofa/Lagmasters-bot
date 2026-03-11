// utils/badMacHandler.js

let errorCount = 0;
const maxRetries = 5;

export const badMacHandler = {

  handleError(error) {

    if (!error) return false;

    const message = error?.message || error?.toString();

    if (message && message.includes("Bad MAC")) {
      errorCount++;
      console.log("⚠️ Error Bad MAC detectado:", errorCount);

      if (errorCount >= maxRetries) {
        console.log("❌ Demasiados errores Bad MAC.");
      }

      return true;
    }

    return false;
  },

  resetErrorCount() {
    errorCount = 0;
  },

  getStats() {
    return {
      errorCount,
      maxRetries
    };
  },

  clearProblematicSessionFiles() {
    console.log("🧹 Limpiar sesión manualmente si es necesario.");
  }

};