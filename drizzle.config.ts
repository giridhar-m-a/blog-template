import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({
  path: "./.env",
});

export default defineConfig({
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
});
