"use client";

import Link from "next/link";
import { BookOpen, Sparkles, TrendingUp, Users, FileText } from "lucide-react";
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
          {/* Animated icon with gradient background */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <BookOpen className="relative w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto" />
          </div>
          
          <div className="relative">
            {/* Sparkle decoration */}
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Système de Gestion de Contenu
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Gérez facilement vos articles et votre contenu avec une interface moderne et intuitive
          </p>
          {!isAuthenticated && (
            <HomePageDisconnected />
          )}
          {isAuthenticated && (
            <div className="space-y-6 mt-8">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <FileText className="w-5 h-5" />
                Accéder aux articles
              </Link>
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Tableau de Bord
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Bienvenue dans votre système de gestion de contenu
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Profil
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Nom:</span> {user?.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Email:</span> {user?.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Contenu
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Gérez vos articles et publications
                    </p>
                    <Button variant="outline" className="mt-2 hover:bg-purple-50 dark:hover:bg-purple-900">
                      Voir le contenu
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Paramètres
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Configurez vos préférences
                    </p>
                    <Button variant="outline" className="mt-2 hover:bg-green-50 dark:hover:bg-green-900">
                      Paramètres
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
