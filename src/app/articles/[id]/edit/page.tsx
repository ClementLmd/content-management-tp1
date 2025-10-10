"use client";

import { use } from "react";
import { useArticleStore } from "@/stores/articleStore";
import ArticleForm from "@/components/articles/ArticleForm";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getArticleById } = useArticleStore();
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ArticleForm article={article} isEdit />
    </div>
  );
}
