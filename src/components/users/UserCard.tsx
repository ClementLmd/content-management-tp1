import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

/**
 * UserCard component displays individual user information in a card format
 */
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getRoleColor = (role: User["role"]): string => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "author":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatJoinDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
              user.role
            )}`}
          >
            {user.role}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {user.bio && (
            <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Age:</span>
              <span className="font-medium text-gray-900">{user.age}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Publications:</span>
              <span className="font-medium text-gray-900">
                {user.publications}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Joined on {formatJoinDate(user.joinDate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
