export default {
    name: "help",

    async execute(sock, message) {
        await sock.sendMessage(
            message.key.remoteJid,
            {
                text:
                    `📚 *GOJO XMD HELP*\n\n` +
                    `Use *.menu* to see all available commands.\n\n` +
                    `⚡ Prefix: .`
            },
            { quoted: message }
        );
    }
};
