import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders input with label", () => {
    render(<Input label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders input without label", () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("displays helper text when helperText prop is provided and no error", () => {
    render(<Input helperText="This is helpful information" />);
    expect(screen.getByText("This is helpful information")).toBeInTheDocument();
  });

  it("does not display helper text when error is present", () => {
    render(
      <Input
        error="This field is required"
        helperText="This is helpful information"
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(
      screen.queryByText("This is helpful information")
    ).not.toBeInTheDocument();
  });

  it("applies error styling when error is present", () => {
    const { container } = render(<Input error="Error message" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("border-red-500");
    expect(input).toHaveClass("focus:ring-red-500");
  });

  it("applies normal styling when no error is present", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("border-gray-300");
    expect(input).toHaveClass("focus:ring-blue-500");
  });

  it("has proper dark mode classes", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("dark:bg-gray-800");
    expect(input).toHaveClass("dark:text-white");
  });

  it("forwards all input props correctly", () => {
    render(
      <Input
        type="email"
        placeholder="Enter email"
        required
        disabled
        value="test@example.com"
      />
    );
    const input = screen.getByDisplayValue("test@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it("generates unique id when no id is provided", () => {
    const { container } = render(<Input label="Test" />);
    const input = container.querySelector("input");
    const label = container.querySelector("label");
    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute("for")).toBe(input?.id);
  });

  it("uses provided id when available", () => {
    const { container } = render(<Input id="custom-id" label="Test" />);
    const input = container.querySelector("input");
    const label = container.querySelector("label");
    expect(input).toHaveAttribute("id", "custom-id");
    expect(label).toHaveAttribute("for", "custom-id");
  });

  it("applies custom className", () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<Input label="Email Address" required />);
    const input = screen.getByLabelText("Email Address");
    expect(input).toBeRequired();
  });
});
