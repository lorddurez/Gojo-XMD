import { getSetting, setSetting } from "../lib/settings.js";

export default {
    name: "autotype",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;
        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            const current = getSetting(jid, "autotype");

            return sock.sendMessage(jid, {
                text: `⌨️ Auto-type: ${current ? "ON" : "OFF"}\n\nUse: .autotype on/off`
            }, { quoted: message });
        }

        setSetting(jid, "autotype", option === "on");

        await sock.sendMessage(jid, {
            text: `⌨️ Auto-type: *${option.toUpperCase()}*`
        }, { quoted: message });
    }
};
