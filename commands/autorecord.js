import { getSetting, setSetting } from "../lib/settings.js";

export default {
    name: "autorecord",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;
        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            const current = getSetting(jid, "autorecord");

            return sock.sendMessage(jid, {
                text: `🎙️ Auto-record: ${current ? "ON" : "OFF"}\n\nUse: .autorecord on/off`
            }, { quoted: message });
        }

        setSetting(jid, "autorecord", option === "on");

        await sock.sendMessage(jid, {
            text: `🎙️ Auto-record: *${option.toUpperCase()}*`
        }, { quoted: message });
    }
};
