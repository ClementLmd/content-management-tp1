import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "./LoginForm";

// Mock the auth store
const mockLogin = jest.fn();
const mockClearError = jest.fn();
const mockUseAuthStore = jest.fn();

jest.mock("@/stores/authStore", () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("LoginForm Component", () => {
  const mockOnSwitchToRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: false,
      error: null,
    });
  });

  it("renders login form with all required fields", () => {
    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(
      screen.getByText("Welcome back! Please sign in to your account.")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("handles form submission with valid credentials", async () => {
    mockLogin.mockResolvedValue(undefined);

    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("disables submit button when email or password is empty", () => {
    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(submitButton).toBeDisabled();

    // Enable button when both fields are filled
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(submitButton).not.toBeDisabled();
  });

  it("shows loading state when submitting", () => {
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: true,
      error: null,
    });

    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();
  });

  it("displays error message when login fails", () => {
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: false,
      error: "Invalid credentials",
    });

    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("calls onSwitchToRegister when switch link is clicked", () => {
    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    const switchLink = screen.getByText("Sign up");
    fireEvent.click(switchLink);

    expect(mockOnSwitchToRegister).toHaveBeenCalledTimes(1);
  });

  it("has proper dark mode styling", () => {
    const { container } = render(
      <LoginForm onSwitchToRegister={mockOnSwitchToRegister} />
    );

    // Check for dark mode classes
    expect(container.querySelector("h2")).toHaveClass("dark:text-white");
    expect(container.querySelector("p")).toHaveClass("dark:text-gray-400");
  });

  it("clears error when form is submitted", async () => {
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: false,
      error: "Previous error",
    });

    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
    });
  });

  it("has proper form validation attributes", () => {
    render(<LoginForm onSwitchToRegister={mockOnSwitchToRegister} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toBeRequired();
  });
});
