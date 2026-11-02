import React from 'react';

const Loader = ({ size = "md", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-t-accent-violet border-r-accent-cyan border-b-transparent border-l-transparent animate-spin`}
      />
      {message && (
        <p className="text-sm font-mono text-light-muted dark:text-dark-muted">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;

