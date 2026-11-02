import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:border-accent-violet transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-violet ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <FiSun className="w-4 h-4 text-amber-400 animate-spin-slow" />
      ) : (
        <FiMoon className="w-4 h-4 text-violet-600" />
      )}
    </button>
  );
};

export default ThemeToggle;

