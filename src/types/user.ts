/**
 * User interface defining the structure of user data
 */
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  publications: number;
  bio?: string;
  avatar?: string;
  joinDate: string;
  role: "admin" | "editor" | "author" | "viewer";
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  permissions: UserPermissions;
}

export interface UserPermissions {
  canCreateArticles: boolean;
  canEditArticles: boolean;
  canDeleteArticles: boolean;
  canPublishArticles: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
}

export interface RolePermissions {
  [key: string]: UserPermissions;
}

export const ROLE_PERMISSIONS: RolePermissions = {
  admin: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canPublishArticles: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canManageSettings: true,
  },
  editor: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canPublishArticles: true,
    canManageUsers: false,
    canViewAnalytics: true,
    canManageSettings: false,
  },
  author: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: false,
    canPublishArticles: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canManageSettings: false,
  },
  viewer: {
    canCreateArticles: false,
    canEditArticles: false,
    canDeleteArticles: false,
    canPublishArticles: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canManageSettings: false,
  },
};
