import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        onSearch(searchTerm);
      } else {
        onSearch(''); // Reset to show all posts
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className={`fa-solid fa-search text-[#845EC2] ${loading ? 'animate-pulse' : ''}`}></i>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts by title or content..."
          aria-label="Search posts"
          className="w-full pl-12 pr-12 py-4 text-[#4B4453] bg-white border-2 border-[#B0A8B9] rounded-full focus:outline-none focus:border-[#845EC2] focus:ring-2 focus:ring-[#845EC2]/30 transition-all duration-300 shadow-md hover:shadow-lg placeholder-[#B0A8B9]"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#B0A8B9] hover:text-[#845EC2] transition-colors"
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-12 flex items-center">
            <i className="fa-solid fa-spinner fa-spin text-[#845EC2]"></i>
          </div>
        )}
      </div>

      {/* Search Info */}
      {/*       {searchTerm && (
        <div className="mt-2 text-center">
          <p className="text-sm text-[#845EC2]">
            <i className="fa-solid fa-search mr-1"></i>
            Searching for: <span className="font-semibold text-[#4B4453]">"{searchTerm}"</span>
          </p>
        </div>
      )} */}
    </div>
  );
}

