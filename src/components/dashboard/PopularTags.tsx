'use client';

import { useArticleStore } from '@/stores/articleStore';
import { Hash } from 'lucide-react';

export default function PopularTags() {
  const { articles } = useArticleStore();

  const tagStats = articles.reduce((acc, article) => {
    article.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  if (popularTags.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tags populaires</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucun tag disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tags populaires</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularTags.map(([tag, count]) => {
          const size = Math.min(count * 2 + 10, 18);
          
          return (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors cursor-pointer"
              style={{ fontSize: `${size}px` }}
            >
              #{tag} <span className="text-xs opacity-75">({count})</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
