"use client";

import { signup } from "../../actions/connect";
import type { ActionResult } from "../../actions/connect";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { GithubButton } from "@/app/components/GithubButton";
import { GoogleButton } from "@/app/components/GoogleButton";

const initialState: ActionResult = { ok: false, errors: {} };

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    signup,
    initialState
  );

  useEffect(() => {
    if (state.ok) {
      window.location.href = "/";
    }
  }, [state.ok]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-center text-2xl font-bold">Create your account</h1>

        <div className="grid grid-cols-2 gap-2">
          <GoogleButton />
          <GithubButton />
        </div>

        <form action={formAction} className="space-y-4">

          <div>
            <label>Name</label>
            <input name="name" className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600" />
            {state.errors?.name && (
              <p className="text-sm text-red-600">{state.errors.name}</p>
            )}
          </div>

          <div>
            <label>Email</label>
            <input name="email" type="email" className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"/>
            {state.errors?.email && (
              <p className="text-sm text-red-600">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {state.errors?.password && (
              <p className="text-sm text-red-600">{state.errors.password}</p>
            )}
          </div>

          {state.errors?.form && (
            <p className="text-sm text-red-600">{state.errors.form}</p>
          )}

          <button
            disabled={isPending}
            className="w-full rounded bg-rose-600 py-2 text-white disabled:opacity-60"
          >
            {isPending ? "Création..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-rose-600">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
