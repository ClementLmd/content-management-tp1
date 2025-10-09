import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserCard } from "./UserCard";
import { User } from "@/types/user";

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  publications: 5,
  bio: "A passionate content creator",
  joinDate: "2023-01-15",
  role: "author",
};

describe("UserCard Component", () => {
  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("A passionate content creator")
    ).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("author")).toBeInTheDocument();
  });

  it("displays user avatar with first letter of name", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("formats join date correctly", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("Joined on January 15, 2023")).toBeInTheDocument();
  });

  it("applies correct role styling for different roles", () => {
    const adminUser: User = { ...mockUser, role: "admin" };
    const { rerender } = render(<UserCard user={adminUser} />);

    const adminBadge = screen.getByText("admin");
    expect(adminBadge).toHaveClass("bg-red-100", "text-red-800");

    const editorUser: User = { ...mockUser, role: "editor" };
    rerender(<UserCard user={editorUser} />);

    const editorBadge = screen.getByText("editor");
    expect(editorBadge).toHaveClass("bg-blue-100", "text-blue-800");
  });

  it("handles user without bio gracefully", () => {
    const userWithoutBio: User = { ...mockUser, bio: undefined };
    render(<UserCard user={userWithoutBio} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.queryByText("A passionate content creator")
    ).not.toBeInTheDocument();
  });
});
