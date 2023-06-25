import * as fs from 'fs';
import * as path from 'path';

function folderToObj(folderPath: string, base?: string): Record<string, any> {
    const result: Record<string, any> = {};
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            result[file] = folderToObj(filePath, base ? `${base}/${file}` : `${folderPath}/${file}`)
        } else if (file.endsWith('.ts')) {
            const methodName = file.replace('.ts', '').toUpperCase();

            if (["GET", "POST", "PUT", "DELETE", "PATCH"].includes(methodName)) {
                const path = base ? `${base}/${file}` : `${folderPath}/${file}`;

                result[methodName] = require(`./${path}`).default ?? (() => {
                    throw new Error(`No default export in ${path}`);
                });
            }
        }
    }

    return result;
}

const folderPath = 'routes';

export default function getRoutes() {
    return folderToObj(folderPath);
}
