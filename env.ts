import parseEnv from "./framework/readEnv";
import {z} from "zod";

export const env = parseEnv(z.object({
    PORT: z.number().default(3000),
    APP_NAME: z.string().default('Jargon'),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
}).nonstrict());
