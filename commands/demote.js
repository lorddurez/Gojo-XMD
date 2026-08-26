export default {
    name: "demote",

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
                text: "❌ Reply to the admin you want to demote."
            }, { quoted: message });
        }

        await sock.groupParticipantsUpdate(
            jid,
            [target],
            "demote"
        );

        await sock.sendMessage(jid, {
            text: `⬇️ @${target.split("@")[0]} is no longer an admin.`,
            mentions: [target]
        }, { quoted: message });
    }
};
