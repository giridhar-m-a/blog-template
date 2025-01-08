import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import postgres from "postgres";
// import { config } from "dotenv";
// config({
//   path: "./.env",
// });

if (!process.env.AUTH_DRIZZLE_URL) {
  throw new Error("AUTH_DRIZZLE_URL is not defined");
}

const pool = postgres(process.env.AUTH_DRIZZLE_URL!, {
  max: 1,
  prepare: false,
});

const db = drizzle(pool, {
  schema: { ...schema },
  logger: false,
});

export default db;
