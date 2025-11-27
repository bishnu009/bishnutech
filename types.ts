export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text, this mock stores simple hash
  credits: number;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface GenerationLog {
  id: string;
  userId: string;
  prompt: string;
  size: string;
  createdAt: string;
  status: 'success' | 'failed';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppSettings {
  signupCredits: number;
  maintenanceMode: boolean;
}

// Helper to simulate delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));