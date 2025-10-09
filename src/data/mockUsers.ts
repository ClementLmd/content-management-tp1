import { User } from "@/types/user";

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
