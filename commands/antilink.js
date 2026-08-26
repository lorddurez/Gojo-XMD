const settings = new Map();

export function getAntiLinkSettings() {
    return settings;
}

export default {
    name: "antilink",

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
                text: "Use: .antilink on/off"
            }, { quoted: message });
        }

        settings.set(jid, option === "on");

        await sock.sendMessage(jid, {
            text: `🔗 Anti-link is now *${option}*.`
        }, { quoted: message });
    }
};
