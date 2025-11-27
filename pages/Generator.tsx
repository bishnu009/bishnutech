import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { MockDB } from '../services/mockDb';
import { User } from '../types';
import { Loader2, Download, AlertCircle, Wand2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratorProps {
  user: User;
  onUpdateUser: (u: User) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ user, onUpdateUser }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // 1. Check Credits
    if (user.credits <= 0) {
      setError("You have 0 credits. Please contact admin for more.");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // 2. Call API
      const base64Image = await GeminiService.generateImage(prompt);
      
      // 3. Deduct Credit
      const updatedUser = await MockDB.deductCredit(user.id, 1);
      
      // 4. Log Success
      MockDB.logGeneration(user.id, prompt, "1024x1024", "success");
      
      setGeneratedImage(base64Image);
      onUpdateUser(updatedUser); // Update parent state with new credit count

    } catch (err: any) {
      setError(err.message || "Failed to generate image");
      MockDB.logGeneration(user.id, prompt, "1024x1024", "failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `bishnutech-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Controls */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
              Create Magic
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Describe your imagination in detail. <span className="text-violet-500 font-semibold">1 credit per generation.</span>
            </p>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/20 dark:border-white/10 relative overflow-hidden group">
             {/* Subtle gradient border effect on hover via pseudo element if desired, or simpler implementation */}
             
             <div className="space-y-5 relative z-10">
                <div className="flex justify-between items-center">
                   <label className="block font-bold text-sm text-slate-500 uppercase tracking-wide flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-yellow-500" />
                     Enter your prompt
                   </label>
                   <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-500">
                     Gemini 2.5 Flash
                   </span>
                </div>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city floating in the clouds, cyberpunk style, neon lights, 4k render..."
                  className="w-full h-40 p-5 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all text-lg shadow-inner placeholder:text-slate-400"
                />
                
                <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
                   <span className="flex items-center gap-2">
                     Credits: 
                     <span className={`font-bold px-2 py-0.5 rounded ${user.credits > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700"}`}>
                       {user.credits}
                     </span>
                   </span>
                   {prompt && (
                     <button 
                       onClick={() => setPrompt('')}
                       className="text-slate-400 hover:text-red-500 transition-colors text-xs font-medium"
                      >
                       CLEAR
                     </button>
                   )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-sm border border-red-100 dark:border-red-900/30">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt || user.credits <= 0}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-violet-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Creating Masterpiece...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Image
                    </>
                  )}
                </button>
             </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 p-5 rounded-2xl text-sm text-indigo-800 dark:text-indigo-300 flex gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-800/30 rounded-lg h-fit">
               <Sparkles className="w-4 h-4" />
            </div>
            <div>
               <strong className="block mb-1">Pro Tip:</strong> 
               Be specific about lighting, style (e.g., "oil painting", "photorealistic"), and mood for best results.
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="flex flex-col h-full">
           <div className={`relative flex-grow min-h-[450px] lg:min-h-[600px] rounded-3xl border-2 border-dashed ${generatedImage ? 'border-transparent shadow-2xl' : 'border-slate-200 dark:border-white/10'} flex items-center justify-center bg-slate-50 dark:bg-black/40 overflow-hidden transition-all duration-500`}>
              <AnimatePresence mode="wait">
                {loading && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md"
                   >
                      <div className="relative w-24 h-24 mb-8">
                         <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-white/10"></div>
                         <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
                      </div>
                      <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 animate-pulse">
                        Dreaming up pixels...
                      </p>
                   </motion.div>
                )}

                {generatedImage ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full group"
                  >
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="w-full h-full object-contain bg-black/90"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                       <button 
                         onClick={handleDownload}
                         className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl"
                       >
                         <Download className="w-5 h-5" /> Download Art
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  !loading && (
                    <div className="text-center text-slate-400 p-8 max-w-sm">
                       <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 dark:border-white/5">
                          <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                       </div>
                       <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Canvas Empty</h3>
                       <p className="text-slate-500">Your imagination is the limit. Enter a prompt to start creating.</p>
                    </div>
                  )
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};