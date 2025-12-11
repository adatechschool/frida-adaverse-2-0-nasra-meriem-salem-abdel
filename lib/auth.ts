import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db/drizzle";
import * as authSchema from "@/auth-schema";
import {nextCookies} from "better-auth/next-js";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
   schema: authSchema,
  }),
  
  user: {
    modelName: "users", 
  },
  
  emailAndPassword: {
    enabled: true,
  },
  
  plugins: [nextCookies()],
});
