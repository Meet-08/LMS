import { book } from "./bookInterface";

export interface AuthState {
  loading: boolean;
  error: null;
  message: null | string;
  user: null | User;
  isAuthenticated: boolean;
  authChecked: boolean;
}

export interface userState {
  users: User[] | null;
  loading: boolean;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  avatarUrl?: string;
  borrowedBooks?: book[];
  createdAt?: string;
}
