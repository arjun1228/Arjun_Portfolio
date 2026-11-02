import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ show, message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-card border border-dark-border shadow-glow text-white text-sm font-medium"
        >
          {type === 'success' && <FiCheckCircle className="w-5 h-5 text-emerald-400" />}
          {type === 'error' && <FiAlertCircle className="w-5 h-5 text-rose-400" />}
          {type === 'info' && <FiInfo className="w-5 h-5 text-cyan-400" />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

