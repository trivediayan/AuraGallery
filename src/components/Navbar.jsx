import React from 'react';
import { Search, Heart, Home, Sun, Moon, X, Sparkles } from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
}) {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
            onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none hover:rotate-12 transition-transform duration-300">
              <Sparkles size={20} className="fill-white/20" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent hidden sm:block">
              AuraGallery
            </span>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-1 select-none shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm shadow-zinc-900/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900'
              }`}
            >
              <Home size={16} />
              Home
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'favorites'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm shadow-zinc-900/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900'
              }`}
            >
              <Heart size={16} className={activeTab === 'favorites' ? 'fill-current' : ''} />
              Favorites
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search gallery by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500/30 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-gray-900 dark:text-zinc-100 placeholder-gray-500 dark:placeholder-zinc-500 outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile Avatar */}
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-100 dark:ring-zinc-900 group-hover:ring-indigo-500/50 transition-all duration-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl py-1 hidden group-hover:block transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                  <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">Logged in as</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-zinc-300 truncate">Jane Doe</p>
                </div>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Heart size={14} /> My Favorites
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-gray-100 dark:border-zinc-900 select-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === 'home'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-zinc-500 dark:text-zinc-500'
            }`}
          >
            <Home size={18} />
            Home
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === 'favorites'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-zinc-500 dark:text-zinc-500'
            }`}
          >
            <Heart size={18} className={activeTab === 'favorites' ? 'fill-current' : ''} />
            Favorites
          </button>
        </div>

      </div>
    </nav>
  );
}
