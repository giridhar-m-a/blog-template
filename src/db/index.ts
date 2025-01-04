import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import postgres from "postgres";

const pool = postgres(process.env.AUTH_DRIZZLE_URL!, {
  max: 1,
  prepare: false,
});

const db = drizzle(pool, {
  schema: { ...schema },
  logger: false,
});

export default db;
