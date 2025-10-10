import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export const metadata = {
  title: "Articles",
  description: "Manage your articles",
};

import { ReactNode } from "react";

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
