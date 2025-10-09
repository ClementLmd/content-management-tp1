import React from "react";
import { Header } from "@/components/layout/Header";
import { UserCard } from "@/components/users/UserCard";
import { User } from "@/types/user";

/**
 * Hardcoded user data for demonstration purposes
 */
const mockUsers: User[] = [
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
 * Users page component displaying a list of all users
 */
export default function UsersPage(): React.JSX.Element {
  const totalUsers = mockUsers.length;
  const totalPublications = mockUsers.reduce(
    (sum, user) => sum + user.publications,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Content Management" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">
            Manage and view all users in the content management system
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Publications
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalPublications}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg. Publications
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(totalPublications / totalUsers)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Empty State (if no users) */}
        {mockUsers.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first user.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
