import { useArticleStore } from "./articleStore";
import { Article, NewArticle } from "@/types/article";

// Mock crypto.randomUUID for Node.js environment
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: () => "test-uuid-" + Math.random().toString(36).substr(2, 9),
  },
});

describe("Article Store", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useArticleStore.setState({
      articles: [],
    });
  });

  it("should have initial state with empty articles array", () => {
    const state = useArticleStore.getState();
    expect(state.articles).toEqual([]);
  });

  it("should add a new article", () => {
    const newArticle: NewArticle = {
      title: "Test Article",
      content: "This is test content",
      author: "Test Author",
      category: "Technology",
      tags: ["test", "article"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(1);
    expect(state.articles[0]).toMatchObject({
      title: "Test Article",
      content: "This is test content",
      author: "Test Author",
      category: "Technology",
      tags: ["test", "article"],
      published: false,
    });
    expect(state.articles[0].id).toBeDefined();
    expect(state.articles[0].createdAt).toBeDefined();
    expect(state.articles[0].updatedAt).toBeDefined();
  });

  it("should update an existing article", () => {
    // First add an article
    const newArticle: NewArticle = {
      title: "Original Title",
      content: "Original content",
      author: "Test Author",
      category: "Technology",
      tags: ["test"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);
    const addedArticle = useArticleStore.getState().articles[0];

    // Then update it
    const updatedData = {
      title: "Updated Title",
      content: "Updated content",
      category: "Science",
      tags: ["updated", "test"],
    };

    useArticleStore.getState().updateArticle(addedArticle.id, updatedData);

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(1);
    expect(state.articles[0].title).toBe("Updated Title");
    expect(state.articles[0].content).toBe("Updated content");
    expect(state.articles[0].category).toBe("Science");
    expect(state.articles[0].tags).toEqual(["updated", "test"]);
    expect(state.articles[0].author).toBe("Test Author");
    // The updatedAt should exist and be a valid date
    expect(state.articles[0].updatedAt).toBeDefined();
    expect(new Date(state.articles[0].updatedAt)).toBeInstanceOf(Date);
  });

  it("should delete an article", () => {
    // First add an article
    const newArticle: NewArticle = {
      title: "Article to Delete",
      content: "This will be deleted",
      author: "Test Author",
      category: "Technology",
      tags: ["delete"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);
    const addedArticle = useArticleStore.getState().articles[0];

    // Then delete it
    useArticleStore.getState().deleteArticle(addedArticle.id);

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(0);
  });

  it("should toggle article publish status", () => {
    // First add an unpublished article
    const newArticle: NewArticle = {
      title: "Toggle Test",
      content: "Testing toggle",
      author: "Test Author",
      category: "Technology",
      tags: ["toggle"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);
    const addedArticle = useArticleStore.getState().articles[0];

    // Toggle to published
    useArticleStore.getState().togglePublish(addedArticle.id);

    let state = useArticleStore.getState();
    expect(state.articles[0].published).toBe(true);
    // The updatedAt should exist and be a valid date
    expect(state.articles[0].updatedAt).toBeDefined();
    expect(new Date(state.articles[0].updatedAt)).toBeInstanceOf(Date);

    // Toggle back to unpublished
    useArticleStore.getState().togglePublish(addedArticle.id);

    state = useArticleStore.getState();
    expect(state.articles[0].published).toBe(false);
  });

  it("should handle multiple articles", () => {
    const articles: NewArticle[] = [
      {
        title: "Article 1",
        content: "Content 1",
        author: "Author 1",
        category: "Tech",
        tags: ["tag1"],
        published: true,
      },
      {
        title: "Article 2",
        content: "Content 2",
        author: "Author 2",
        category: "Science",
        tags: ["tag2"],
        published: false,
      },
      {
        title: "Article 3",
        content: "Content 3",
        author: "Author 1",
        category: "Tech",
        tags: ["tag1", "tag3"],
        published: true,
      },
    ];

    articles.forEach((article) => {
      useArticleStore.getState().addArticle(article);
    });

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(3);
    expect(state.articles[0].title).toBe("Article 1");
    expect(state.articles[1].title).toBe("Article 2");
    expect(state.articles[2].title).toBe("Article 3");
  });

  it("should not update non-existent article", () => {
    const nonExistentArticle: Article = {
      id: "non-existent",
      title: "Non-existent",
      content: "This doesn't exist",
      author: "Test Author",
      category: "Technology",
      tags: ["test"],
      published: false,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    };

    useArticleStore.getState().updateArticle(nonExistentArticle);

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(0);
  });

  it("should not delete non-existent article", () => {
    useArticleStore.getState().deleteArticle("non-existent");

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(0);
  });

  it("should not toggle publish for non-existent article", () => {
    useArticleStore.getState().togglePublish("non-existent");

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(0);
  });

  it("should generate unique IDs for articles", () => {
    const newArticle: NewArticle = {
      title: "Test Article",
      content: "Test content",
      author: "Test Author",
      category: "Technology",
      tags: ["test"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);
    useArticleStore.getState().addArticle(newArticle);

    const state = useArticleStore.getState();
    expect(state.articles).toHaveLength(2);
    expect(state.articles[0].id).not.toBe(state.articles[1].id);
  });

  it("should set proper timestamps", () => {
    const beforeAdd = new Date().toISOString();

    const newArticle: NewArticle = {
      title: "Timestamp Test",
      content: "Testing timestamps",
      author: "Test Author",
      category: "Technology",
      tags: ["timestamp"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);

    const afterAdd = new Date().toISOString();
    const addedArticle = useArticleStore.getState().articles[0];

    expect(addedArticle.createdAt).toBeDefined();
    expect(addedArticle.updatedAt).toBeDefined();
    expect(addedArticle.createdAt).toBe(addedArticle.updatedAt);
    expect(addedArticle.createdAt >= beforeAdd).toBe(true);
    expect(addedArticle.createdAt <= afterAdd).toBe(true);
  });

  it("should update timestamp when article is modified", async () => {
    const newArticle: NewArticle = {
      title: "Timestamp Update Test",
      content: "Testing timestamp updates",
      author: "Test Author",
      category: "Technology",
      tags: ["timestamp"],
      published: false,
    };

    useArticleStore.getState().addArticle(newArticle);
    const addedArticle = useArticleStore.getState().articles[0];
    const originalUpdatedAt = addedArticle.updatedAt;

    // Wait a bit to ensure timestamp difference
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Update the article
    const updatedData = {
      title: "Updated Title",
    };

    useArticleStore.getState().updateArticle(addedArticle.id, updatedData);

    const state = useArticleStore.getState();
    // The updatedAt should be different (newer) than the original
    expect(new Date(state.articles[0].updatedAt).getTime()).toBeGreaterThan(
      new Date(originalUpdatedAt).getTime()
    );
    expect(state.articles[0].createdAt).toBe(addedArticle.createdAt);
  });
});
