"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articleStore";
import { ArrowLeft, Edit, Trash2, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getArticleById, deleteArticle } = useArticleStore();
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article not found
          </h2>
          <Link
            href="/articles"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this article?")) {
      deleteArticle(id);
      router.push("/articles");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to articles
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{article.category}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  article.published
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {article.published ? "Published" : "Draft"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {article.content}
              </p>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/articles/${article.id}/edit`}
                className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
