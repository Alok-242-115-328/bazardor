import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const db = new Kysely({
  dialect: new LibsqlDialect({
    url: "file:sqlite.db",
  }),
});

export const auth = betterAuth({
  database: {
    db,
    type: "sqlite",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: false,
    },
  },
  plugins: [nextCookies()],
});