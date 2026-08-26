import { config } from "../config.js";

export default {
    name: "menu",

    async execute(sock, message) {
        const jid = message.key.remoteJid;

        const menu = `
╭━━━〔 🤖 ${config.botName} 〕━━━╮
┃
┃ 👑 Owner: ${config.owner.name}
┃ 🇳🇬 Country: ${config.owner.country}
┃
┣━━〔 ⚡ GENERAL 〕━━
┃ • .alive
┃ • .ping
┃ • .owner
┃ • .repo
┃ • .getpfp
┃ • .getdevice
┃ • .getgcid
┃ • .block
┃
┣━━〔 🎨 STICKER 〕━━
┃ • .steal
┃
┣━━〔 👥 GROUP 〕━━
┃ • .welcome on/off
┃ • .members
┃ • .tagall
┃ • .hidetag
┃ • .antilink on/off
┃ • .promote
┃ • .demote
┃ • .kick
┃ • .mute
┃
┣━━〔 🤖 AUTO 〕━━
┃ • .autoview on/off
┃ • .autoreact on/off
┃ • .autoreactchat on/off
┃ • .autorecord on/off
┃ • .autotype on/off
┃
┣━━〔 🎵 MEDIA 〕━━
┃ • .play <song>
┃
┣━━〔 ⚙️ SYSTEM 〕━━
┃ • .runtime
┃ • .speed
┃ • .settings
┃ • .setprefix
┃ • .restart
┃
╰━━━━━━━━━━━━━━━━━━━━╯

⚡ Powered by ${config.botName}
`;

        await sock.sendMessage(
            jid,
            {
                text: menu
            },
            {
                quoted: message
            }
        );
    }
};
