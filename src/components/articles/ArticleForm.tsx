'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article, NewArticle } from '@/types/article';
import { useArticleStore } from '@/stores/articleStore';
import { Save, X } from 'lucide-react';

interface ArticleFormProps {
  article?: Article;
  isEdit?: boolean;
}

export default function ArticleForm({ article, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const { addArticle, updateArticle } = useArticleStore();

  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    author: article?.author || '',
    category: article?.category || '',
    tags: article?.tags.join(', ') || '',
    published: article?.published || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (isEdit && article) {
      updateArticle(article.id, articleData);
    } else {
      addArticle(articleData as NewArticle);
    }

    router.push('/articles');
  };

  const handleCancel = () => {
    router.push('/articles');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Entrez le titre de l'article"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Contenu *
          </label>
          <textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Rédigez le contenu de votre article..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Auteur *
            </label>
            <input
              type="text"
              id="author"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nom de l'auteur"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <input
              type="text"
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: Technologie, Sport..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="react, nextjs, javascript"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
            Publier immédiatement
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isEdit ? 'Mettre à jour' : 'Créer l\'article'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </form>
  );
}
