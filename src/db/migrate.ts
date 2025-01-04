import db from "./index";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./src/db/migrations",
    });
    console.log("Migration complete");
  } catch (e) {
    console.error(e);
  }
};

main();
