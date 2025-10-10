"use client";

import Link from "next/link";
import TeamCards from "@/components/HomePageDisconnected/TeamCards";

export default function HomeDisconnected() {
  return (
    <Link
      href="/auth"
      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg"
    >
      Sign in{" "}
     <div className="mt-12 w-full max-w-5xl flex flex-col gap-12">
  {/* Row 1: About Text */}
  <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
    <p>
      A compact content-management web app (Next.js + React) for creating and managing articles and users, with an authenticated dashboard and simple CRUD-oriented UI.
    </p>
    <p className="mt-4">
      It includes reusable UI components (cards, buttons, inputs), client-side auth via src/stores/authStore, and pages for articles, users, and account actions.
    </p>
    <p className="mt-4">
      The app also supports a light/dark theme toggle and responsive layouts to make the interface usable across devices.
    </p>
  </div>

  {/* Row 2: Team Cards */}
  <div>
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Meet the Team</h2>
    <TeamCards />
  </div>
</div>

    </Link>
  );
}
