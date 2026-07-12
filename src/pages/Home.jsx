import React, { useState, useEffect, useCallback } from 'react';
import FilterChips from '../components/FilterChips';
import MasonryGrid from '../components/MasonryGrid';
import { mockPins } from '../data/mockData';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const PAGE_SIZE = 15;

export default function Home({
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  likedPins,
  savedPins,
  onLikeToggle,
  onSaveToggle,
  onOpenModal,
}) {
  const [filteredPins, setFilteredPins] = useState([]);
  const [visiblePins, setVisiblePins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 1. Filter pins based on category & search query
  useEffect(() => {
    setLoading(true);
    // Add small delay to simulate network request when search or category changes
    const timer = setTimeout(() => {
      let result = mockPins;

      // Filter by category
      if (selectedCategory && selectedCategory !== 'All') {
        result = result.filter(pin => pin.category === selectedCategory);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(pin => pin.title.toLowerCase().includes(query));
      }

      setFilteredPins(result);
      setVisibleCount(PAGE_SIZE); // Reset pagination count on search/category change
      setVisiblePins(result.slice(0, PAGE_SIZE));
      setLoading(false);
    }, 400); // 400ms loading skeleton simulation

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // 2. Infinite scroll load more function
  const loadMorePins = useCallback(() => {
    return new Promise((resolve) => {
      if (visiblePins.length >= filteredPins.length) {
        resolve();
        return;
      }
      
      // Simulate network request loading time for next pages
      setTimeout(() => {
        const nextCount = visibleCount + PAGE_SIZE;
        setVisibleCount(nextCount);
        setVisiblePins(filteredPins.slice(0, nextCount));
        resolve();
      }, 600); // 600ms latency to showcase skeleton cards
    });
  }, [visiblePins.length, filteredPins, visibleCount]);

  const [infiniteScrollTarget, isFetching] = useInfiniteScroll(loadMorePins);

  const hasMore = visiblePins.length < filteredPins.length;

  return (
    <div className="w-full flex-1">
      {/* Category filter chips */}
      <FilterChips
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Grid container */}
      <div className="w-full py-4 min-h-[50vh]">
        <MasonryGrid
          pins={visiblePins}
          loading={loading}
          likedPins={likedPins}
          savedPins={savedPins}
          onLikeToggle={onLikeToggle}
          onSaveToggle={onSaveToggle}
          onOpenModal={onOpenModal}
        />
      </div>

      {/* Infinite Scroll Trigger & Skeleton loader for next page */}
      {hasMore && (
        <div ref={infiniteScrollTarget} className="w-full py-8 flex flex-col items-center justify-center">
          {isFetching && (
            <div className="flex gap-2 items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm select-none">
              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-2 font-outfit">Loading fresh inspirations...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
