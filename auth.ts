import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import email from "next-auth/providers/email";
import getEmailHtml from "./emails/GetEmailHtml";
import { createTransport } from "nodemailer";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.query.users.findFirst({
          where: eq(users.email, identifier),
        });

        const emailHtml = getEmailHtml({
          user,
          url,
        });
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          from: provider.from,
          to: identifier,
          subject: user?.emailVerified
            ? "Sign in to Interbrew ✅"
            : "Welcome to Interbrew 🥳",
          html: emailHtml,
        });

        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, token.email as string),
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
