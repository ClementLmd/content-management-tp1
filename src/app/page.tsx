"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isAuthenticated ? (
            <div className="space-y-6">
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
          ) : (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Content Management
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Please sign in to access your dashboard and manage your content.
              </p>
              <Link href="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
