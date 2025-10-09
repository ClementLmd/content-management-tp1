"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import { Calendar, User, Tag, Edit, Trash2 } from "lucide-react";
import { useArticleStore } from "@/stores/articleStore";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { deleteArticle, togglePublish } = useArticleStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      deleteArticle(article.id);
    }
  };

  const handleTogglePublish = (e: React.MouseEvent) => {
    e.preventDefault();
    togglePublish(article.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link href={`/articles/${article.id}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {article.title}
            </h3>
          </Link>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              article.published
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {article.published ? "Publié" : "Brouillon"}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.content}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4 mr-2" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {new Date(article.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Tag className="w-4 h-4 mr-2" />
            <span>{article.category}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-md text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleTogglePublish}
            className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm"
          >
            {article.published ? "Dépublier" : "Publier"}
          </button>
          <Link
            href={`/articles/${article.id}/edit`}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm flex items-center"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium text-sm flex items-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
