import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, FolderHeart, FolderOpen } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import { mockPins } from '../data/mockData';

export default function Favorites({
  likedPins,
  savedPins,
  onLikeToggle,
  onSaveToggle,
  onOpenModal,
}) {
  const [activeFavTab, setActiveFavTab] = useState('liked'); // 'liked' or 'saved'
  const [displayPins, setDisplayPins] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync displayed pins when active tab or liked/saved states change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [];
      if (activeFavTab === 'liked') {
        filtered = mockPins.filter((pin) => likedPins.includes(pin.id));
      } else {
        filtered = mockPins.filter((pin) => savedPins.includes(pin.id));
      }
      setDisplayPins(filtered);
      setLoading(false);
    }, 300); // Small fade-in shimmer latency

    return () => clearTimeout(timer);
  }, [activeFavTab, likedPins, savedPins]);

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto py-6">
      
      {/* Sub-Tab Navigation */}
      <div className="flex items-center justify-center gap-3 border-b border-gray-100 dark:border-zinc-900 pb-4 mb-6 select-none">
        <button
          onClick={() => setActiveFavTab('liked')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
            activeFavTab === 'liked'
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
              : 'text-zinc-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          <Heart size={16} className={activeFavTab === 'liked' ? 'fill-current' : ''} />
          Liked ({likedPins.length})
        </button>

        <button
          onClick={() => setActiveFavTab('saved')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
            activeFavTab === 'saved'
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400'
              : 'text-zinc-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          <Bookmark size={16} className={activeFavTab === 'saved' ? 'fill-current' : ''} />
          Saved ({savedPins.length})
        </button>
      </div>

      {/* Main Grid View */}
      <div className="w-full min-h-[40vh]">
        {displayPins.length > 0 ? (
          <MasonryGrid
            pins={displayPins}
            loading={loading}
            likedPins={likedPins}
            savedPins={savedPins}
            onLikeToggle={onLikeToggle}
            onSaveToggle={onSaveToggle}
            onOpenModal={onOpenModal}
          />
        ) : (
          /* Custom Empty State for Favorites */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center select-none">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-4 animate-bounce">
              {activeFavTab === 'liked' ? <FolderHeart size={28} /> : <FolderOpen size={28} />}
            </div>
            <h3 className="font-outfit font-bold text-lg text-zinc-800 dark:text-zinc-200">
              No {activeFavTab === 'liked' ? 'liked' : 'saved'} pins yet
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 max-w-xs mt-1 leading-relaxed">
              Explore the home feed and click the {activeFavTab === 'liked' ? 'heart icon' : 'bookmark icon'} to collect your favorite inspirations.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
