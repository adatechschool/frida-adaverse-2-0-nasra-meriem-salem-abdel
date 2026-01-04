"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db} from "@/lib/db/drizzle";
import {eq} from "drizzle-orm";
import * as authSchema from "@/lib/db/auth-schema";

export const signup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name && !email && !password) {
        throw Error("Name, email and password are required");
    }
    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        headers: await headers(),
        asResponse: true,
    });
    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signup?error=true");
    }
    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email && !password) {
        throw Error("email and password are required");
    }
    const user = await db.query.users.findFirst({
        where: eq(authSchema.users.email,email),
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        headers: await headers(),
        asResponse: true,
    });
    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signin?error=true");
    } 
    
    // Rediriger vers le dashboard admin si l'utilisateur est admin
    if (user?.role === "admin") {
        redirect("/admin/dashboard");
    }
    
    redirect("/"); // on redirige vers la home page une fois connecté
};
export const signout = async () => {
    await auth.api.signOut({ headers: await headers() }); // attention à
};

