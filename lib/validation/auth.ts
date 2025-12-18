import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Le nom doit contenir au moins 3 caractères"),

  email: z
    .email("Email invalide")
    .trim()
    .min(1, "Email obligatoire"),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const signInSchema = z.object({
  email: z
    .email("Email invalide")
    .trim()
    .min(1, "Email obligatoire"),
    

  password: z
    .string()
    .min(1, "Mot de passe obligatoire"),
});
