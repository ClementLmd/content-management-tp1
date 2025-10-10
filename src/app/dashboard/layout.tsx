import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your data and analytics",
};

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
