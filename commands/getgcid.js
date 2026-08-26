export default {
    name: "getgcid",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(
                jid,
                {
                    text: "❌ This command can only be used in a group."
                },
                { quoted: message }
            );
        }

        await sock.sendMessage(
            jid,
            {
                text: `🆔 *GROUP ID*\n\n${jid}`
            },
            { quoted: message }
        );
    }
};
