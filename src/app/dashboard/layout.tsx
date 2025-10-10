import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export const metadata = {
  title: "Dashboard",
  description: "View your data and analytics",
};

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
