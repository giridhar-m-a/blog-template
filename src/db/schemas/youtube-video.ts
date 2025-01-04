import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const youtubeVideo = pgTable("youtube_videos", {
  id: serial("id").primaryKey().notNull().unique(),
  title: text("title").notNull(),
  url: text("url").notNull(),
});
