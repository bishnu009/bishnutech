import { User, GenerationLog, AppSettings, delay } from '../types';

const USERS_KEY = 'bishnutech_users';
const LOGS_KEY = 'bishnutech_logs';
const SETTINGS_KEY = 'bishnutech_settings';
const CURRENT_USER_KEY = 'bishnutech_current_user';

// Initial Settings
const DEFAULT_SETTINGS: AppSettings = {
  signupCredits: 100,
  maintenanceMode: false,
};

// Seed Admin if not exists
const seedAdmin = () => {
  const users = getUsers();
  if (!users.find(u => u.email === 'admin@bishnutech.com')) {
    const admin: User = {
      id: 'admin-1',
      name: 'Super Admin',
      email: 'admin@bishnutech.com',
      passwordHash: 'admin123', // Mock password
      credits: 9999,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    users.push(admin);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const getLogs = (): GenerationLog[] => {
  const data = localStorage.getItem(LOGS_KEY);
  return data ? JSON.parse(data) : [];
};

const getSettings = (): AppSettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : DEFAULT_SETTINGS;
};

export const MockDB = {
  initialize: () => {
    seedAdmin();
  },

  // Auth
  login: async (email: string, password: string): Promise<User> => {
    await delay(500);
    const users = getUsers();
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (!user) throw new Error('Invalid credentials');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    await delay(800);
    const users = getUsers();
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    
    const settings = getSettings();
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: password,
      credits: settings.signupCredits,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  logout: async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    // Refresh user data from main DB in case credits changed
    if (data) {
        const cachedUser = JSON.parse(data) as User;
        const freshUser = getUsers().find(u => u.id === cachedUser.id);
        return freshUser || null;
    }
    return null;
  },

  // User Actions
  deductCredit: async (userId: string, amount: number = 1): Promise<User> => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found');
    
    if (users[index].credits < amount) throw new Error('Insufficient credits');
    
    users[index].credits -= amount;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Update session if it's current user
    const currentUser = MockDB.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
       localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
    }

    return users[index];
  },

  logGeneration: (userId: string, prompt: string, size: string, status: 'success' | 'failed') => {
    const logs = getLogs();
    const newLog: GenerationLog = {
      id: crypto.randomUUID(),
      userId,
      prompt,
      size,
      status,
      createdAt: new Date().toISOString(),
    };
    logs.unshift(newLog); // Add to beginning
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  },

  // Admin Actions
  getAllUsers: async (): Promise<User[]> => {
    await delay(300);
    return getUsers();
  },

  updateUserCredits: async (userId: string, newCredits: number) => {
    await delay(300);
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.credits = newCredits;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },
  
  updateSettings: async (settings: AppSettings) => {
      await delay(200);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },
  
  getSettings: async (): Promise<AppSettings> => {
      return getSettings();
  }
};

MockDB.initialize();