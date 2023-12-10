DO $$ BEGIN
 CREATE TYPE "stratergyEnum" AS ENUM('perQuestion', 'transcript');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionnaire" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"restricted" boolean DEFAULT false,
	"allowedEmails" text[],
	"stratergy" "stratergyEnum",
	"isTimed" boolean DEFAULT false,
	"timer" integer
);
