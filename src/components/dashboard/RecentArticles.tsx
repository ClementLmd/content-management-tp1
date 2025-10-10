'use client';

import Link from 'next/link';
import { useArticleStore } from '@/stores/articleStore';
import { Calendar, User, Eye } from 'lucide-react';

export default function RecentArticles() {
  const { articles } = useArticleStore();
  
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (recentArticles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Articles récents</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucun article disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Articles récents</h2>
      <div className="space-y-4">
        {recentArticles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                article.published 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              }`}>
                {article.published ? 'Publié' : 'Brouillon'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{article.content}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{article.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/articles"
        className="block mt-4 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
      >
        Voir tous les articles →
      </Link>
    </div>
  );
}
