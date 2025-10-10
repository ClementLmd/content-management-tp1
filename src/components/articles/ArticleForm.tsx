"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, NewArticle } from "@/types/article";
import { useArticleStore } from "@/stores/articleStore";
import { Save, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface ArticleFormProps {
  article?: Article;
  isEdit?: boolean;
}

export default function ArticleForm({
  article,
  isEdit = false,
}: ArticleFormProps) {
  const router = useRouter();
  const { addArticle, updateArticle } = useArticleStore();

  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    author: article?.author || "",
    authorLocked: article?.author !== undefined,
    category: article?.category || "",
    tags: article?.tags.join(", ") || "",
    published: article?.published || false,
  });

  useEffect(() => {
    if (!isEdit && useAuthStore.getState().isAuthenticated) {
      setFormData((prev) => ({
        ...prev,
        author: useAuthStore.getState().user?.name || "",
      }));
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const articleData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (isEdit && article) {
      updateArticle(article.id, articleData);
    } else {
      addArticle(articleData as NewArticle);
    }

    router.push("/articles");
  };

  const handleCancel = () => {
    router.push("/articles");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {isEdit ? "Edit Article" : "New Article"}
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter article title"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Content *
          </label>
          <textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Write your article content..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              required
              value={formData.author}
              disabled={isEdit}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400"
              placeholder="Author name"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category *
            </label>
            <input
              type="text"
              id="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Ex: Technology, Sports..."
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="react, nextjs, javascript"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
          <label
            htmlFor="published"
            className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Publish immediately
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-5 h-5" />
          {isEdit ? "Update" : "Create Article"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </form>
  );
}
