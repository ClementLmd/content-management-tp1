import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in ",
  description: "Access your account",
};

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
