import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  // optionnel mais propre
  baseURL: process.env.BETTER_AUTH_URL, // ✅ AJOUTE ÇA
});

export const { signIn, signUp, useSession } = createAuthClient()
