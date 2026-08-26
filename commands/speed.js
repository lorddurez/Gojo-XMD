export default {
    name: "speed",

    async execute(sock, message) {
        const start = Date.now();

        const sent = await sock.sendMessage(
            message.key.remoteJid,
            {
                text: "⚡ Testing..."
            },
            { quoted: message }
        );

        const speed = Date.now() - start;

        await sock.sendMessage(
            message.key.remoteJid,
            {
                text: `⚡ *GOJO XMD SPEED*\n\n🚀 ${speed}ms`
            },
            { quoted: sent }
        );
    }
};
