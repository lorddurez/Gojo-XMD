import { getSetting, setSetting } from "../lib/settings.js";

export default {
    name: "autoview",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;
        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            const current = getSetting("global", "autoview");

            return sock.sendMessage(jid, {
                text: `👀 Auto-view status: ${current ? "ON" : "OFF"}\n\nUse: .autoview on/off`
            }, { quoted: message });
        }

        setSetting("global", "autoview", option === "on");

        await sock.sendMessage(jid, {
            text: `👀 Auto-view status: *${option.toUpperCase()}*`
        }, { quoted: message });
    }
};
