import {z, ZodSchema} from "zod";

export default function parseEnv<T extends ZodSchema>(schema: T): z.infer<T> {
    try {
        return schema.parse(process.env);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
