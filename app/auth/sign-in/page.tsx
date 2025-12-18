'use client';

import { signin } from "../../actions/connect";
import type { ActionResult } from "../../actions/connect";

import { GithubButton } from "@/app/components/GithubButton";
import { GoogleButton } from "@/app/components/GoogleButton";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

const initialState: ActionResult = { ok: false, errors: {} };

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    signin,
    initialState
  );

  // redirection après succès
  useEffect(() => {
    if (state.ok) {
      window.location.href = "/";
    }
  }, [state.ok]);

  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-4 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-6 p-4 py-6 shadow sm:rounded-lg sm:p-6">
          <div className="mx-auto grid grid-cols-2 gap-x-2">
            <GoogleButton />
            <GithubButton />
          </div>

          <div className="relative">
            <span className="bg-secondary block h-px w-full"></span>
            <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit px-2 text-sm">
              Or continue with
            </p>
          </div>

          {/* 🔽 formulaire */}
          <form action={formAction} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
              />
              {state.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 mt-2 mr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-secondary" />
                  ) : (
                    <Eye size={20} className="text-secondary" />
                  )}
                </button>
              </div>
              {state.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.password}
                </p>
              )}
            </div>

            {/* ❌ erreur globale */}
            {state.errors.form && (
              <p className="text-sm text-red-600">
                {state.errors.form}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-rose-600 px-4 py-2 font-medium text-white duration-150 hover:bg-rose-500 active:bg-rose-600 disabled:opacity-60"
            >
              {isPending ? "Connexion..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="text-center">
          <a href="#" className="hover:text-rose-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}
