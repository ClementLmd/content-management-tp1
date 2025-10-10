import { User, ROLE_PERMISSIONS } from "@/types/user";

/**
 * Mock user data for demonstration and testing purposes
 *
 * This data represents a diverse set of users with different roles,
 * ages, and publication counts to showcase the user management system.
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    publications: 15,
    bio: "Passionate content creator with expertise in technology and digital marketing. Loves sharing insights about the latest trends in web development.",
    joinDate: "2023-01-15",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    permissions: ROLE_PERMISSIONS.admin,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    age: 35,
    publications: 8,
    bio: "Experienced editor with a keen eye for detail. Specializes in technical writing and content strategy.",
    joinDate: "2023-03-22",
    role: "editor",
    status: "active",
    lastLogin: "2024-01-14T16:45:00Z",
    permissions: ROLE_PERMISSIONS.editor,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    age: 24,
    publications: 22,
    bio: "Creative writer and social media enthusiast. Focuses on lifestyle content and user engagement strategies.",
    joinDate: "2023-02-10",
    role: "author",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
    permissions: ROLE_PERMISSIONS.author,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@example.com",
    age: 42,
    publications: 3,
    bio: "Industry veteran with deep knowledge in business development and market analysis.",
    joinDate: "2023-04-05",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-01-10T14:20:00Z",
    permissions: ROLE_PERMISSIONS.viewer,
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@example.com",
    age: 31,
    publications: 12,
    bio: "UX/UI designer turned content creator. Passionate about user experience and design thinking methodologies.",
    joinDate: "2023-01-28",
    role: "author",
    status: "active",
    lastLogin: "2024-01-15T11:00:00Z",
    permissions: ROLE_PERMISSIONS.author,
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    age: 29,
    publications: 5,
    bio: "New team member with fresh perspectives on content creation and digital marketing strategies.",
    joinDate: "2023-12-01",
    role: "author",
    status: "suspended",
    lastLogin: "2024-01-05T08:30:00Z",
    permissions: ROLE_PERMISSIONS.author,
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    age: 26,
    publications: 18,
    bio: "Content strategist with expertise in SEO and social media marketing. Always looking for innovative ways to engage audiences.",
    joinDate: "2023-06-15",
    role: "editor",
    status: "active",
    lastLogin: "2024-01-15T13:45:00Z",
    permissions: ROLE_PERMISSIONS.editor,
  },
  {
    id: "8",
    name: "Henry Taylor",
    email: "henry.taylor@example.com",
    age: 38,
    publications: 2,
    bio: "Business analyst who occasionally contributes content about industry trends and market insights.",
    joinDate: "2023-08-20",
    role: "viewer",
    status: "active",
    lastLogin: "2024-01-12T15:30:00Z",
    permissions: ROLE_PERMISSIONS.viewer,
  },
];

/**
 * Helper function to get user statistics
 */
export function getUserStats(users: User[]) {
  const totalUsers = users.length;
  const totalPublications = users.reduce(
    (sum, user) => sum + user.publications,
    0
  );
  const averagePublications =
    totalUsers > 0 ? Math.round(totalPublications / totalUsers) : 0;

  return {
    totalUsers,
    totalPublications,
    averagePublications,
  };
}

/**
 * Helper function to get users by role
 */
export function getUsersByRole(users: User[], role: User["role"]) {
  return users.filter((user) => user.role === role);
}

/**
 * Helper function to get users with most publications
 */
export function getTopPublishers(users: User[], limit: number = 3) {
  return users.sort((a, b) => b.publications - a.publications).slice(0, limit);
}
