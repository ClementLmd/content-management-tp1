import ArticleForm from "@/components/articles/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ArticleForm />
    </div>
  );
}
