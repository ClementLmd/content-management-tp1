import { useState, useMemo } from "react";
import { mockUsers, getUserStats } from "@/data/mockUsers";
import { User, UserFilters } from "@/types/user";

export interface UserManagementState {
  users: User[];
  selectedUsers: string[];
  filters: UserFilters;
  filteredUsers: User[];
  totalUsers: number;
}

export interface UserManagementActions {
  setFilters: (filters: UserFilters) => void;
  setSelectedUsers: (userIds: string[]) => void;
  handleBulkAction: (action: string) => void;
  handleUserAction: (userId: string, action: string) => void;
}

export type UserManagementHook = UserManagementState & UserManagementActions;

/**
 * Custom hook for managing user state and operations
 */
export const useUserManagement = (): UserManagementHook => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState<UserFilters>({
    role: "all",
    status: "all",
    search: "",
  });

  const { totalUsers } = getUserStats(users);

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = filters.role === "all" || user.role === filters.role;
      const matchesStatus =
        filters.status === "all" || user.status === filters.status;
      const matchesSearch =
        filters.search === "" ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, filters]);

  // Handle bulk actions on selected users
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, selectedUsers);

    switch (action) {
      case "change-role-admin":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, role: "admin" as const }
              : user
          )
        );
        break;
      case "change-role-editor":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, role: "editor" as const }
              : user
          )
        );
        break;
      case "change-role-author":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, role: "author" as const }
              : user
          )
        );
        break;
      case "change-role-viewer":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, role: "viewer" as const }
              : user
          )
        );
        break;
      case "change-status-active":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: "active" as const }
              : user
          )
        );
        break;
      case "change-status-inactive":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: "inactive" as const }
              : user
          )
        );
        break;
      case "change-status-suspended":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: "suspended" as const }
              : user
          )
        );
        break;
      case "delete":
        setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
        break;
    }

    // Clear selection after action
    setSelectedUsers([]);
  };

  // Handle individual user actions
  const handleUserAction = (userId: string, action: string) => {
    console.log(`User action: ${action} for user ${userId}`);

    switch (action) {
      case "edit":
        // Select the user and show bulk actions for editing
        setSelectedUsers([userId]);
        break;
      case "suspend":
        setUsers(
          users.map((user) =>
            user.id === userId
              ? { ...user, status: "suspended" as const }
              : user
          )
        );
        break;
      case "delete":
        setUsers(users.filter((user) => user.id !== userId));
        break;
    }
  };

  return {
    // State
    users,
    selectedUsers,
    filters,
    filteredUsers,
    totalUsers,

    // Actions
    setFilters,
    setSelectedUsers,
    handleBulkAction,
    handleUserAction,
  };
};
