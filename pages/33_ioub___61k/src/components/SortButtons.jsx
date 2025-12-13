import React from 'react';

export default function SortButtons({ onSortChange, currentSort }) {
  // Only include sort options that DummyJSON API supports: id and title
  const sortOptions = [
    { value: 'id-desc', label: 'Latest', icon: 'fa-clock' },
    { value: 'id-asc', label: 'Oldest', icon: 'fa-clock-rotate-left' },
    { value: 'title-asc', label: 'A-Z', icon: 'fa-arrow-down-a-z' },
    { value: 'title-desc', label: 'Z-A', icon: 'fa-arrow-up-z-a' },
  ];

  const handleClearSort = () => {
    onSortChange('id-desc'); // Reset to default (Latest)
  };

  const isDefaultSort = currentSort === 'id-desc';

  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <span className="text-sm font-medium text-gray-600">Sort by:</span>
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${currentSort === option.value
              ? 'bg-[#845EC2] text-white shadow-lg'
              : 'bg-white text-[#4B4453] border border-[#B0A8B9] hover:border-[#845EC2] hover:bg-[#FEF6FF]'
              }`}
          >
            <i className={`fa-solid ${option.icon}`}></i>
            <span>{option.label}</span>
          </button>
        ))}

        {/* Clear Filter Button - Only show when not on default sort */}
        {!isDefaultSort && (
          <button
            onClick={handleClearSort}
            className="cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-[#4B4453] text-white border border-[#4B4453] hover:bg-[#845EC2] hover:border-[#845EC2] shadow-md"
          >
            <i className="fa-solid fa-xmark"></i>
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}

