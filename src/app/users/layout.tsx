import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage your users",
};

import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
