"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signUpSchema, signInSchema } from "@/lib/validation/auth";
import { z } from "zod";

export type ActionErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};

export type ActionResult = {
  ok: boolean;
  errors: ActionErrors;
};

export const signup = async (
  _oldState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> => {

  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return {
      ok: false,
      errors: {
        name: tree.properties?.name?.errors?.[0],
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      },
    };
  }

  try {
    const res = await auth.api.signUpEmail({
      body: parsed.data,
      headers: await headers(),
      asResponse: true,
    });

    if (!res.ok) {
      return {
        ok: false,
        errors: { email: "Un compte existe déjà avec cet email" },
      };
    }

    return { ok: true, errors: {} };

  } catch {
    return {
      ok: false,
      errors: { form: "Une erreur est survenue, réessaie" },
    };
  }
};

export const signin = async (
  _oldState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> => {

  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return {
      ok: false,
      errors: {
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      },
    };
  }

  try {
    const res = await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
      asResponse: true,
    });

    if (!res.ok) {
      return {
        ok: false,
        errors: { form: "Email ou mot de passe incorrect" },
      };
    }

    return { ok: true, errors: {} };

  } catch {
    return {
      ok: false,
      errors: { form: "Erreur lors de la connexion" },
    };
  }
};

export const signout = async (): Promise<ActionResult> => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { ok: true, errors: {} };
  } catch {
    return {
      ok: false,
      errors: { form: "Impossible de se déconnecter" },
    };
  }
};
