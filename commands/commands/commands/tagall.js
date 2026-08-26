export default {
    name: "tagall",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(
                jid,
                { text: "❌ This command is for groups only." },
                { quoted: message }
            );
        }

        const metadata = await sock.groupMetadata(jid);
        const participants = metadata.participants;

        const mentions = participants.map(
            participant => participant.id
        );

        const text = participants
            .map(
                (participant, index) =>
                    `${index + 1}. @${participant.id.split("@")[0]}`
            )
            .join("\n");

        await sock.sendMessage(
            jid,
            {
                text: `📢 *TAG ALL*\n\n${text}`,
                mentions
            },
            { quoted: message }
        );
    }
};
