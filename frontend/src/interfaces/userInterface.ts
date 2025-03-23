export interface AuthState {
  loading: boolean;
  error: null;
  message: null | string;
  user: null | User;
  isAuthenticated: boolean;
  authChecked: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role?: string;
}
