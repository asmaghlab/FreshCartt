import React, { useState, useEffect } from 'react'
import useOnLineStatus from '../../Hooks/useOnLineStatus.jsx';
import { Wifi, CircleAlert, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineScreen({ children }) {
  const isOnLine = useOnLineStatus();
  const [lastChecked, setLastChecked] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    if (!isOnLine) {
        setLastChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [isOnLine]);

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOnLine ? (
        children
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#fafafa] flex items-center justify-center p-4 font-sans"
        >
          <div className="max-w-md w-full text-center space-y-8 mt-[-100px]">
            {/* Connection Lost Icon */}
            <div className="relative inline-block">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                 <Wifi size={80} strokeWidth={1.5} className="text-red-500 opacity-20" />
                 <div className="absolute inset-x-0 bottom-2 flex justify-center">
                    <Wifi size={50} strokeWidth={2.5} className="text-red-500" />
                 </div>
              </motion.div>
              <div className="absolute -top-1 -right-1">
                 <div className="bg-red-500 text-white rounded-full p-1 shadow-lg">
                    <CircleAlert size={20} fill="currentColor" className="text-red-500" stroke="white" strokeWidth={3} />
                 </div>
              </div>
            </div>

            {/* Headers */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                Connection Lost
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
                Oops! It looks like you've lost your internet connection. Don't worry, we'll help you get back online.
              </p>
            </div>

            {/* Status Pane */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-3">
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest px-1">
                  <span className="text-gray-400">Network Status:</span>
                  <span className="text-red-500">Offline</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest px-1 border-t border-gray-50 pt-3">
                  <span className="text-gray-400">Last Checked:</span>
                  <span className="text-gray-600">{lastChecked}</span>
               </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleTryAgain}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <RefreshCw size={16} /> Try Again
            </button>

            {/* Quick Fixes */}
            <div className="text-left space-y-4 pt-4">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">Quick Fixes:</h3>
               <ul className="space-y-2 text-[13px] font-medium text-gray-500 max-w-[240px] mx-auto list-disc list-outside pl-4">
                  <li>Check your WiFi connection</li>
                  <li>Try moving closer to your router</li>
                  <li>Restart your router or mobile data</li>
                  <li>Contact your internet provider if the issue persists</li>
               </ul>
            </div>

            {/* Footer */}
            <div className="pt-8 flex flex-col items-center gap-2">
               <div className="flex items-center gap-2 text-[11px] font-black text-gray-300 uppercase tracking-widest">
                  <Search size={12} />
                  Auto-checking connection every 30 seconds
               </div>
               <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                      className="w-1 h-1 rounded-full bg-emerald-500"
                    />
                  ))}
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
