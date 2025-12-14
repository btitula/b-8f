import React from 'react';

export default function PostCard({ post, onOpenModal, isSelected = false }) {
  return (
    <div
      onClick={() => onOpenModal(post)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(post);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Read post: ${post.title}`}
      aria-pressed={isSelected}
      className={`post-card rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative ${isSelected
        ? 'bg-[#FEF6FF] border-2 border-[#845EC2] ring-2 ring-[#845EC2]/30'
        : 'bg-white border border-[#B0A8B9]/20'
        }`}
    >
      {/* Post ID Badge & Selected Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {isSelected && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00896F] text-white shadow-md animate-pulse">
            <i className="fa-solid fa-eye mr-1"></i>
            Viewing
          </span>
        )}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-md ${isSelected ? 'bg-[#845EC2] text-white' : 'bg-[#845EC2] text-white'
          }`}>
          <i className="fa-solid fa-hashtag mr-1 text-xs"></i>
          {post.id}
        </span>
      </div>

      <div className="mb-4 pr-16">
        <h2 className="text-2xl font-bold text-[#4B4453] mb-2 hover:text-[#845EC2] transition-colors">
          {post.title}
        </h2>
        <p className="text-[#B0A8B9] line-clamp-3">{post.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#00896F] text-white text-sm rounded-full shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author and Reactions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#B0A8B9]/30">
        <div className="flex items-center">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.fullName}
              className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-[#845EC2]/30"
            />
          ) : (
            <div className="w-8 h-8 bg-[#845EC2] rounded-full flex items-center justify-center text-white font-semibold mr-2 shadow-md">
              {post.author.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm text-[#4B4453] font-medium">{post.author.fullName}</span>
        </div>

        {/* Reaction Icons */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-[#B0A8B9] hover:text-[#845EC2] transition-colors"
            aria-label={`${post.reactions.likes} likes`}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa-regular fa-heart"></i>
            <span className="text-sm">{post.reactions.likes}</span>
          </button>
          <button
            className="flex items-center gap-1 text-[#B0A8B9] hover:text-[#845EC2] transition-colors"
            aria-label={`${post.reactions.dislikes} dislikes`}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa-regular fa-thumbs-down"></i>
            <span className="text-sm">{post.reactions.dislikes}</span>
          </button>
          <div
            className="flex items-center gap-1 text-[#B0A8B9]"
            aria-label={`${post.reactions.views} views`}
          >
            <i className="fa-regular fa-eye"></i>
            <span className="text-sm">{post.reactions.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

