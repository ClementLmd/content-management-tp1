import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export const metadata = {
  title: "User Management",
  description: "Manage your users",
};

import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
