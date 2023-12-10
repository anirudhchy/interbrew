import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  questionnaires: many(questionnaires),
  answers: many(answers),
  results: many(results),
  perQuestionResults: many(perQuestionResults),
}));

// enum describing the stratergy of each test
export const stratergyEnum = pgEnum("stratergyEnum", [
  "perQuestion",
  "transcript",
]);

export const questionnaires = pgTable("questionnaire", {
  id: text("id").notNull().primaryKey(),
  // id of the user who created the questionnaire
  authorId: text("authorId"),
  // name of the questionnaire
  name: text("name").notNull(),
  // description of the questionnaire
  description: text("description"),
  // restricted ? access allowed only to specific email id's ?
  restricted: boolean("restricted").default(false),
  // access-allowed email id's
  allowedEmails: text("allowedEmails").array(),
  stratergy: stratergyEnum("stratergy"),
  // is timer required for each question ?
  isTimed: boolean("isTimed").default(false),
  // timer time in seconds
  timer: integer("timer"),
});

export const questionnairesRelations = relations(
  questionnaires,
  ({ one, many }) => ({
    author: one(users, {
      fields: [questionnaires.authorId],
      references: [users.id],
    }),
    questions: many(questions),
    results: many(results),
    perQuestionResults: many(perQuestionResults),
  })
);

export const questions = pgTable("question", {
  id: text("id").notNull().primaryKey(),
  questionnaireId: text("questionnaireId"),
  question: text("question").notNull(),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  questionnaire: one(questionnaires, {
    fields: [questions.questionnaireId],
    references: [questionnaires.id],
  }),
  answers: many(answers),
  perQuestionResults: many(perQuestionResults),
}));

export const answers = pgTable("answer", {
  id: text("id").notNull().primaryKey(),
  questionId: text("questionId"),
  candidateUserId: text("candidateUserId"),
  answer: text("answer").notNull(),
});

export const answersRelations = relations(answers, ({ one, many }) => ({
  user: one(users, {
    fields: [answers.candidateUserId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  perQuestionResults: many(perQuestionResults),
}));

export const results = pgTable("result", {
  id: text("id").notNull().primaryKey(),
  questionnaireId: text("questionnaireId"),
  candidateUserId: text("candidateUserId"),
  analysis: text("analysis").notNull(),
});

export const resultsRelations = relations(results, ({ one }) => ({
  user: one(users, {
    fields: [results.candidateUserId],
    references: [users.id],
  }),
  questionnaire: one(questionnaires, {
    fields: [results.questionnaireId],
    references: [questionnaires.id],
  }),
}));

export const perQuestionResults = pgTable("perQuestionResult", {
  id: text("id").notNull().primaryKey(),
  questionnaireId: text("questionnaireId"),
  candidateUserId: text("candidateUserId"),
  questionId: text("questionId"),
  answerId: text("answerId"),
  analysis: text("analysis").notNull(),
});

export const perQuestionResultsRelations = relations(
  perQuestionResults,
  ({ one }) => ({
    user: one(users, {
      fields: [perQuestionResults.candidateUserId],
      references: [users.id],
    }),
    questionnaire: one(questionnaires, {
      fields: [perQuestionResults.questionnaireId],
      references: [questionnaires.id],
    }),
    question: one(questions, {
      fields: [perQuestionResults.questionId],
      references: [questions.id],
    }),
    answer: one(answers, {
      fields: [perQuestionResults.answerId],
      references: [answers.id],
    }),
  })
);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export type user = typeof users.$inferSelect;
