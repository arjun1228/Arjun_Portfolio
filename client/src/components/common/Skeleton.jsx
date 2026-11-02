import React from 'react';

export const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-800/80 rounded-lg ${className}`}
    />
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 space-y-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-24 h-6 rounded-full" />
        <div className="flex space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-16" />
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="w-16 h-6 rounded-md" />
        <Skeleton className="w-14 h-6 rounded-md" />
        <Skeleton className="w-20 h-6 rounded-md" />
      </div>
    </div>
  );
};

