import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands() {
    const commands = new Map();

    const commandsPath = path.join(__dirname, "../commands");
    const files = fs.readdirSync(commandsPath);

    for (const file of files) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(commandsPath, file);
        const command = await import(
            pathToFileURL(filePath).href
        );

        if (command.default?.name) {
            commands.set(
                command.default.name,
                command.default
            );
        }
    }

    return commands;
}
