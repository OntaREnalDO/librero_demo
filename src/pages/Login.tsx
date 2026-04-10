import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Book as BookIcon, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const { login } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      login(name, email);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 p-8 md:p-24 flex flex-col justify-center bg-gray-50 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full z-10"
        >
          <div className="flex items-center gap-2 text-primary-600 font-black text-3xl mb-12">
            <BookIcon className="w-10 h-10" />
            <span>Librero</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Read more. <br />
            <span className="text-primary-600">Spend less.</span>
          </h1>
          <p className="text-gray-500 text-lg mb-12 leading-relaxed">
            The community-driven platform for physical book sharing. Start your circular reading journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-lg shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-lg shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-gray-800 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 mt-8"
            >
              Enter the Library <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="hidden lg:flex flex-1 bg-primary-600 p-24 text-white flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
              <Zap className="w-10 h-10 mb-4 mx-auto" />
              <h3 className="font-bold text-xl mb-2">Instant Credits</h3>
              <p className="text-white/70 text-sm">Earn credits back for every book you contribute to the platform.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-10 h-10 mb-4 mx-auto" />
              <h3 className="font-bold text-xl mb-2">Secure Lockers</h3>
              <p className="text-white/70 text-sm">3-digit combination system ensures your books are always safe.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
              <Heart className="w-10 h-10 mb-4 mx-auto" />
              <h3 className="font-bold text-xl mb-2">Sustainable</h3>
              <p className="text-white/70 text-sm">Reduce your carbon footprint by sharing locally.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
              <BookIcon className="w-10 h-10 mb-4 mx-auto" />
              <h3 className="font-bold text-xl mb-2">Infinite Library</h3>
              <p className="text-white/70 text-sm">Access thousands of books without buying new ones.</p>
            </div>
          </motion.div>
          <p className="text-primary-100 font-bold italic text-xl">"Librero is changing the way we think about ownership."</p>
          <p className="text-white/50 mt-4">— Startup Visionary 2026</p>
        </div>
        
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
