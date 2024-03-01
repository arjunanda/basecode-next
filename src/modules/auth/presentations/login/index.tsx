"use client";

import InputComponent from "@components/input";
import React, { FormEvent, useEffect, useState } from "react";
import { LoginCase } from "../../usecases/login.usecase";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/shared/components/button";

type Props = {};

const LoginComponent = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAuth();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts
    const formData = new FormData(event.currentTarget);

    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    const LoginProses = await LoginCase({
      email,
      password,
    });

    setIsLoading(false);

    if (LoginProses.valid) {
      setUser(LoginProses.data ?? null);

      router.push("/dashboard");
    } else {
      setError("Login gagal silahkan cek username");

      setTimeout(() => {
        setError(null)
      }, 4000);
    }
  }

  return (
    <div>
      {error && (

      <div
        className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 "
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Gagal!</span> {error}
        </div>
      </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <InputComponent placeholder="Email" name={"email"} type="email" required />
        <InputComponent placeholder="Password" name={"password"} type="password" required />
        <div>
          <div className="w-full flex justify-center">
            <ButtonComponent
              value={"Submit"}
              className="rounded-lg px-10 shadow-lg"
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
