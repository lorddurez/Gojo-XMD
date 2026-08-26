import fs from "fs";

const file = "./data/settings.json";

function ensureFile() {
    if (!fs.existsSync("./data")) {
        fs.mkdirSync("./data", { recursive: true });
    }

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "{}");
    }
}

function readSettings() {
    ensureFile();

    try {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
        return {};
    }
}

function saveSettings(settings) {
    ensureFile();

    fs.writeFileSync(
        file,
        JSON.stringify(settings, null, 2)
    );
}

export function getSetting(chatId, key, defaultValue = false) {
    const settings = readSettings();

    return settings[chatId]?.[key] ?? defaultValue;
}

export function setSetting(chatId, key, value) {
    const settings = readSettings();

    if (!settings[chatId]) {
        settings[chatId] = {};
    }

    settings[chatId][key] = value;

    saveSettings(settings);
}

export function getAllSettings(chatId) {
    const settings = readSettings();

    return settings[chatId] || {};
}
