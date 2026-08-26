export default {
    name: "promote",

    async execute(sock, message) {
        const jid = message.key.remoteJid;
        const target =
            message.message?.extendedTextMessage?.contextInfo?.participant;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text: "❌ Group only."
            }, { quoted: message });
        }

        if (!target) {
            return sock.sendMessage(jid, {
                text: "❌ Reply to the member you want to promote."
            }, { quoted: message });
        }

        await sock.groupParticipantsUpdate(
            jid,
            [target],
            "promote"
        );

        await sock.sendMessage(jid, {
            text: `⬆️ @${target.split("@")[0]} promoted to admin.`,
            mentions: [target]
        }, { quoted: message });
    }
};
