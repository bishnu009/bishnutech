import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles, Wand2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Removed "Powered by Gemini" badge */}
            
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">Dream it.</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 animate-gradient-x">
                Generate it.
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your words into breathtaking art. 
              Professional grade AI generation with a simple, colorful interface.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth?mode=signup" className="group inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-1 transition-all duration-300">
                <Wand2 className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Creating Free
              </Link>
              <Link to="/auth?mode=login" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                Log In
                <ArrowRight className="ml-2 w-5 h-5 opacity-70" />
              </Link>
            </div>
          </motion.div>

          {/* Demo Image placeholder with animation */}
          <motion.div 
            className="mt-20 relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-slate-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 flex items-end justify-center pb-10">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full">
                  <p className="text-white font-medium">"A futuristic cyberpunk city with neon lights in rain, digital art"</p>
               </div>
            </div>
            <img 
              src="https://picsum.photos/1200/600?grayscale" 
              alt="AI Generated Demo" 
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000 ease-out"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for Creators</h2>
            <p className="text-slate-500 text-lg">Everything you need to bring your ideas to life.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-500" />} 
              title="Lightning Fast" 
              desc="Generate complex scenes in seconds using the latest Gemini Flash models. No waiting around."
              color="bg-yellow-50 dark:bg-yellow-900/10"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-emerald-500" />} 
              title="Secure & Private" 
              desc="Your data is safe. We do not permanently store your generated images. What happens here, stays here." 
              color="bg-emerald-50 dark:bg-emerald-900/10"
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-violet-500" />} 
              title="High Quality" 
              desc="Professional grade resolution suitable for designers, marketers, and content creators." 
              color="bg-violet-50 dark:bg-violet-900/10"
            />
          </div>
        </div>
      </section>
      
       {/* Pricing / Credits Info */}
       <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 dark:bg-zinc-900 -z-20"></div>
          {/* Decorative gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] rounded-full -z-10"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 mb-12">Pay as you go. No hidden subscriptions.</p>
            
            <div className="relative bg-white/70 dark:bg-black/40 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50 dark:border-white/10 overflow-hidden group hover:border-violet-500/30 transition-colors">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500"></div>
               
               <div className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                 1 Credit
               </div>
               <div className="text-xl text-slate-500 font-medium mb-8">= 1 Image Generation</div>
               
               <div className="py-8 border-t border-b border-slate-200 dark:border-white/5 mb-8">
                  <p className="text-2xl">
                    Sign up today and get <span className="font-bold text-violet-600 dark:text-violet-400">100 Free Credits</span>.
                  </p>
               </div>
               
               <Link to="/auth?mode=signup" className="inline-block w-full sm:w-auto px-10 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:transform hover:scale-105 transition-all shadow-lg">
                 Get Started Now &rarr;
               </Link>
            </div>
          </div>
       </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => (
  <div className={`flex flex-col items-start text-left space-y-4 p-8 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-900/30 transition-all hover:shadow-xl hover:shadow-violet-900/5 bg-white dark:bg-white/5 backdrop-blur-sm group`}>
    <div className={`p-4 rounded-2xl ${color} transition-transform group-hover:scale-110 duration-300`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
  </div>
);