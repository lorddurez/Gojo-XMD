import { getSetting, setSetting } from "../lib/settings.js";

export default {
    name: "autoreactchat",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;
        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            const current = getSetting(jid, "autoreactchat");

            return sock.sendMessage(jid, {
                text: `💬 Auto-react chat: ${current ? "ON" : "OFF"}\n\nUse: .autoreactchat on/off`
            }, { quoted: message });
        }

        setSetting(jid, "autoreactchat", option === "on");

        await sock.sendMessage(jid, {
            text: `💬 Auto-react chat: *${option.toUpperCase()}*`
        }, { quoted: message });
    }
};
