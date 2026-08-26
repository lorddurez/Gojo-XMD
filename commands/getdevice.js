export default {
    name: "getdevice",

    async execute(sock, message) {
        const jid = message.key.remoteJid;
        const context =
            message.message?.extendedTextMessage?.contextInfo;

        const target = context?.participant;

        if (!target) {
            return sock.sendMessage(
                jid,
                {
                    text: "📱 Reply to someone's message and use `.getdevice`."
                },
                { quoted: message }
            );
        }

        const device = target.split(":")[1] || "unknown";

        let result = "Unknown";

        if (device === "0") {
            result = "WhatsApp Web";
        } else if (device === "1") {
            result = "Android";
        } else if (device === "2") {
            result = "iOS";
        }

        await sock.sendMessage(
            jid,
            {
                text:
                    `📱 *DEVICE INFORMATION*\n\n` +
                    `👤 User: @${target.split("@")[0]}\n` +
                    `📱 Device: ${result}`,
                mentions: [target]
            },
            { quoted: message }
        );
    }
};
