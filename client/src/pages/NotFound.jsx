import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        <span className="font-mono text-6xl sm:text-8xl font-black text-gradient block">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono">
          Page Not Found
        </h1>
        <p className="text-sm font-mono text-light-muted dark:text-dark-muted">
          The requested route does not exist or has been relocated.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-gradient text-white text-sm font-mono font-medium shadow-glow hover:opacity-95 transition-opacity"
          >
            <FiHome />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

