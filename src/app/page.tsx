"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import HomePageDisconnected from "@/components/HomePageDisconnected/HomePageDisconnected";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="px-4 py-6 sm:px-0 text-center">
          <BookOpen className="w-24 h-24 text-blue-600 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Système de Gestion de Contenu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Gérez facilement vos articles et votre contenu
          </p>
          {!isAuthenticated && (
            <HomePageDisconnected />
          )}
          {isAuthenticated && (
            <div className="space-y-6 mt-8">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg"
              >
                Accéder aux articles
              </Link>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome to your content management system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Profile
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Name: {user?.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Email: {user?.email}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Content
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Manage your content here
                    </p>
                    <Button variant="outline" className="mt-2">
                      View Content
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Settings
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Configure your preferences
                    </p>
                    <Button variant="outline" className="mt-2">
                      Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
