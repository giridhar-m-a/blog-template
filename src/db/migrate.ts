import db from "./index";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./src/db/migrations",
    });
    console.log("Migration complete");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
};

main();
