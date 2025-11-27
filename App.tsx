import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/Landing';
import { AuthPage } from './pages/Auth';
import { Generator } from './pages/Generator';
import { AdminPanel } from './pages/Admin';
import { MockDB } from './services/mockDb';
import { User } from './types';

interface ProtectedRouteProps {
  user: User | null;
  requireAdmin?: boolean;
}

// Protected Route Wrapper
const ProtectedRoute = ({ children, user, requireAdmin = false }: React.PropsWithChildren<ProtectedRouteProps>) => {
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const currentUser = MockDB.getCurrentUser();
    setUser(currentUser);
    setInitializing(false);
  }, [location.pathname]); // Re-check on nav change to ensure credits are fresh

  const handleLogin = () => {
    const currentUser = MockDB.getCurrentUser();
    setUser(currentUser);
  };

  const handleLogout = () => {
    MockDB.logout();
    setUser(null);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (initializing) {
     return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div></div>;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/auth" element={
          user ? <Navigate to="/generator" replace /> : <AuthPage onLogin={handleLogin} />
        } />
        
        <Route path="/generator" element={
          <ProtectedRoute user={user}>
            <Generator user={user!} onUpdateUser={handleUserUpdate} />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute user={user} requireAdmin={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;