import { Article } from "@/types/article";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Premier Article",
    content: "Ceci est le contenu du premier article.",
    author: "Admin",
    category: "Général",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["introduction", "welcome"],
  },
  {
    id: "2",
    title: "Guide du Rédacteur",
    content:
      "Découvrez comment créer, modifier et publier des articles efficacement grâce à ce guide complet.",
    author: "Rédacteur en Chef",
    category: "Documentation",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["guide", "aide", "rédaction"],
  },
  {
    id: "3",
    title: "Les nouveautés du mois",
    content:
      "Ce mois-ci, nous avons ajouté plusieurs nouvelles fonctionnalités et améliorations à notre plateforme.",
    author: "Admin",
    category: "Actualités",
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["news", "update", "features"],
  },
  {
    id: "4",
    title: "Optimiser le SEO de vos articles",
    content:
      "Apprenez les bonnes pratiques pour améliorer la visibilité de vos articles sur les moteurs de recherche.",
    author: "Marie Dupont",
    category: "Marketing",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["SEO", "marketing", "référencement"],
  },
  {
    id: "5",
    title: "Comment structurer vos contenus",
    content:
      "Une bonne structure permet à vos lecteurs de mieux comprendre et apprécier vos articles.",
    author: "Paul Martin",
    category: "Rédaction",
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["rédaction", "structure", "astuces"],
  },
];
