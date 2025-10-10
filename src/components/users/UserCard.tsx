import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

/**
 * UserCard component displays individual user information in a card format
 */
export function UserCard({ user }: UserCardProps) {
  const getRoleColor = (role: User["role"]): string => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "author":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "viewer":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusColor = (status: User["status"]): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatJoinDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatLastLogin = (lastLogin?: string): string => {
    if (!lastLogin) return "Never";
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatJoinDate(lastLogin);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {user.bio && (
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {user.bio}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">Age:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {user.age}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">
                Publications:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {user.publications}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700 space-y-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Joined on {formatJoinDate(user.joinDate)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last login: {formatLastLogin(user.lastLogin)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
