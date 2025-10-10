import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Manage your articles",
};

import { ReactNode } from "react";

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
