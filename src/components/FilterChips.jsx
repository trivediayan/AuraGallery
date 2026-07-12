import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function FilterChips({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-2 px-4 select-none">
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md shadow-zinc-900/10 dark:shadow-none scale-105'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
