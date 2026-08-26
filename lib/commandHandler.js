export function getCommand(text, prefix = ".") {
    if (!text || !text.startsWith(prefix)) {
        return {
            command: null,
            args: [],
            text: ""
        };
    }

    const body = text.slice(prefix.length).trim();

    if (!body) {
        return {
            command: null,
            args: [],
            text: ""
        };
    }

    const parts = body.split(/\s+/);

    const command = parts.shift().toLowerCase();

    return {
        command,
        args: parts,
        text: parts.join(" ")
    };
}

export function isCommand(text, prefix = ".") {
    return typeof text === "string" &&
        text.startsWith(prefix);
}
