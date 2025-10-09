import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

// Mock the auth store
const mockUseAuthStore = jest.fn();
jest.mock("@/stores/authStore", () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      clearError: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it("renders header with default title", () => {
    render(<Header />);
    expect(screen.getByText("Content Management")).toBeInTheDocument();
  });

  it("renders header with custom title", () => {
    render(<Header title="My App" />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("shows sign in button when not authenticated", () => {
    render(<Header />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("shows user info and sign out button when authenticated", () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "test@example.com", name: "Test User" },
      logout: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      clearError: jest.fn(),
      isLoading: false,
      error: null,
    });

    render(<Header />);
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Welcome, Test User";
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("calls logout when sign out button is clicked", () => {
    const mockLogout = jest.fn();
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "test@example.com", name: "Test User" },
      logout: mockLogout,
      login: jest.fn(),
      register: jest.fn(),
      clearError: jest.fn(),
      isLoading: false,
      error: null,
    });

    render(<Header />);
    fireEvent.click(screen.getByText("Sign Out"));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
