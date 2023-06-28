import {Pool} from "pg";
import {drizzle} from "drizzle-orm/node-postgres";
import {env} from "../../env";

const pool = new Pool({
    connectionString: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
});

const db = drizzle(pool);

export default db;
