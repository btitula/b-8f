import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, loading }) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination: 1 2 3 ... lastPage-2 lastPage-1 lastPage
      if (currentPage <= 3) {
        // Near the beginning: 1 2 3 4 ... lastPage
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1 ... lastPage-3 lastPage-2 lastPage-1 lastPage
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle: 1 ... currentPage-1 currentPage currentPage+1 ... lastPage
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="cursor-pointer w-8 h-8 rounded-full border border-[#B0A8B9] bg-white text-[#4B4453] hover:bg-[#FEF6FF] hover:border-[#845EC2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`cursor-pointer min-w-[40px] px-2 py-2 rounded-full font-medium transition-all duration-200 ${currentPage === page
                ? 'bg-[#845EC2] text-white shadow-lg'
                : 'bg-white text-[#4B4453] border border-[#B0A8B9] hover:bg-[#FEF6FF] hover:border-[#845EC2]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="cursor-pointer w-8 h-8 rounded-full border border-[#B0A8B9] bg-white text-[#4B4453] hover:bg-[#FEF6FF] hover:border-[#845EC2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
        aria-label="Next page"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Page Info */}
      {/* <div className="ml-4 text-sm text-[#B0A8B9]">
        Page <span className="font-semibold text-[#4B4453]">{currentPage}</span> of{' '}
        <span className="font-semibold text-[#4B4453]">{totalPages}</span>
      </div> */}
    </div>
  );
}

