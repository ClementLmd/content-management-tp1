"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  // If user is already authenticated, show welcome message
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8">
            <div className="mb-4">
              <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 mb-4">
              You are signed in as{" "}
              <span className="font-medium">{user.name}</span>
            </p>
            <p className="text-sm text-gray-500">Email: {user.email}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Content Management
            </h1>
            <p className="mt-2 text-gray-600">
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
            <p className="text-sm text-gray-500">
              This is a demo application with mock authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
