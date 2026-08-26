export default {
    name: "hidetag",

    async execute(sock, message, args) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(
                jid,
                { text: "❌ This command is for groups only." },
                { quoted: message }
            );
        }

        const metadata = await sock.groupMetadata(jid);

        const mentions = metadata.participants.map(
            participant => participant.id
        );

        const text = args.length
            ? args.join(" ")
            : "📢 Attention everyone!";

        await sock.sendMessage(
            jid,
            {
                text,
                mentions
            },
            { quoted: message }
        );
    }
};
