import { user } from "@/db/schemas/user";

export type User = typeof user.$inferSelect;
export type Role = "admin" | "seo" | "manager" | "user" | "Super_Admin";
export type ShortUser = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: "user" | "Super_Admin" | "admin" | "manager" | "seo";
  createdAt: Date;
};
