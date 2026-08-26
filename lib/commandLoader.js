import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands() {
    const commandsPath = path.join(__dirname, "..", "commands");
    const files = fs.readdirSync(commandsPath);

    const commands = new Map();

    for (const file of files) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(commandsPath, file);
        const module = await import(pathToFileURL(filePath).href);

        const command = module.default;

        if (!command?.name || typeof command.execute !== "function") {
            continue;
        }

        commands.set(command.name.toLowerCase(), command);
    }

    return commands;
}
