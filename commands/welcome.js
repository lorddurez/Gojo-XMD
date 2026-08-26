const settings = new Map();

export function getWelcomeSettings() {
    return settings;
}

export default {
    name: "welcome",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text: "❌ Group only."
            }, { quoted: message });
        }

        const option = args[0]?.toLowerCase();

        if (!["on", "off"].includes(option)) {
            return sock.sendMessage(jid, {
                text: "Use: .welcome on/off"
            }, { quoted: message });
        }

        settings.set(jid, option === "on");

        await sock.sendMessage(jid, {
            text: `✅ Welcome message turned *${option}*.`
        }, { quoted: message });
    }
};
