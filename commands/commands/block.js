export default {
    name: "block",

    async execute(sock, message) {
        const jid = message.key.remoteJid;
        const context =
            message.message?.extendedTextMessage?.contextInfo;

        const target =
            context?.participant ||
            (!jid.endsWith("@g.us") ? jid : null);

        if (!target) {
            return sock.sendMessage(
                jid,
                {
                    text: "❌ Reply to someone's message to block them."
                },
                { quoted: message }
            );
        }

        try {
            await sock.updateBlockStatus(target, "block");

            await sock.sendMessage(
                jid,
                {
                    text: `🚫 @${target.split("@")[0]} has been blocked.`,
                    mentions: [target]
                },
                { quoted: message }
            );
        } catch (error) {
            console.error(error);

            await sock.sendMessage(
                jid,
                {
                    text: "❌ Failed to block the user."
                },
                { quoted: message }
            );
        }
    }
};
