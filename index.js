import { getSetting } from "./lib/settings.js";
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
    for (const message of messages) {
        if (!message?.message) continue;
        if (message.key.fromMe) continue;

        const jid = message.key.remoteJid;
        if (!jid) continue;

        try {
            // 👀 AUTO VIEW STATUS
            if (jid === "status@broadcast") {
                if (getSetting("global", "autoview")) {
                    await sock.readMessages([message.key]);
                }
                continue;
            }

            // ❤️ AUTO REACT
            if (getSetting(jid, "autoreact")) {
                await sock.sendMessage(jid, {
                    react: {
                        text: "❤️",
                        key: message.key
                    }
                });
            }

            // 💬 AUTO REACT CHAT
            if (
                jid.endsWith("@s.whatsapp.net") &&
                getSetting(jid, "autoreactchat")
            ) {
                await sock.sendMessage(jid, {
                    react: {
                        text: "💬",
                        key: message.key
                    }
                });
            }

            // 🎙️ AUTO RECORD
            if (getSetting(jid, "autorecord")) {
                await sock.sendPresenceUpdate("recording", jid);

                setTimeout(async () => {
                    try {
                        await sock.sendPresenceUpdate(
                            "paused",
                            jid
                        );
                    } catch {}
                }, 1500);
            }

            // ⌨️ AUTO TYPE
            if (getSetting(jid, "autotype")) {
                await sock.sendPresenceUpdate("composing", jid);

                setTimeout(async () => {
                    try {
                        await sock.sendPresenceUpdate(
                            "paused",
                            jid
                        );
                    } catch {}
                }, 1500);
            }

            // 🤖 COMMAND HANDLER
            const text = getMessageText(message);

            if (!text) continue;

            const { command, args } =
                getCommand(text, config.prefix);

            if (!command) continue;

            const cmd = commands.get(command);

            if (!cmd) continue;

            await cmd.execute(
                sock,
                message,
                args
            );

        } catch (error) {
            console.error(
                "❌ Message handling error:",
                error
            );
        }
    }
}); => {
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
