"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect to home page after successful authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // If user is already authenticated, show loading while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8">
            <div className="mb-4">
              <div className="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
              Redirecting...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Taking you to the home page
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Content Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to your account or create a new one
            </p>
          </div>

          <Card>
            <CardContent className="py-6">
              {isLogin ? (
                <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is a demo application with mock authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
