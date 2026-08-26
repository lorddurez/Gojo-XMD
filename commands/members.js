export default {
    name: "members",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text: "❌ Group only."
            }, { quoted: message });
        }

        const metadata = await sock.groupMetadata(jid);

        await sock.sendMessage(jid, {
            text:
                `👥 *GROUP MEMBERS*\n\n` +
                `📛 Name: ${metadata.subject}\n` +
                `👤 Members: ${metadata.participants.length}`
        }, { quoted: message });
    }
};
