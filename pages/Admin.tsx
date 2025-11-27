import React, { useEffect, useState } from 'react';
import { MockDB } from '../services/mockDb';
import { User, AppSettings } from '../types';
import { Save, RefreshCw, Edit2, Check, X, Shield } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings>({ signupCredits: 0, maintenanceMode: false });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCredits, setEditCredits] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    const u = await MockDB.getAllUsers();
    const s = await MockDB.getSettings();
    setUsers(u);
    setSettings(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveCredits = async (userId: string) => {
    await MockDB.updateUserCredits(userId, editCredits);
    setEditingId(null);
    fetchData();
  };

  const handleUpdateSettings = async (newSettings: AppSettings) => {
      await MockDB.updateSettings(newSettings);
      setSettings(newSettings);
      alert("Settings updated!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold flex items-center gap-3">
             <Shield className="w-8 h-8 text-violet-600" />
             Admin Dashboard
           </h1>
           <p className="text-slate-500 mt-1">Manage users, credits, and system settings.</p>
        </div>
        <button onClick={fetchData} className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-sm hover:shadow-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-violet-600 transition-all active:scale-95">
           <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 p-8 mb-8">
         <h2 className="text-xl font-bold mb-6">System Configuration</h2>
         <div className="flex flex-col sm:flex-row items-end gap-4 max-w-md">
            <div className="w-full">
               <label className="block text-sm font-bold mb-2 text-slate-500 uppercase tracking-wider">Signup Free Credits</label>
               <input 
                 type="number" 
                 value={settings.signupCredits}
                 onChange={(e) => setSettings({...settings, signupCredits: parseInt(e.target.value) || 0})}
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-black focus:ring-2 focus:ring-violet-500 outline-none"
               />
            </div>
            <button 
              onClick={() => handleUpdateSettings(settings)}
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 w-full sm:w-auto justify-center"
            >
               <Save className="w-4 h-4" /> Save
            </button>
         </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-bold">User Database <span className="text-slate-400 text-sm font-normal ml-2">({users.length} total)</span></h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-black/20 text-slate-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Email</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Joined</th>
                <th className="px-8 py-4">Credits</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-4 font-semibold text-slate-700 dark:text-slate-200">{user.name}</td>
                  <td className="px-8 py-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                  <td className="px-8 py-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {user.role}
                     </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-4">
                    {editingId === user.id ? (
                       <div className="flex items-center gap-2 bg-white dark:bg-black p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                          <input 
                            type="number" 
                            value={editCredits} 
                            onChange={(e) => setEditCredits(parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 bg-transparent outline-none font-mono text-center"
                            autoFocus
                          />
                          <button onClick={() => handleSaveCredits(user.id)} className="p-1 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded"><Check className="w-4 h-4"/></button>
                          <button onClick={() => setEditingId(null)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><X className="w-4 h-4"/></button>
                       </div>
                    ) : (
                       <span className={`font-mono font-bold ${user.credits < 5 ? 'text-red-500' : 'text-emerald-500'}`}>{user.credits}</span>
                    )}
                  </td>
                  <td className="px-8 py-4 text-right">
                    {editingId !== user.id && (
                        <button 
                          onClick={() => { setEditingId(user.id); setEditCredits(user.credits); }}
                          className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-all"
                          title="Edit Credits"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};