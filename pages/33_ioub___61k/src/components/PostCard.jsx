import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function PostCard({ post, onOpenModal, isSelected = false, onEdit, onDelete }) {
  const handleOpen = (e) => {
    e.stopPropagation();
    onOpenModal(post);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(post);
    } else {
      alert(`Edit post: ${post.title}\n\nThis feature is coming soon!`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      const confirmed = window.confirm(`Are you sure you want to delete "${post.title}"?`);
      if (confirmed) {
        onDelete(post);
      }
    } else {
      const confirmed = window.confirm(`Delete post: ${post.title}?\n\nThis feature is coming soon!`);
      if (confirmed) {
        console.log('Delete post:', post.id);
      }
    }
  };

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
      className={`post-card-wrapper group rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative ${isSelected
        ? 'bg-[#FEF6FF] border-2 border-[#845EC2] ring-2 ring-[#845EC2]/30'
        : 'bg-white border border-[#B0A8B9]/20'
        }`}
    >
      {/* Hover Action Menu */}
      <div className="action-menu absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent rounded-t-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-between">
        <div className="flex gap-2">
          <button
            data-tooltip-id="open-post-tooltip"
            onClick={handleOpen}
            className="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/50 border border-black/10 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Open post"
            title="Open"
          >
            <i className="fa-solid fa-folder-open text-base"></i>
          </button>
          <button
            data-tooltip-id="edit-post-tooltip"
            onClick={handleEdit}
            className="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/50 border border-black/10 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Edit post"
            title="Edit"
          >
            <i className="fa-solid fa-pen-to-square text-base"></i>
          </button>
          <button
            data-tooltip-id="delete-post-tooltip"
            onClick={handleDelete}
            className="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-red-600/50 border border-red-600/10 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Delete post"
            title="Delete"
          >
            <i className="fa-solid fa-trash-can text-base"></i>
          </button>
        </div>
        {
          <ReactTooltip id="open-post-tooltip" place="top" content="Open post" />
        }
        {
          <ReactTooltip id="edit-post-tooltip" place="top" content="Edit post" />
        }
        {
          <ReactTooltip id="delete-post-tooltip" place="top" content="Delete post" />
        }
      </div>

      {/* Post ID Badge & Selected Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
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

