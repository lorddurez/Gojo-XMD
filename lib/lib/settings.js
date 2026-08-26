const settings = {
    autoview: false,
    autoreact: false,
    autoreactchat: false,
    autorecord: false,
    autotype: false
};

function setSetting(name, value) {
    if (!(name in settings)) return false;

    settings[name] = Boolean(value);
    return true;
}

function getSetting(name) {
    return settings[name] ?? false;
}

function getAllSettings() {
    return { ...settings };
}

module.exports = {
    setSetting,
    getSetting,
    getAllSettings
};
