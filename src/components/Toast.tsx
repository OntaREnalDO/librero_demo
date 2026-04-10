import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';

const Toast: React.FC = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border min-w-[300px] ${
              n.type === 'success' ? 'bg-white border-green-100' : 
              n.type === 'warning' ? 'bg-white border-amber-100' : 
              'bg-white border-blue-100'
            }`}
          >
            <div className={`p-2 rounded-full ${
              n.type === 'success' ? 'bg-green-50 text-green-600' : 
              n.type === 'warning' ? 'bg-amber-50 text-amber-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              {n.type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
               n.type === 'warning' ? <AlertCircle className="w-5 h-5" /> : 
               <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{n.message}</p>
            </div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
