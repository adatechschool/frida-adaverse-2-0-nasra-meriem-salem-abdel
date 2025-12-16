'use client';
import { GithubButton } from "@/app/components/GithubButton";
import { signin } from "../../actions/connect";

import {  Eye, EyeOff } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';
import { GoogleButton } from "@/app/components/GoogleButton";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-4 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don&apos;t have an account?{' '}
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
          {/* OnSubmit declare yourself */}
          <form action={signin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                name="email"
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
              />
            </div>
            <div className="relative">
              <label className="font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  name="password"
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 mt-2 mr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-secondary" />
                  ) : (
                    <Eye size={20} className="text-secondary" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full rounded-lg bg-rose-600 px-4 py-2 font-medium text-white duration-150 hover:bg-rose-500 active:bg-rose-600">
              Sign in
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
