export default {
    name: "kick",

    async execute(sock, message) {
        const jid = message.key.remoteJid;
        const target =
            message.message?.extendedTextMessage?.contextInfo?.participant;

        if (!jid.endsWith("@g.us"))
            return sock.sendMessage(jid, { text: "❌ Group only." });

        if (!target)
            return sock.sendMessage(jid, {
                text: "❌ Reply to the member you want to remove."
            }, { quoted: message });

        await sock.groupParticipantsUpdate(jid, [target], "remove");

        await sock.sendMessage(jid, {
            text: `👢 @${target.split("@")[0]} has been removed.`,
            mentions: [target]
        }, { quoted: message });
    }
};
