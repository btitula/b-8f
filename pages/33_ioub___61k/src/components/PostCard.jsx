import React from 'react';

export default function PostCard({ post, onOpenModal }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="mb-4">
        <h2
          className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600"
          onClick={() => onOpenModal(post)}
        >
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3">{post.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author and Reactions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.fullName}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
              {post.author.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm text-gray-700 font-medium">{post.author.fullName}</span>
        </div>

        {/* Reaction Icons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
            <i className="fa-regular fa-heart"></i>
            <span className="text-sm">{post.reactions.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
            <i className="fa-regular fa-thumbs-down"></i>
            <span className="text-sm">{post.reactions.dislikes}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-600">
            <i className="fa-regular fa-eye"></i>
            <span className="text-sm">{post.reactions.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

