import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, NewArticle } from '@/types/article';

interface ArticleState {
  articles: Article[];
  addArticle: (article: NewArticle) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  togglePublish: (id: string) => void;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set, get) => ({
      articles: [],
      
      addArticle: (newArticle) => {
        const article: Article = {
          ...newArticle,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ articles: [...state.articles, article] }));
      },
      
      updateArticle: (id, updatedData) => {
        set((state) => ({
          articles: state.articles.map((article) =>
            article.id === id
              ? { ...article, ...updatedData, updatedAt: new Date().toISOString() }
              : article
          ),
        }));
      },
      
      deleteArticle: (id) => {
        set((state) => ({
          articles: state.articles.filter((article) => article.id !== id),
        }));
      },
      
      getArticleById: (id) => {
        return get().articles.find((article) => article.id === id);
      },
      
      togglePublish: (id) => {
        set((state) => ({
          articles: state.articles.map((article) =>
            article.id === id
              ? { ...article, published: !article.published, updatedAt: new Date().toISOString() }
              : article
          ),
        }));
      },
    }),
    {
      name: 'article-storage',
    }
  )
);
