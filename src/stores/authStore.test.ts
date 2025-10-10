import { useAuthStore } from "./authStore";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Auth Store", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  it("should have initial state", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should clear error", () => {
    useAuthStore.setState({ error: "Some error" });
    useAuthStore.getState().clearError();

    const state = useAuthStore.getState();
    expect(state.error).toBeNull();
  });

  it("should logout user", () => {
    useAuthStore.setState({
      user: { id: "1", email: "test@example.com", name: "Admin" },
      isAuthenticated: true,
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle successful login", async () => {
    const login = useAuthStore.getState().login;

    await login("test@example.com", "password");

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({
      id: "1",
      email: "test@example.com",
      name: "Admin",
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle failed login", async () => {
    const login = useAuthStore.getState().login;

    await login("wrong@example.com", "wrongpassword");

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Invalid credentials");
  });

  it("should handle successful registration", async () => {
    const register = useAuthStore.getState().register;

    await register("new@example.com", "password", "New User");

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe("new@example.com");
    expect(state.user?.name).toBe("New User");
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
