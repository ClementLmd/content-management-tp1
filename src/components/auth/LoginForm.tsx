"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
          Sign In
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900 dark:border-red-800">
          <p className="text-red-600 text-sm dark:text-red-400">{error}</p>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="dark:bg-gray-800 dark:text-white"
        required
        disabled={isLoading}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="dark:bg-gray-800 dark:text-white"
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
        isLoading={isLoading}
        disabled={!email || !password}
      >
        Sign In
      </Button>

      {onSwitchToRegister && (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-800">
        <p className="text-blue-800 text-sm font-medium dark:text-gray-400">
          Demo Credentials:
        </p>
        <p className="text-blue-800 text-sm font-medium dark:text-gray-400">
          Email:{" "}
          <span className="font-bold dark:text-red-400">test@example.com</span>
        </p>
        <p className="text-blue-800 text-sm font-medium dark:text-gray-400">
          Password:{" "}
          <span className="font-bold dark:text-red-400">password</span>
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setEmail("test@example.com");
            setPassword("password");
          }}
          className="w-full mt-2"
        >
          Copy Credentials
        </Button>
      </div>
    </form>
  );
}
