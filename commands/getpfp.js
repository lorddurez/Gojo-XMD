export default {
    name: "getpfp",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        let target = jid;

        if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            target =
                message.message.extendedTextMessage.contextInfo.participant;
        }

        try {
            const url = await sock.profilePictureUrl(target, "image");

            await sock.sendMessage(
                jid,
                {
                    image: { url },
                    caption: "🖼️ Profile Picture\n🤖 GOJO XMD"
                },
                { quoted: message }
            );
        } catch {
            await sock.sendMessage(
                jid,
                {
                    text: "❌ No profile picture found."
                },
                { quoted: message }
            );
        }
    }
};
