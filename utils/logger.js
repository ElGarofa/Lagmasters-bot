// utils/logger.js

export function bannerLog() {

console.log(`
====================================
        LAGMASTERS BOT
====================================
`);

}

export function infoLog(message) {
console.log("ℹ️ INFO:", message);
}

export function successLog(message) {
console.log("✅ SUCCESS:", message);
}

export function warningLog(message) {
console.log("⚠️ WARNING:", message);
}

export function errorLog(message) {
console.log("❌ ERROR:", message);
}