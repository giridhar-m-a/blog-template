import { user } from "@/db/schemas/user";

export type User = typeof user.$inferSelect;
export type Role = "admin" | "seo" | "manager" | "user" | "Super_Admin";
