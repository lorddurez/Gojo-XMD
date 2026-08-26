import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";
import readline from "readline";
import { config } from "./config.js";

const logger = pino({ level: "silent" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

async function startBot() {
    const { state, saveCreds } =
        await useMultiFileAuthState(config.sessionFolder);

    const sock = makeWASocket({
        auth: state,
        logger,
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    if (!state.creds.registered) {
        console.log("\n╭────────────────────────╮");
        console.log("│       GOJO XMD          │");
        console.log("│   WhatsApp Pairing      │");
        console.log("╰────────────────────────╯\n");

        let number = await ask(
            "Enter WhatsApp number with country code:\n> "
        );

        number = number.replace(/\D/g, "");

        if (!number) {
            console.log("❌ Invalid phone number.");
            process.exit(1);
        }

        console.log("\n⏳ Generating pairing code...\n");

        const code = await sock.requestPairingCode(number);

        console.log("╭────────────────────────╮");
        console.log(`│ Pairing Code: ${code} │`);
        console.log("╰────────────────────────╯\n");

        console.log(
            "Open WhatsApp → Linked Devices → Link with phone number."
        );
    }

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") {
            console.log("\n✅ GOJO XMD connected successfully!");
            console.log(`🤖 Bot: ${config.botName}`);
        }

        if (connection === "close") {
            const statusCode =
                lastDisconnect?.error?.output?.statusCode;

            if (statusCode !== DisconnectReason.loggedOut) {
                console.log("🔄 Connection closed. Reconnecting...");
                startBot();
            } else {
                console.log("❌ WhatsApp session logged out.");
            }
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const message = messages[0];

        if (!message?.message) return;

        console.log("📩 New message received");
    });
}

startBot().catch(error => {
    console.error("❌ Bot error:", error);
});
