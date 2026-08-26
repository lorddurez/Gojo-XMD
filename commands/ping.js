export default {
    name: "ping",

    async execute(sock, message) {
        const start = Date.now();

        const sent = await sock.sendMessage(
            message.key.remoteJid,
            {
                text: "🏓 Checking speed..."
            },
            {
                quoted: message
            }
        );

        const speed = Date.now() - start;

        await sock.sendMessage(
            message.key.remoteJid,
            {
                text: `🏓 *PONG!*\n\n⚡ Speed: ${speed}ms\n🤖 GOJO XMD`
            },
            {
                quoted: sent
            }
        );
    }
};
