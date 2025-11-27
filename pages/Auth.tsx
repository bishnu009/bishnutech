import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MockDB } from '../services/mockDb';
import { Loader2, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export const AuthPage: React.FC<AuthProps> = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    setMode(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await MockDB.login(email, password);
      } else {
        await MockDB.signup(name, email, password);
      }
      onLogin(); // Update global state
      navigate('/generator'); // Redirect to dashboard
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md bg-white/70 dark:bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 relative z-10 transition-all">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-white dark:to-slate-300">
            {mode === 'login' ? 'Welcome Back' : 'Join BishnuTech'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            {mode === 'login' ? 'Enter your credentials to access your account' : 'Start creating amazing AI art in seconds'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm text-center font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300 ml-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300 ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-black/50 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => {setMode('signup'); navigate('/auth?mode=signup')}} className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => {setMode('login'); navigate('/auth?mode=login')}} className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};