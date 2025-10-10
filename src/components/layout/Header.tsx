"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import ToggleTheme from "@/components/ui/ToggleTheme";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Content Management" }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              {title}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
              <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/users"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Users
                </Link>
                <Link
                  href="/articles"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Articles
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 dark:text-gray-300">
                  Welcome, <span className="font-medium">{user?.name}</span>
                </span>
                <Button variant="outline" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
            {/* Toggle placed at the far right */}
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
}
