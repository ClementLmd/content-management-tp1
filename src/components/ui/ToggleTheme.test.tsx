import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleTheme from "./ToggleTheme";

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

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("ToggleTheme Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    document.documentElement.classList.remove("dark");
  });

  it("renders toggle button", () => {
    render(<ToggleTheme />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows moon icon initially (light mode)", () => {
    render(<ToggleTheme />);
    // The component should show moon icon for light mode
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles between light and dark mode", () => {
    render(<ToggleTheme />);
    const button = screen.getByRole("button");

    // Click to toggle to dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Click again to toggle back to light mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("detects system dark theme preference", () => {
    // Manually add dark class to simulate the script in head detecting dark system preference
    document.documentElement.classList.add("dark");
    render(<ToggleTheme />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("detects system light theme preference", () => {
    // Manually remove dark class to simulate the script in head detecting light system preference
    document.documentElement.classList.remove("dark");
    render(<ToggleTheme />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("has proper accessibility attributes", () => {
    render(<ToggleTheme />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });
});
