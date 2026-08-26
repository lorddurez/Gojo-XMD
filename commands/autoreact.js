import { getSetting, setSetting } from "../lib/settings.js";

export default {
    name: "autoreact",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;
        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            const current = getSetting(jid, "autoreact");

            return sock.sendMessage(jid, {
                text: `❤️ Auto-react status: ${current ? "ON" : "OFF"}\n\nUse: .autoreact on/off`
            }, { quoted: message });
        }

        setSetting(jid, "autoreact", option === "on");

        await sock.sendMessage(jid, {
            text: `❤️ Auto-react: *${option.toUpperCase()}*`
        }, { quoted: message });
    }
};
