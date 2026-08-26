export default {
    name: "ping",

    async execute(sock, message) {
        await sock.sendMessage(
            message.key.remoteJid,
            {
                text: "🏓 Pong!\n\n🤖 GOJO XMD"
            },
            {
                quoted: message
            }
        );
    }
};
