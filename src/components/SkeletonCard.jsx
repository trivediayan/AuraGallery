import React from 'react';

export default function SkeletonCard({ height = 300 }) {
  return (
    <div 
      className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-3 border border-gray-100 dark:border-zinc-800 shadow-sm animate-pulse mb-4 break-inside-avoid"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Shimmer Image Area */}
      <div 
        className="w-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]"
        style={{ height: `${height}px` }}
      />
      
      {/* Content Skeleton */}
      <div className="mt-3 px-1 space-y-2.5">
        {/* Title Bar */}
        <div className="h-4 w-2/3 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
        
        {/* Description Bar */}
        <div className="h-3 w-5/6 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
        
        {/* Author details */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
          <div className="h-3 w-1/3 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
        </div>
      </div>
    </div>
  );
}
