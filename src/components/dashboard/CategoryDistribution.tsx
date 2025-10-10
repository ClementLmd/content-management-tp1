'use client';

import { useArticleStore } from '@/stores/articleStore';
import { Tag } from 'lucide-react';

export default function CategoryDistribution() {
  const { articles } = useArticleStore();

  const categoryStats = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const total = articles.length;
  const maxCount = Math.max(...categories.map(([, count]) => count), 1);

  if (categories.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Distribution par catégorie</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucune catégorie disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Distribution par catégorie</h2>
      </div>
      <div className="space-y-4">
        {categories.map(([category, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const width = (count / maxCount) * 100;
          
          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{count} article{count > 1 ? 's' : ''} ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
