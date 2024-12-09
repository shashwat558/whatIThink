"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return (
    <div className="container  flex h-screen w-screen min-w-full max-sm:p-4 flex-col items-center justify-center">
      <div className=" flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <AuthForm type="signup" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link 
            href="/api/auth/signin"
            className="hover:text-white underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}