export function getMessageText(message) {
    if (!message?.message) return "";

    const msg = message.message;

    return (
        msg.conversation ||
        msg.extendedTextMessage?.text ||
        msg.imageMessage?.caption ||
        msg.videoMessage?.caption ||
        ""
    ).trim();
}

export function getSender(message) {
    return (
        message?.key?.participant ||
        message?.key?.remoteJid ||
        ""
    );
}

export function isGroup(message) {
    return message?.key?.remoteJid?.endsWith("@g.us");
}

export function getChatId(message) {
    return message?.key?.remoteJid || "";
}
