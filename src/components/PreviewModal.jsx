import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Bookmark, Download, ArrowLeft } from 'lucide-react';
import { mockPins } from '../data/mockData';

export default function PreviewModal({
  pin,
  isOpen,
  onClose,
  likedPins,
  savedPins,
  onLikeToggle,
  onSaveToggle,
  onSelectPin,
}) {
  const modalRef = useRef(null);

  // Close on Escape press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pin) return null;

  const isLiked = likedPins.includes(pin.id);
  const isSaved = savedPins.includes(pin.id);

  // Filter recommendations: other pins in the same category (max 6)
  const recommendations = mockPins
    .filter((p) => p.category === pin.category && p.id !== pin.id)
    .slice(0, 6);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
        {/* Backdrop click close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          ref={modalRef}
          className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 sm:rounded-3xl shadow-2xl flex flex-col md:flex-row max-h-full md:max-h-[90vh] overflow-hidden z-10 border border-gray-100 dark:border-zinc-800"
        >
          {/* Back button (Mobile only) */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Left Column: Image (Scrollable or sticky depending on height) */}
          <div className="w-full md:w-[55%] bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4 min-h-[300px] md:min-h-0 overflow-hidden relative">
            <img
              src={pin.image}
              alt={pin.title}
              className="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Right Column: Content & Details (Scrollable) */}
          <div className="w-full md:w-[45%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar md:h-[90vh] bg-white dark:bg-zinc-900 border-l border-gray-50 dark:border-zinc-800/50">
            <div>
              {/* Header Actions */}
              <div className="flex items-center justify-between gap-4 mb-6 select-none">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                  {pin.category}
                </span>

                <div className="flex items-center gap-2">
                  {/* Download Image Link */}
                  <a
                    href={pin.image}
                    download={`auragallery-${pin.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                    title="Download original image"
                  >
                    <Download size={18} />
                  </a>

                  {/* Close button (Desktop) */}
                  <button
                    onClick={onClose}
                    className="hidden md:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="flex items-center justify-between gap-4 mb-6 select-none">
                <button
                  onClick={() => onLikeToggle(pin.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
                    isLiked
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'bg-gray-100 text-zinc-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>

                <button
                  onClick={() => onSaveToggle(pin.id)}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
                    isSaved
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                      : 'border border-gray-200 text-zinc-800 hover:bg-gray-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* Text Description */}
              <div className="space-y-4">
                <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white leading-tight">
                  {pin.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                  {pin.description}
                </p>
              </div>

              {/* Author details */}
              <div className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900">
                <img
                  src={pin.avatar}
                  alt={pin.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                />
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {pin.author}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    Content Creator
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="mt-8 border-t border-gray-100 dark:border-zinc-800 pt-6">
              <h3 className="font-outfit font-bold text-base text-zinc-800 dark:text-zinc-200 mb-4">
                More like this
              </h3>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => onSelectPin(rec)}
                      className="group cursor-pointer rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-950 aspect-[4/3] relative border border-gray-100 dark:border-zinc-900"
                    >
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                        <span className="text-[10px] font-semibold text-white truncate w-full">
                          {rec.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-600">
                  No similar items in this category yet.
                </p>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
