"use client";

import { LoginResponse } from "@/modules/auth/models/login-response.model";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthValuesType } from "./types";
import { usePathname, useRouter } from "next/navigation";
import { CheckLoginCase } from "@/modules/auth/usecases/login.usecase";

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const [user, setUser] = useState<LoginResponse | null>(defaultProvider.user);

  const pathname = usePathname()
  const AuthenticationAuth = async () => {

      
    const checkLogin = CheckLoginCase()


    console.log(pathname)
    if (checkLogin === null) {
      router.push("/auth");
    } else {
        setUser(checkLogin)
        if (pathname === '/auth') {
            router.push('/dashboard')
        }
    }
  };

  useEffect(() => {
    AuthenticationAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
