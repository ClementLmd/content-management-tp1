"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, Palette } from "lucide-react";
import TeamCards from "@/components/HomePageDisconnected/TeamCards";
import  Features  from "@/components/HomePageDisconnected/Features";


export default function HomeDisconnected() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center">

      {/* Sign In Button with enhanced styling */}
      <Link
        href="/auth"
        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-semibold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transform"
      >
        Commencer
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Rapide & Efficace</h3>
          <p className="text-gray-600 dark:text-gray-400">Interface moderne et réactive pour une gestion optimale</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sécurisé</h3>
          <p className="text-gray-600 dark:text-gray-400">Authentification robuste et gestion des permissions</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Palette className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Design Moderne</h3>
          <p className="text-gray-600 dark:text-gray-400">Interface élégante avec thème clair/sombre</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-2xl text-left border-2 border-blue-200 dark:border-gray-700">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">À Propos</h2>
        <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
          <p className="text-center text-xl font-medium mb-6">
            Une application web moderne de gestion de contenu construite avec Next.js et React
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Création et gestion d&apos;articles avec interface CRUD intuitive</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p>Tableau de bord authentifié pour utilisateurs</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p>Composants UI réutilisables (cartes, boutons, inputs)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p>Authentification client via authStore</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
              <p>Support du thème clair/sombre avec toggle</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
              <p>Design responsive pour tous les appareils</p>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
        <Features />
      {/* Team Section */}
      <div className="mt-20 w-full max-w-5xl p-10 rounded-3xl bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-2xl border-2 border-purple-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Notre Équipe</h2>
        <TeamCards />
      </div>

    </div>
  );
}
