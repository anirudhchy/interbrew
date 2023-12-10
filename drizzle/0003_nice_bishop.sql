CREATE TABLE IF NOT EXISTS "answer" (
	"id" text PRIMARY KEY NOT NULL,
	"questionId" text,
	"candidateUserId" text,
	"answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perQuestionResult" (
	"id" text PRIMARY KEY NOT NULL,
	"questionnaireId" text,
	"candidateUserId" text,
	"questionId" text,
	"answerId" text,
	"analysis" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" text PRIMARY KEY NOT NULL,
	"questionnaireId" text,
	"question" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "result" (
	"id" text PRIMARY KEY NOT NULL,
	"questionnaireId" text,
	"candidateUserId" text,
	"analysis" text NOT NULL
);
