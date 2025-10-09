"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="px-4 py-6 sm:px-0 text-center">
          <BookOpen className="w-24 h-24 text-blue-600 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Système de Gestion de Contenu
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gérez facilement vos articles et votre contenu
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
          >
            Accéder aux articles
          </Link>
          {isAuthenticated && (
            <div className="space-y-6 mt-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600">
                  Welcome to your content management system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">
                      Profile
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Name: {user?.name}</p>
                    <p className="text-gray-600">Email: {user?.email}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">
                      Content
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Manage your content here</p>
                    <Button variant="outline" className="mt-2">
                      View Content
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">
                      Settings
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Configure your preferences</p>
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
