import {migrate} from "drizzle-orm/postgres-js/migrator";
import db from "./src/db";

migrate(db, { migrationsFolder: "drizzle" }).then(() => {
    console.log("Migrations ran successfully");
}).catch((err) => {
    console.log("Error running migrations", err);
});
