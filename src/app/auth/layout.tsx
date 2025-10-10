import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export const metadata = {
  title: "Log in ",
  description: "Access your account",
};

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
