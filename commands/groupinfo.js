export default {
    name: "groupinfo",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us"))
            return sock.sendMessage(jid, {
                text: "❌ Group only."
            });

        const group = await sock.groupMetadata(jid);

        const admins = group.participants.filter(
            p => p.admin
        );

        await sock.sendMessage(jid, {
            text:
                `╭━━〔 👥 GROUP INFO 〕━━╮\n` +
                `┃\n` +
                `┃ 📛 Name: ${group.subject}\n` +
                `┃ 👤 Members: ${group.participants.length}\n` +
                `┃ 👑 Admins: ${admins.length}\n` +
                `┃ 🆔 ID: ${jid}\n` +
                `┃\n` +
                `╰━━━━━━━━━━━━━━━━╯`
        }, { quoted: message });
    }
};
