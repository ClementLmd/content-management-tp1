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
}
