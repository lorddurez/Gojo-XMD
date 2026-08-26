export default {
    name: "alive",

    async execute(sock, message) {
        await sock.sendMessage(
            message.key.remoteJid,
            {
                text:
                    "🟢 *GOJO XMD IS ALIVE!*\n\n" +
                    "🤖 Bot: GOJO XMD\n" +
                    "👑 Owner: Durez\n" +
                    "🇳🇬 Country: Nigeria"
            },
            {
                quoted: message
            }
        );
    }
};
