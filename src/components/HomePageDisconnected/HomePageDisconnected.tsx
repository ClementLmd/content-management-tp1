"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, Palette } from "lucide-react";
import TeamCards from "@/components/HomePageDisconnected/TeamCards";

export default function HomeDisconnected() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center">
      {/* Sign In Button with enhanced styling */}
      <Link
        href="/auth"
        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-semibold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transform"
      >
        Get Started
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Features Section */}
      <div className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Fast & Efficient
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Modern and responsive interface for optimal management
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Secure
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Robust authentication and permission management
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Palette className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Modern Design
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Elegant interface with light/dark theme
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-2xl text-left border-2 border-blue-200 dark:border-gray-700">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          About
        </h2>
        <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
          <p className="text-center text-xl font-medium mb-6">
            A modern web content management application built with Next.js and
            React
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>
                Article creation and management with intuitive CRUD interface
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p>Authenticated dashboard for users</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p>Reusable UI components (cards, buttons, inputs)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p>Client authentication via authStore</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
              <p>Light/dark theme support with toggle</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
              <p>Responsive design for all devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-2xl border-2 border-purple-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
          Our Team
        </h2>
        <TeamCards />
      </div>
    </div>
  );
}
