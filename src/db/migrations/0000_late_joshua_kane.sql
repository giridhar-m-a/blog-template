CREATE TYPE "public"."token_purpose" AS ENUM('verification', 'forgetPassword', 'newUser', 'review');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('Super_Admin', 'admin', 'manager', 'seo', 'user');--> statement-breakpoint
CREATE TABLE "blog_post_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "blog_post_categories_id_unique" UNIQUE("id"),
	CONSTRAINT "blog_post_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"description" text NOT NULL,
	"keywords" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"user_id" uuid NOT NULL,
	"image_id" integer,
	CONSTRAINT "blog_posts_id_unique" UNIQUE("id"),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "blogs_to_categories" (
	"post_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "blogs_to_categories_post_id_category_id_pk" PRIMARY KEY("post_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" text NOT NULL,
	"file_name" text NOT NULL,
	"url" text NOT NULL,
	"alt_text" text NOT NULL,
	"height" integer NOT NULL,
	"width" integer NOT NULL,
	CONSTRAINT "images_id_unique" UNIQUE("id"),
	CONSTRAINT "images_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "images_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" text NOT NULL,
	"public_id" text NOT NULL,
	"url" text NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "profile_id_unique" UNIQUE("id"),
	CONSTRAINT "profile_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"purpose" "token_purpose" DEFAULT 'verification' NOT NULL,
	CONSTRAINT "tokens_id_unique" UNIQUE("id"),
	CONSTRAINT "tokens_token_unique" UNIQUE("token"),
	CONSTRAINT "tokens_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"role" "roles" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "youtube_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "youtube_videos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs_to_categories" ADD CONSTRAINT "blogs_to_categories_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs_to_categories" ADD CONSTRAINT "blogs_to_categories_category_id_blog_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_post_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;