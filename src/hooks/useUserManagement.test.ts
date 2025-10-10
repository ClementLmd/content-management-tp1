import { renderHook, act } from "@testing-library/react";
import { useUserManagement } from "./useUserManagement";

describe("useUserManagement Hook", () => {
  it("initializes with default state", () => {
    const { result } = renderHook(() => useUserManagement());

    expect(result.current.users).toHaveLength(8); // mockUsers length
    expect(result.current.selectedUsers).toEqual([]);
    expect(result.current.filters).toEqual({
      role: "all",
      status: "all",
      search: "",
    });
    expect(result.current.totalUsers).toBe(8);
  });

  it("filters users by role", () => {
    const { result } = renderHook(() => useUserManagement());

    act(() => {
      result.current.setFilters({
        role: "admin",
        status: "all",
        search: "",
      });
    });

    const adminUsers = result.current.filteredUsers.filter(
      (user) => user.role === "admin"
    );
    expect(adminUsers).toHaveLength(result.current.filteredUsers.length);
  });

  it("filters users by status", () => {
    const { result } = renderHook(() => useUserManagement());

    act(() => {
      result.current.setFilters({
        role: "all",
        status: "active",
        search: "",
      });
    });

    const activeUsers = result.current.filteredUsers.filter(
      (user) => user.status === "active"
    );
    expect(activeUsers).toHaveLength(result.current.filteredUsers.length);
  });

  it("filters users by search term", () => {
    const { result } = renderHook(() => useUserManagement());

    act(() => {
      result.current.setFilters({
        role: "all",
        status: "all",
        search: "alice",
      });
    });

    const searchResults = result.current.filteredUsers;
    expect(searchResults.length).toBeGreaterThan(0);
    searchResults.forEach((user) => {
      expect(
        user.name.toLowerCase().includes("alice") ||
          user.email.toLowerCase().includes("alice")
      ).toBe(true);
    });
  });

  it("handles bulk role change", () => {
    const { result } = renderHook(() => useUserManagement());

    // Select first user
    act(() => {
      result.current.setSelectedUsers(["1"]);
    });

    // Change role to admin
    act(() => {
      result.current.handleBulkAction("change-role-admin");
    });

    const updatedUser = result.current.users.find((user) => user.id === "1");
    expect(updatedUser?.role).toBe("admin");
    expect(result.current.selectedUsers).toEqual([]);
  });

  it("handles bulk status change", () => {
    const { result } = renderHook(() => useUserManagement());

    // Select first user
    act(() => {
      result.current.setSelectedUsers(["1"]);
    });

    // Change status to suspended
    act(() => {
      result.current.handleBulkAction("change-status-suspended");
    });

    const updatedUser = result.current.users.find((user) => user.id === "1");
    expect(updatedUser?.status).toBe("suspended");
    expect(result.current.selectedUsers).toEqual([]);
  });

  it("handles bulk delete", () => {
    const { result } = renderHook(() => useUserManagement());
    const initialUserCount = result.current.users.length;

    // Select first user
    act(() => {
      result.current.setSelectedUsers(["1"]);
    });

    // Delete selected user
    act(() => {
      result.current.handleBulkAction("delete");
    });

    expect(result.current.users).toHaveLength(initialUserCount - 1);
    expect(
      result.current.users.find((user) => user.id === "1")
    ).toBeUndefined();
    expect(result.current.selectedUsers).toEqual([]);
  });

  it("handles individual user actions", () => {
    const { result } = renderHook(() => useUserManagement());

    // Suspend a user
    act(() => {
      result.current.handleUserAction("1", "suspend");
    });

    const suspendedUser = result.current.users.find((user) => user.id === "1");
    expect(suspendedUser?.status).toBe("suspended");
  });

  it("handles individual user delete", () => {
    const { result } = renderHook(() => useUserManagement());
    const initialUserCount = result.current.users.length;

    // Delete a user
    act(() => {
      result.current.handleUserAction("1", "delete");
    });

    expect(result.current.users).toHaveLength(initialUserCount - 1);
    expect(
      result.current.users.find((user) => user.id === "1")
    ).toBeUndefined();
  });

  it("handles edit action by selecting user", () => {
    const { result } = renderHook(() => useUserManagement());

    // Edit a user (should select them)
    act(() => {
      result.current.handleUserAction("1", "edit");
    });

    expect(result.current.selectedUsers).toEqual(["1"]);
  });

  it("updates total users count when users change", () => {
    const { result } = renderHook(() => useUserManagement());
    const initialCount = result.current.totalUsers;

    // Delete a user
    act(() => {
      result.current.handleUserAction("1", "delete");
    });

    expect(result.current.totalUsers).toBe(initialCount - 1);
  });
});
