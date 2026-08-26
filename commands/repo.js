import { config } from "../config.js";

export default {
    name: "repo",

    async execute(sock, message) {
        const text =
            `📦 *${config.botName} REPOSITORY*\n\n` +
            `🔗 https://github.com/lorddurez/Gojo-XMD\n\n` +
            `⭐ Star the repository if you like the bot!`;

        await sock.sendMessage(
            message.key.remoteJid,
            { text },
            { quoted: message }
        );
    }
};
