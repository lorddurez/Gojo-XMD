const settings = {};

function ensureChat(jid) {
    if (!settings[jid]) {
        settings[jid] = {
            autoview: false,
            autoreact: false,
            autoreactchat: false,
            autorecord: false,
            autotype: false
        };
    }

    return settings[jid];
}

export function setSetting(jid, name, value) {
    const chat = ensureChat(jid);

    if (!(name in chat)) return false;

    chat[name] = Boolean(value);
    return true;
}

export function getSetting(jid, name) {
    const chat = ensureChat(jid);

    return chat[name] ?? false;
}

export function getAllSettings(jid) {
    return { ...ensureChat(jid) };
}
