import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";

// Mock the article store
const mockDeleteArticle = jest.fn();
const mockTogglePublish = jest.fn();

jest.mock("@/stores/articleStore", () => ({
  useArticleStore: () => ({
    deleteArticle: mockDeleteArticle,
    togglePublish: mockTogglePublish,
  }),
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

const mockArticle: Article = {
  id: "1",
  title: "Test Article",
  content: "This is a test article content that should be displayed properly.",
  author: "Test Author",
  category: "Technology",
  tags: ["react", "typescript"],
  published: true,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

describe("ArticleCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders article information correctly", () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is a test article content that should be displayed properly."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#typescript")).toBeInTheDocument();
  });

  it("shows published status correctly", () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText("Publié")).toBeInTheDocument();
  });

  it("shows draft status correctly", () => {
    const draftArticle = { ...mockArticle, published: false };
    render(<ArticleCard article={draftArticle} />);
    expect(screen.getByText("Brouillon")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText("Dépublier")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "" })).toBeInTheDocument(); // Edit link
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument(); // Delete button
  });

  it("has proper dark mode classes", () => {
    const { container } = render(<ArticleCard article={mockArticle} />);
    const cardElement = container.firstChild as HTMLElement;

    // Check that the card has dark mode classes
    expect(cardElement.className).toContain("dark:bg-gray-800");
    expect(cardElement.className).toContain("dark:border-gray-700");
  });
});
