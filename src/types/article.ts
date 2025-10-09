export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export type NewArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
