import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

export default function Modal({ isOpen, onClose, post }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showAuthorPanel, setShowAuthorPanel] = useState(false);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  // Reset author panel when post changes or modal closes
  useEffect(() => {
    if (!isOpen) {
      // Reset everything when modal closes
      setShowAuthorPanel(false);
      setAuthorDetails(null);
      setComments([]);
    }
  }, [isOpen]);

  // Reset author panel when post changes
  useEffect(() => {
    setShowAuthorPanel(false);
    setAuthorDetails(null);
  }, [post?.id]);

  // Fetch comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      if (isOpen && post) {
        try {
          setLoadingComments(true);
          const response = await axiosInstance.get(`/comments/post/${post.id}`);
          const commentsWithUserInfo = await Promise.all(response.data.comments.map(async (comment) => {
            const userInfo = await getCommentUserInfo(comment.user.id);
            console.log(userInfo);
            return {
              ...comment,
              user: {
                fullName: userInfo?.firstName + ' ' + userInfo?.lastName,
                username: userInfo?.username,
                avatar: userInfo?.image,
              }
            };
          }));
          setComments(commentsWithUserInfo);
        } catch (error) {
          console.error('Error fetching comments:', error);
          setComments([]);
        } finally {
          setLoadingComments(false);
        }
      }
    };

    fetchComments();
  }, [isOpen, post]);

  const getCommentUserInfo = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comment user info:', error);
      return null;
    }
  }

  // Toggle author details panel
  const toggleAuthorPanel = async () => {
    if (!post) return;

    // If panel is open, just close it
    if (showAuthorPanel) {
      setShowAuthorPanel(false);
      return;
    }

    // If panel is closed, fetch data and open it
    if (!authorDetails || authorDetails.id !== post.author.userId) {
      try {
        setLoadingAuthor(true);
        const response = await axiosInstance.get(`/users/${post.author.userId}`);
        setAuthorDetails(response.data);
        setShowAuthorPanel(true);
      } catch (error) {
        console.error('Error fetching author details:', error);
      } finally {
        setLoadingAuthor(false);
      }
    } else {
      // Data already fetched, just show the panel
      setShowAuthorPanel(true);
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showAuthorPanel) {
          setShowAuthorPanel(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, showAuthorPanel]);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with 80% opacity black background */}
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-white rounded-lg shadow-2xl w-full max-h-[90vh] overflow-hidden z-10 transition-all duration-300 ${showAuthorPanel ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <div className="flex h-full max-h-[90vh]">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#B0A8B9] hover:text-[#4B4453] transition-colors z-20"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>

            {/* Modal Body */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-[#4B4453] mb-4 pr-8">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#00896F] text-white text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Info - Clickable */}
              <div
                onClick={toggleAuthorPanel}
                className="flex items-center mb-6 pb-6 border-b border-[#B0A8B9]/30 cursor-pointer hover:bg-[#FEF6FF] p-4 -mx-4 transition-colors group"
              >
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.fullName}
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-[#B0A8B9] group-hover:border-[#845EC2] transition-colors"
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#845EC2] rounded-full flex items-center justify-center text-white font-semibold text-xl mr-4">
                    {post.author.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-[#4B4453] font-semibold text-lg group-hover:text-[#845EC2] transition-colors">
                    {post.author.fullName}
                  </p>
                  <p className="text-sm text-[#B0A8B9] mb-1">
                    @{post.author.username}
                  </p>
                </div>
                <i className={`fa-solid ${showAuthorPanel ? 'fa-circle-chevron-left' : 'fa-circle-chevron-right'} text-[#B0A8B9] group-hover:text-[#845EC2] transition-all duration-300`}></i>
              </div>

              {/* Post Content */}
              <div className="prose max-w-none mb-6">
                <p className="text-[#4B4453] leading-relaxed whitespace-pre-line">
                  {post.description}
                </p>
              </div>

              {/* Reactions */}
              <div className="flex items-center gap-6 pt-6 border-t border-[#B0A8B9]/30 mb-8">
                <button className="flex items-center gap-2 text-[#B0A8B9] hover:text-[#845EC2] transition-colors">
                  <i className="fa-regular fa-heart text-xl"></i>
                  <span className="font-medium">{post.reactions.likes} Likes</span>
                </button>
                <button className="flex items-center gap-2 text-[#B0A8B9] hover:text-[#845EC2] transition-colors">
                  <i className="fa-regular fa-thumbs-down text-xl"></i>
                  <span className="font-medium">{post.reactions.dislikes} Dislikes</span>
                </button>
                <div className="flex items-center gap-2 text-[#B0A8B9]">
                  <i className="fa-regular fa-eye text-xl"></i>
                  <span className="font-medium">{post.reactions.views} Views</span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-[#B0A8B9]/30 pt-6">
                <h2 className="text-2xl font-bold text-[#4B4453] mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-comments text-[#845EC2]"></i>
                  Comments {comments.length > 0 && `(${comments.length})`}
                </h2>

                {loadingComments ? (
                  <div className="flex justify-center py-8">
                    <i className="fa-solid fa-spinner fa-spin text-4xl text-[#845EC2]"></i>
                  </div>
                ) : comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[#FEF6FF] rounded-lg p-4 hover:bg-white border border-[#B0A8B9]/20 transition-colors"
                      >
                        {/* Comment Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {comment.user.avatar ? (
                              <img
                                src={comment.user.avatar}
                                alt={comment.user.fullName}
                                className="w-10 h-10 rounded-full object-cover border-2 border-[#B0A8B9]"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-[#845EC2] rounded-full flex items-center justify-center text-white font-semibold">
                                {comment.user.fullName.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-[#4B4453]">
                                {comment.user.fullName}
                              </p>
                              <p className="text-xs text-[#B0A8B9]">
                                @{comment.user.username}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[#845EC2]">
                            <i className="fa-solid fa-heart text-sm"></i>
                            <span className="text-sm font-medium">{comment.likes}</span>
                          </div>
                        </div>

                        {/* Comment Body */}
                        <p className="text-[#4B4453] leading-relaxed pl-13">
                          {comment.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i className="fa-regular fa-comment-dots text-4xl text-[#B0A8B9] mb-2"></i>
                    <p className="text-[#B0A8B9]">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Author Details Panel - Slide in from right */}
          <div
            className={`w-96 bg-[#FEF6FF] border-l border-[#B0A8B9] overflow-y-auto transition-all duration-300 ease-in-out ${showAuthorPanel ? 'translate-x-0' : 'translate-x-full'
              }`}
            style={{ position: showAuthorPanel ? 'relative' : 'absolute', right: 0 }}
          >
            {loadingAuthor ? (
              <div className="flex justify-center items-center h-full">
                <i className="fa-solid fa-spinner fa-spin text-5xl text-[#845EC2]"></i>
              </div>
            ) : authorDetails ? (
              <div className="p-6">
                {/* Author Header */}
                <div className="text-center mb-6">
                  {authorDetails.image ? (
                    <img
                      src={authorDetails.image}
                      alt={`${authorDetails.firstName} ${authorDetails.lastName}`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-[#845EC2] rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                      {authorDetails.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-[#4B4453]">
                    {authorDetails.firstName} {authorDetails.lastName}
                  </h2>
                  <p className="text-[#845EC2] font-medium">@{authorDetails.username}</p>
                </div>

                {/* Author Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-[#B0A8B9]/20">
                    <i className="fa-solid fa-file-lines text-xl mb-1 text-[#845EC2]"></i>
                    <p className="text-xs text-[#B0A8B9]">Posts</p>
                    <p className="text-lg font-bold text-[#4B4453]">{Math.floor(Math.random() * 50) + 10}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-[#B0A8B9]/20">
                    <i className="fa-solid fa-users text-xl mb-1 text-[#00896F]"></i>
                    <p className="text-xs text-[#B0A8B9]">Followers</p>
                    <p className="text-lg font-bold text-[#4B4453]">{Math.floor(Math.random() * 1000) + 100}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-[#B0A8B9]/20">
                    <i className="fa-solid fa-heart text-xl mb-1 text-[#845EC2]"></i>
                    <p className="text-xs text-[#B0A8B9]">Likes</p>
                    <p className="text-lg font-bold text-[#4B4453]">{Math.floor(Math.random() * 5000) + 500}</p>
                  </div>
                </div>

                {/* Author Details */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B0A8B9]/20">
                    <h3 className="font-semibold text-[#4B4453] mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-circle-info text-[#845EC2]"></i>
                      Personal Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-envelope text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">{authorDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-phone text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">{authorDetails.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">Age: {authorDetails.age}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-venus-mars text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453] capitalize">{authorDetails.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B0A8B9]/20">
                    <h3 className="font-semibold text-[#4B4453] mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-[#00896F]"></i>
                      Location
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#4B4453]">{authorDetails.address?.address}</p>
                      <p className="text-[#4B4453]">{authorDetails.address?.city}, {authorDetails.address?.state}</p>
                      <p className="text-[#4B4453]">{authorDetails.address?.country}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B0A8B9]/20">
                    <h3 className="font-semibold text-[#4B4453] mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-briefcase text-[#845EC2]"></i>
                      Professional
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-building text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">{authorDetails.company?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-user-tie text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">{authorDetails.company?.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-building-columns text-[#B0A8B9] w-5"></i>
                        <span className="text-[#4B4453]">{authorDetails.company?.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B0A8B9]/20">
                    <h3 className="font-semibold text-[#4B4453] mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-graduation-cap text-[#00896F]"></i>
                      Education
                    </h3>
                    <p className="text-sm text-[#4B4453]">{authorDetails.university}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

