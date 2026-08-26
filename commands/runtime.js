const started = Date.now();

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

export default {
    name: "runtime",

    async execute(sock, message) {
        const runtime = formatTime(Date.now() - started);

        await sock.sendMessage(
            message.key.remoteJid,
            {
                text:
                    `⏱️ *GOJO XMD RUNTIME*\n\n` +
                    `🟢 Uptime: ${runtime}`
            },
            { quoted: message }
        );
    }
};
