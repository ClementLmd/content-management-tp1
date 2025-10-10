import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegisterForm } from "./RegisterForm";

// Mock the auth store
const mockRegister = jest.fn();
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

describe("RegisterForm Component", () => {
  const mockOnSwitchToLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockReturnValue({
      register: mockRegister,
      clearError: mockClearError,
      isLoading: false,
      error: null,
    });
  });

  it("renders registration form with all required fields", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(screen.getAllByText("Create Account")).toHaveLength(2); // Title and button
    expect(
      screen.getByText("Sign up to get started with your account.")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  it("handles form submission with valid data", async () => {
    mockRegister.mockResolvedValue(undefined);

    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Create Account" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
      expect(mockRegister).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
        "John Doe"
      );
    });
  });

  it("shows password mismatch error when passwords don't match", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "different123" },
    });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("does not submit form when passwords don't match", async () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Create Account" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "different123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).not.toHaveBeenCalled();
    });
  });

  it("shows loading state when submitting", () => {
    mockUseAuthStore.mockReturnValue({
      register: mockRegister,
      clearError: mockClearError,
      isLoading: true,
      error: null,
    });

    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();
  });

  it("displays error message when registration fails", () => {
    mockUseAuthStore.mockReturnValue({
      register: mockRegister,
      clearError: mockClearError,
      isLoading: false,
      error: "Email already exists",
    });

    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(screen.getByText("Email already exists")).toBeInTheDocument();
  });

  it("calls onSwitchToLogin when switch link is clicked", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const switchLink = screen.getByText("Sign in");
    fireEvent.click(switchLink);

    expect(mockOnSwitchToLogin).toHaveBeenCalledTimes(1);
  });

  it("shows password helper text", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  it("disables all inputs when loading", () => {
    mockUseAuthStore.mockReturnValue({
      register: mockRegister,
      clearError: mockClearError,
      isLoading: true,
      error: null,
    });

    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(screen.getByLabelText("Full Name")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Password")).toBeDisabled();
    expect(screen.getByLabelText("Confirm Password")).toBeDisabled();
  });

  it("clears error when form is submitted", async () => {
    mockUseAuthStore.mockReturnValue({
      register: mockRegister,
      clearError: mockClearError,
      isLoading: false,
      error: "Previous error",
    });

    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Create Account" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
    });
  });

  it("has proper form validation attributes", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    expect(nameInput).toBeRequired();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toBeRequired();
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toBeRequired();
  });

  it("removes password mismatch error when passwords match", () => {
    render(<RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />);

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    // First, create a mismatch
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "different123" },
    });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();

    // Then fix the mismatch
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    expect(
      screen.queryByText("Passwords do not match")
    ).not.toBeInTheDocument();
  });
});
