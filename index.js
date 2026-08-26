import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";
import readline from "readline";

import { config } from "./config.js";
import { getCommand } from "./lib/commandHandler.js";
import { getMessageText } from "./lib/message.js";
import { loadCommands } from "./lib/commandLoader.js";

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

    const commands = await loadCommands();

    console.log(`\n🤖 ${config.botName} starting...`);
    console.log(`📦 Commands loaded: ${commands.size}`);

    if (!state.creds.registered) {
        let number = await ask(
            "\n📱 Enter WhatsApp number with country code:\n> "
        );

        number = number.replace(/\D/g, "");

        if (!number) {
            console.log("❌ Invalid phone number.");
            process.exit(1);
        }

        console.log("\n⏳ Generating pairing code...\n");

        const code = await sock.requestPairingCode(number);

        console.log(`🔐 Pairing Code: ${code}`);
        console.log(
            "\nOpen WhatsApp → Linked Devices → Link with phone number."
        );
    }

    sock.ev.on(
        "connection.update",
        ({ connection, lastDisconnect }) => {

            if (connection === "open") {
                console.log(
                    `\n✅ ${config.botName} is online!`
                );
            }

            if (connection === "close") {
                const statusCode =
                    lastDisconnect?.error?.output?.statusCode;

                if (statusCode !== DisconnectReason.loggedOut) {
                    console.log("🔄 Reconnecting...");
                    startBot();
                } else {
                    console.log("❌ WhatsApp session logged out.");
                }
            }
        }
    );

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const message = messages[0];

        if (!message?.message) return;

        const text = getMessageText(message);

        if (!text) return;

        const { command, args } =
            getCommand(text, config.prefix);

        if (!command) return;

        const cmd = commands.get(command);

        if (!cmd) return;

        try {
            await cmd.execute(
                sock,
                message,
                args
            );
        } catch (error) {
            console.error(
                `❌ Error in .${command}:`,
                error
            );
        }
    });
}

startBot().catch(error => {
    console.error("❌ Fatal error:", error);
});
