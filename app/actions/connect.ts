"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name || !email || !password) {
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
        const body = await response.json().catch(() => null);
        console.error("Sign up failed:", { status: response.status, body });
        redirect("/auth/sign-up?error=true");
    }
    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
        throw Error("email and password are required");
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
        const body = await response.json().catch(() => null);
        console.error("Sign in failed:", { status: response.status, body });
        redirect("/auth/sign-in?error=true");
    }
    redirect("/"); // on redirige vers la home page une fois connecté
};
export const signout = async () => {
    await auth.api.signOut({ headers: await headers() }); // attention à
};