'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '@/stores/articleStore';
import { useAuthStore } from '@/stores/authStore';
import StatCard from '@/components/dashboard/StatCard';
import RecentArticles from '@/components/dashboard/RecentArticles';
import CategoryDistribution from '@/components/dashboard/CategoryDistribution';
import PopularTags from '@/components/dashboard/PopularTags';
import { FileText, CheckCircle, Clock, User, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
export default function DashboardPage() {
  const router = useRouter();
  const { articles } = useArticleStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
    //   router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Calcul des statistiques
  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.published).length;
  const draftArticles = articles.filter(a => !a.published).length;
  const userArticles = articles.filter(a => a.author === user?.name).length;

  // Statistiques de tendance (articles créés les 30 derniers jours)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentArticles = articles.filter(
    a => new Date(a.createdAt) > thirtyDaysAgo
  ).length;
  const articleTrend = totalArticles > 0 ? (recentArticles / totalArticles) * 100 : 0;

  // Taux de publication
  const publishRate = totalArticles > 0 ? (publishedArticles / totalArticles) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
          
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Tableau de bord
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bienvenue, {user?.name} ! Voici un aperçu de votre activité.
            </p>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total d'articles"
            value={totalArticles}
            icon={FileText}
            description="Tous les articles"
            trend={{ value: Math.round(articleTrend), isPositive: articleTrend > 0 }}
            color="blue"
          />
          <StatCard
            title="Articles publiés"
            value={publishedArticles}
            icon={CheckCircle}
            description={`${publishRate.toFixed(0)}% du total`}
            color="green"
          />
          <StatCard
            title="Brouillons"
            value={draftArticles}
            icon={Clock}
            description="En attente de publication"
            color="orange"
          />
          <StatCard
            title="Vos articles"
            value={userArticles}
            icon={User}
            description="Articles créés par vous"
            color="purple"
          />
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CategoryDistribution />
          </div>
          <div>
            <StatCard
              title="Taux de publication"
              value={`${publishRate.toFixed(0)}%`}
              icon={TrendingUp}
              description="Articles publiés vs total"
              color="green"
            />
            <div className="mt-6">
              <PopularTags />
            </div>
          </div>
        </div>

        {/* Articles récents */}
        <RecentArticles />
      </div>
    </div>
  );
}
