/**
 * Module dependencies.
 */
import * as fs from 'fs';
import * as path from 'path';

/**
 * Constants for HTTP methods.
 */
const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

/**
 * Type definition for the Routes object, which is a recursive record of Routes objects.
 */
export interface RoutesInterface {
    [key: string]: RoutesInterface | string;
}

/**
 * Recursively converts a file directory structure to an object.
 * Each recognized .ts file is attached as a property, named by HTTP methods.
 *
 * @param  {string} folderPath - folder path to be converted to an object.
 * @param  {string} [base] - base path relative to the root directory.
 * @return {Record<string, any>} converted object.
 */
function folderToObj(folderPath: string, base?: string): RoutesInterface {
    const result: Record<string, any> = {};
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            result[file] = folderToObj(filePath, base ? `${base}/${file}` : `${folderPath}/${file}`);
        } else if (file.endsWith('.ts')) {
            const methodName = file.replace('.ts', '').toUpperCase();

            if (HTTP_METHODS.includes(methodName)) {
                const filePath = base ? path.join(base, file) : path.join(folderPath, file);
                try {
                    result[methodName] = require(`${filePath}`).default;
                } catch {
                    console.warn(`No default export in ${path}`);
                }
            }
        }
    }

    return result;
}

/**
 * Returns a recursively transformed object from the directory structure.
 *
 * @return { Record<string, RoutesInterface> } Returns the folder structure object.
 */
export default function getRoutes(folderPath: string = 'routes'): RoutesInterface {
    return folderToObj(folderPath);
}
