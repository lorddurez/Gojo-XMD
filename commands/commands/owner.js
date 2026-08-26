import { config } from "../config.js";

export default {
    name: "owner",

    async execute(sock, message) {
        const text =
            `👑 *GOJO XMD OWNER*\n\n` +
            `👤 Name: ${config.owner.name}\n` +
            `📱 Telegram: ${config.owner.telegram}\n` +
            `🇳🇬 Country: ${config.owner.country}\n` +
            `📧 Email: ${config.owner.email}`;

        await sock.sendMessage(
            message.key.remoteJid,
            { text },
            { quoted: message }
        );
    }
};
