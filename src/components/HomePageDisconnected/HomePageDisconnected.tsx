"use client";

import Link from "next/link";
import TeamCards from "@/components/HomePageDisconnected/TeamCards";
import Features from "@/components/HomePageDisconnected/Features";

export default function HomeDisconnected() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center">

      {/* Sign In Button */}
      <Link
        href="/auth"
        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg"
      >
        Sign in
      </Link>

            {/* About Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-xl text-left">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-900 dark:text-white">About the App</h2>
        <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
          <p>
            A compact content-management web app (Next.js + React) for creating and managing articles and users, with an authenticated dashboard and simple CRUD-oriented UI.
          </p>
          <p>
            It includes reusable UI components (cards, buttons, inputs), client-side auth via src/stores/authStore, and pages for articles, users, and account actions.
          </p>
          <p>
            The app also supports a light/dark theme toggle and responsive layouts to make the interface usable across devices.
          </p>
        </div>
      </div>

      <Features />

        {/* Team Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Meet the Team</h2>
        <TeamCards />
      </div>

    </div>
  );
}
