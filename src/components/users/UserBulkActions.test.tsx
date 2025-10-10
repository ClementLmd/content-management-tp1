import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserBulkActions } from "./UserBulkActions";

describe("UserBulkActions Component", () => {
  const mockOnBulkAction = jest.fn();

  beforeEach(() => {
    mockOnBulkAction.mockClear();
  });

  it("renders with correct selected count", () => {
    render(
      <UserBulkActions selectedCount={3} onBulkAction={mockOnBulkAction} />
    );

    expect(screen.getByText("3 users selected")).toBeInTheDocument();
  });

  it("renders singular form for single user", () => {
    render(
      <UserBulkActions selectedCount={1} onBulkAction={mockOnBulkAction} />
    );

    expect(screen.getByText("1 user selected")).toBeInTheDocument();
  });

  it("renders all action buttons", () => {
    render(
      <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
    );

    expect(screen.getByText("Change Role")).toBeInTheDocument();
    expect(screen.getByText("Change Status")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onBulkAction with delete action when delete button is clicked", () => {
    render(
      <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnBulkAction).toHaveBeenCalledWith("delete");
  });

  describe("Role Change Menu", () => {
    it("opens role menu when Change Role button is clicked", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const roleButton = screen.getByText("Change Role");
      fireEvent.click(roleButton);

      expect(screen.getByText("Set as Admin")).toBeInTheDocument();
      expect(screen.getByText("Set as Editor")).toBeInTheDocument();
      expect(screen.getByText("Set as Author")).toBeInTheDocument();
      expect(screen.getByText("Set as Viewer")).toBeInTheDocument();
    });

    it("closes role menu and calls onBulkAction when role is selected", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      // Open role menu
      const roleButton = screen.getByText("Change Role");
      fireEvent.click(roleButton);

      // Click on admin option
      const adminOption = screen.getByText("Set as Admin");
      fireEvent.click(adminOption);

      expect(mockOnBulkAction).toHaveBeenCalledWith("change-role-admin");
      expect(screen.queryByText("Set as Admin")).not.toBeInTheDocument();
    });

    it("calls onBulkAction with correct role for each role option", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const roleButton = screen.getByText("Change Role");
      fireEvent.click(roleButton);

      // Test all role options
      const roles = ["admin", "editor", "author", "viewer"];
      const roleLabels = [
        "Set as Admin",
        "Set as Editor",
        "Set as Author",
        "Set as Viewer",
      ];

      roles.forEach((role, index) => {
        const option = screen.getByText(roleLabels[index]);
        fireEvent.click(option);

        expect(mockOnBulkAction).toHaveBeenCalledWith(`change-role-${role}`);

        // Reopen menu for next test
        if (index < roles.length - 1) {
          fireEvent.click(roleButton);
        }
      });
    });
  });

  describe("Status Change Menu", () => {
    it("opens status menu when Change Status button is clicked", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const statusButton = screen.getByText("Change Status");
      fireEvent.click(statusButton);

      expect(screen.getByText("Activate")).toBeInTheDocument();
      expect(screen.getByText("Deactivate")).toBeInTheDocument();
      expect(screen.getByText("Suspend")).toBeInTheDocument();
    });

    it("closes status menu and calls onBulkAction when status is selected", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      // Open status menu
      const statusButton = screen.getByText("Change Status");
      fireEvent.click(statusButton);

      // Click on activate option
      const activateOption = screen.getByText("Activate");
      fireEvent.click(activateOption);

      expect(mockOnBulkAction).toHaveBeenCalledWith("change-status-active");
      expect(screen.queryByText("Activate")).not.toBeInTheDocument();
    });

    it("calls onBulkAction with correct status for each status option", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const statusButton = screen.getByText("Change Status");
      fireEvent.click(statusButton);

      // Test all status options
      const statuses = ["active", "inactive", "suspended"];
      const statusLabels = ["Activate", "Deactivate", "Suspend"];

      statuses.forEach((status, index) => {
        const option = screen.getByText(statusLabels[index]);
        fireEvent.click(option);

        expect(mockOnBulkAction).toHaveBeenCalledWith(
          `change-status-${status}`
        );

        // Reopen menu for next test
        if (index < statuses.length - 1) {
          fireEvent.click(statusButton);
        }
      });
    });
  });

  describe("Menu Toggle Behavior", () => {
    it("closes role menu when clicking Change Role button again", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const roleButton = screen.getByText("Change Role");

      // Open menu
      fireEvent.click(roleButton);
      expect(screen.getByText("Set as Admin")).toBeInTheDocument();

      // Close menu
      fireEvent.click(roleButton);
      expect(screen.queryByText("Set as Admin")).not.toBeInTheDocument();
    });

    it("closes status menu when clicking Change Status button again", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const statusButton = screen.getByText("Change Status");

      // Open menu
      fireEvent.click(statusButton);
      expect(screen.getByText("Activate")).toBeInTheDocument();

      // Close menu
      fireEvent.click(statusButton);
      expect(screen.queryByText("Activate")).not.toBeInTheDocument();
    });

    it("allows both menus to be open simultaneously", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      // Open role menu
      const roleButton = screen.getByText("Change Role");
      fireEvent.click(roleButton);
      expect(screen.getByText("Set as Admin")).toBeInTheDocument();

      // Open status menu
      const statusButton = screen.getByText("Change Status");
      fireEvent.click(statusButton);

      // Both menus should be open
      expect(screen.getByText("Set as Admin")).toBeInTheDocument();
      expect(screen.getByText("Activate")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles and clickable elements", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3); // Change Role, Change Status, Delete

      // All buttons should be clickable
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });

    it("has proper cursor pointer styling", () => {
      render(
        <UserBulkActions selectedCount={2} onBulkAction={mockOnBulkAction} />
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("cursor-pointer");
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles zero selected users", () => {
      render(
        <UserBulkActions selectedCount={0} onBulkAction={mockOnBulkAction} />
      );

      expect(screen.getByText("0 users selected")).toBeInTheDocument();
    });

    it("handles large numbers of selected users", () => {
      render(
        <UserBulkActions selectedCount={999} onBulkAction={mockOnBulkAction} />
      );

      expect(screen.getByText("999 users selected")).toBeInTheDocument();
    });
  });
});
