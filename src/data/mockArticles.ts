import { Article } from "@/types/article";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "First Article",
    content: "This is the content of the first article.",
    author: "Admin",
    category: "General",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["introduction", "welcome"],
  },
  {
    id: "2",
    title: "Editor's Guide",
    content:
      "Discover how to create, edit, and publish articles efficiently with this comprehensive guide.",
    author: "Editor in Chief",
    category: "Documentation",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["guide", "help", "writing"],
  },
  {
    id: "3",
    title: "This Month's Updates",
    content:
      "This month, we've added several new features and improvements to our platform.",
    author: "Admin",
    category: "News",
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["news", "update", "features"],
  },
  {
    id: "4",
    title: "Optimize SEO for Your Articles",
    content:
      "Learn best practices to improve the visibility of your articles on search engines.",
    author: "Marie Dupont",
    category: "Marketing",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["SEO", "marketing", "optimization"],
  },
  {
    id: "5",
    title: "How to Structure Your Content",
    content:
      "Good structure helps your readers better understand and appreciate your articles.",
    author: "Paul Martin",
    category: "Writing",
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["writing", "structure", "tips"],
  },
];
