import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, ExternalLink } from 'lucide-react';

export default function PinCard({
  pin,
  isLiked,
  isSaved,
  onLikeToggle,
  onSaveToggle,
  onOpenModal,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-3 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/20 transition-all duration-300 mb-4 break-inside-avoid group cursor-pointer"
      onClick={() => onOpenModal(pin)}
    >
      {/* Image Wrapper */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-800/50 aspect-auto">
        {/* Placeholder skeleton while image loads */}
        {!imageLoaded && (
          <div 
            className="w-full bg-gray-200 dark:bg-zinc-800 animate-pulse"
            style={{ height: `${pin.height * (300 / pin.width)}px` }}
          />
        )}

        <img
          src={pin.image}
          alt={pin.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover rounded-2xl transform group-hover:scale-102 transition-all duration-500 ease-out ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute top-0 left-0'
          }`}
        />

        {/* Hover Overlay */}
        {imageLoaded && (
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
            {/* Top Row: Save Button */}
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveToggle(pin.id);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
                  isSaved
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'bg-white text-zinc-900 hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
                }`}
              >
                <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Bottom Row: Like and Share buttons */}
            <div className="flex justify-between items-center">
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeToggle(pin.id);
                }}
                className={`p-2.5 rounded-xl shadow-sm transition-all duration-200 cursor-pointer ${
                  isLiked
                    ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                    : 'bg-white text-zinc-900 hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
                }`}
                aria-label={isLiked ? 'Unlike' : 'Like'}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              </button>

              {/* Share/External Link */}
              <a
                href={pin.image}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-xl bg-white text-zinc-900 hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shadow-sm transition-all duration-200"
                aria-label="Open image in new tab"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Info details underneath the card */}
      <div className="mt-3 px-1">
        <h3 className="font-outfit font-bold text-sm text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {pin.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          {pin.description}
        </p>

        {/* Author info */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50 dark:border-zinc-800/50">
          <div className="flex items-center gap-2">
            <img
              src={pin.avatar}
              alt={pin.author}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-100 dark:ring-zinc-800"
            />
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 truncate max-w-[110px]">
              {pin.author}
            </span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400">
            {pin.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
