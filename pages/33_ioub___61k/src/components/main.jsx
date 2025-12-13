import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Modal from './Modal';
import axiosInstance from '../utils/axios';

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/posts?limit=10&skip=0');

        const transformedPosts = await Promise.all(response.data.posts.map(async (post) => {
          const userInfo = await getUserInfo(post.userId);

          return {
            id: post.id,
            title: post.title,
            description: post.body,
            tags: post.tags || ['general'],
            author: {
              fullName: userInfo?.fullName || `User ${post.userId}`,
              userId: post.userId,
              username: userInfo?.username || null,
              avatar: userInfo?.avatar || null,
              email: userInfo?.email || null,
            },
            reactions: {
              likes: post.reactions?.likes || 0,
              dislikes: post.reactions?.dislikes || 0,
              views: post.views || Math.floor(Math.random() * 1000) + 100
            }
          };
        }));
        setPosts(transformedPosts);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const getUserInfo = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return {
        fullName: `${response.data.firstName} ${response.data.lastName}`,
        avatar: response.data.image,
        email: response.data.email,
        id: response.data.id,
        username: response.data.username,
      };
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Blog Posts
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
}
