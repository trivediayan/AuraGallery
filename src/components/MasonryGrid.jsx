import React, { useState, useEffect } from 'react';
import PinCard from './PinCard';
import SkeletonCard from './SkeletonCard';
import { CameraOff } from 'lucide-react';

export default function MasonryGrid({
  pins,
  loading,
  likedPins,
  savedPins,
  onLikeToggle,
  onSaveToggle,
  onOpenModal,
}) {
  const [columnCount, setColumnCount] = useState(4);

  // Responsive column count logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 768) {
        setColumnCount(2);
      } else if (width < 1024) {
        setColumnCount(3);
      } else if (width < 1280) {
        setColumnCount(4);
      } else {
        setColumnCount(5);
      }
    };

    // Run once on mount and attach listener
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Programmatically distribute pins across column arrays
  const columns = Array.from({ length: columnCount }, () => []);
  pins.forEach((pin, index) => {
    columns[index % columnCount].push(pin);
  });

  // Loading state with variable height skeleton cards
  if (loading && pins.length === 0) {
    const skeletonHeights = [280, 360, 420, 300, 380, 260, 340, 400];
    const skeletonColumns = Array.from({ length: columnCount }, () => []);
    
    // Generate 12 skeletons
    Array.from({ length: 12 }).forEach((_, index) => {
      const randomHeight = skeletonHeights[index % skeletonHeights.length];
      skeletonColumns[index % columnCount].push(
        <SkeletonCard key={index} height={randomHeight} />
      );
    });

    return (
      <div className="flex gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {skeletonColumns.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {col}
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-gray-400 dark:text-zinc-600 mb-4">
          <CameraOff size={28} />
        </div>
        <h3 className="font-outfit font-bold text-lg text-zinc-800 dark:text-zinc-200">
          No matches found
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 max-w-xs mt-1">
          Try expanding your search query or choosing a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-4">
          {col.map((pin) => (
            <PinCard
              key={pin.id}
              pin={pin}
              isLiked={likedPins.includes(pin.id)}
              isSaved={savedPins.includes(pin.id)}
              onLikeToggle={onLikeToggle}
              onSaveToggle={onSaveToggle}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
