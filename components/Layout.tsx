import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Moon, Sun, Menu, X, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Oval Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 rounded-[50%] blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg"
                  alt="Flag of Nepal"
                  className="relative w-12 h-16 object-cover rounded-[50%] border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-white dark:to-slate-300">
                BishnuTech AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  <Link 
                    to="/generator" 
                    className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${isActive('/generator') ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    Generator
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${isActive('/admin') ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                  <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Credits</span>
                    <span className={`text-sm font-bold ${user.credits > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {user.credits}
                    </span>
                  </div>
                  <button onClick={onLogout} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link to="/auth?mode=signup" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all transform hover:-translate-y-0.5">
                    Sign up free
                  </Link>
                </>
              )}
              
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-4">
              <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 absolute w-full z-50">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm font-bold text-slate-500 flex justify-between">
                     <span>Credits</span>
                     <span className="text-emerald-500">{user.credits}</span>
                  </div>
                  <Link to="/generator" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-100 dark:hover:bg-white/10">
                    Generator
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-100 dark:hover:bg-white/10">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-100 dark:hover:bg-white/10">
                    Log In
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white mt-4 text-center shadow-lg">
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-10 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold">BishnuTech AI</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 BishnuTech AI. Crafted with <span className="text-red-500">❤</span> for creators.</p>
          <div className="flex justify-center space-x-8 mt-6">
             <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors">Privacy</a>
             <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors">Terms</a>
             <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};