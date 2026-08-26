function getMessageText(message) {
    return (
        message?.conversation ||
        message?.extendedTextMessage?.text ||
        message?.imageMessage?.caption ||
        message?.videoMessage?.caption ||
        message?.documentMessage?.caption ||
        ''
    );
}

function getSender(message) {
    return message?.key?.participant || message?.key?.remoteJid || '';
}

function isGroup(message) {
    return getSender(message).endsWith('@g.us');
}

function getChatId(message) {
    return message?.key?.remoteJid || '';
}

module.exports = {
    getMessageText,
    getSender,
    isGroup,
    getChatId
};
