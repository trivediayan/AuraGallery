import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import PreviewModal from './components/PreviewModal';
import useLocalStorage from './hooks/useLocalStorage';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Persisted state using custom hook
  const [likedPins, setLikedPins] = useLocalStorage('aura-liked-pins', []);
  const [savedPins, setSavedPins] = useLocalStorage('aura-saved-pins', []);
  const [darkMode, setDarkMode] = useLocalStorage('aura-dark-mode', false);

  // Modal detailed preview state
  const [selectedPin, setSelectedPin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync dark class on index.html body element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLikeToggle = (id) => {
    setLikedPins((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleSaveToggle = (id) => {
    setSavedPins((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleOpenModal = (pin) => {
    setSelectedPin(pin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPin(null);
  };

  const handleSelectPinInModal = (pin) => {
    setSelectedPin(pin);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 flex flex-col font-sans">
      
      {/* Header Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 py-4 md:py-6">
        {activeTab === 'home' ? (
          <Home
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            likedPins={likedPins}
            savedPins={savedPins}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onOpenModal={handleOpenModal}
          />
        ) : (
          <Favorites
            likedPins={likedPins}
            savedPins={savedPins}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onOpenModal={handleOpenModal}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-6 mt-10 transition-colors duration-300 select-none">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
            &copy; 2026 AuraGallery. For preview and inspiration purposes.
          </p>
          <p className="text-xs text-gray-400 dark:text-zinc-500 flex items-center gap-1 font-medium justify-center">
            Designed with <Heart size={12} className="text-rose-500 fill-current" /> using React, Tailwind CSS and Framer Motion.
          </p>
        </div>
      </footer>

      {/* Detailed Pin Preview Modal overlay */}
      <PreviewModal
        pin={selectedPin}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        likedPins={likedPins}
        savedPins={savedPins}
        onLikeToggle={handleLikeToggle}
        onSaveToggle={handleSaveToggle}
        onSelectPin={handleSelectPinInModal}
      />

    </div>
  );
}
