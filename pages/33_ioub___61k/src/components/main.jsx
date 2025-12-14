import React, { useState, useEffect, useCallback } from 'react';
import PostCard from './PostCard';
import Modal from './Modal';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import SortButtons from './SortButtons';
import axiosInstance from '../utils/axios';

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const POSTS_PER_PAGE = 9;

  // Sort state
  const [sortBy, setSortBy] = useState('id-desc'); // Default: Latest first

  // Get user info helper function
  // useCallback: Memoizes this function to maintain the same reference across re-renders
  // Why needed: This function is used as a dependency in transformPosts
  // Without useCallback, getUserInfo would be recreated on every render, causing
  // transformPosts to also recreate, leading to unnecessary API calls and infinite loops
  const getUserInfo = useCallback(async (userId) => {
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
  }, []); // Empty array = function never changes

  // Transform posts helper function
  // useCallback: Prevents this function from being recreated on every render
  // Why needed: Used as dependency in useEffect and handleSearch
  // [getUserInfo] dependency means it only recreates if getUserInfo changes
  const transformPosts = useCallback(async (postsData) => {
    return await Promise.all(postsData.map(async (post) => {
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
          views: post.views || 0
        }
      };
    }));
  }, [getUserInfo]); // Depends on getUserInfo (memoized above)

  // Sort posts function (client-side for search results only)
  const sortPosts = useCallback((postsToSort, sortOption) => {
    const sorted = [...postsToSort];
    const [field, order] = sortOption.split('-');

    sorted.sort((a, b) => {
      let valueA, valueB;

      if (field === 'id') {
        valueA = a.id;
        valueB = b.id;
      } else if (field === 'title') {
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        // For string comparison
        if (order === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }

      // For numeric comparison
      if (order === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

    return sorted;
  }, []);

  // Get API sort parameters from sortBy value
  const getSortParams = useCallback((sortOption) => {
    const [field, order] = sortOption.split('-');
    return { sortBy: field, order };
  }, []);

  // Fetch posts with pagination and server-side sorting
  const fetchPosts = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * POSTS_PER_PAGE;

      // Get sort parameters for API
      const { sortBy: sortField, order } = getSortParams(sortBy);

      // Build API URL with sorting parameters
      // DummyJSON API supports: sortBy and order parameters
      const url = `/posts?limit=${POSTS_PER_PAGE}&skip=${skip}&sortBy=${sortField}&order=${order}`;
      const response = await axiosInstance.get(url);

      const transformedPosts = await transformPosts(response.data.posts);
      setPosts(transformedPosts);
      setTotalPages(Math.ceil(response.data.total / POSTS_PER_PAGE));
      setCurrentPage(page);
      setError(null);

      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [POSTS_PER_PAGE, transformPosts, sortBy, getSortParams]);

  // Fetch posts when sort changes or initial load
  useEffect(() => {
    if (!searchQuery) {
      fetchPosts(currentPage);
    }
  }, [fetchPosts, sortBy, currentPage, searchQuery]);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (searchQuery) {
      // If searching, don't use pagination (search returns all results)
      return;
    }
    fetchPosts(page);
  };

  // Handle sort change - refetch from page 1 with new sort
  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
    // If searching, sort search results client-side
    if (searchQuery) {
      const sortedPosts = sortPosts(posts, newSort);
      setPosts(sortedPosts);
    } else {
      // If browsing, refetch from page 1 with server-side sorting
      setCurrentPage(1);
      // fetchPosts will be called by useEffect when sortBy changes
    }
  }, [posts, sortPosts, searchQuery]);

  // Handle search with debounce
  // useCallback: Prevents SearchBar from re-rendering unnecessarily
  // Why needed: Passed as prop to SearchBar component (line 180)
  // Without it, SearchBar would see a "new" function on every render
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // If search is empty, reload initial posts with pagination
      fetchPosts(1);
      return;
    }

    // Search posts (no pagination for search results)
    try {
      setSearchLoading(true);
      setPosts([]); // Clear previous results immediately before searching

      const response = await axiosInstance.get(`/posts/search?q=${encodeURIComponent(query)}`);

      if (response.data.posts.length === 0) {
        setPosts([]);
        setTotalPages(0);
        setError(null);
      } else {
        const transformedPosts = await transformPosts(response.data.posts);
        const sortedPosts = sortPosts(transformedPosts, sortBy);
        setPosts(sortedPosts);
        setTotalPages(0); // No pagination for search results
        setError(null);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
      setError('Failed to search posts. Please try again later.');
      setPosts([]); // Clear posts on error too
    } finally {
      setSearchLoading(false);
    }
  }, [transformPosts, fetchPosts, sortBy, sortPosts]); // Depends on transformPosts and fetchPosts (memoized above)

  return (
    <div className="min-h-screen bg-[#FEF6FF] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4B4453] mb-3 drop-shadow-sm">
            Blog Posts
          </h1>
          <p className="text-[#845EC2] text-lg font-medium">
            Explore interesting articles about history, crime, and more
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={searchLoading} />

        {/* Sort Buttons */}
        <div className="flex justify-center mb-6">
          <SortButtons onSortChange={handleSortChange} currentSort={sortBy} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-6xl text-[#845EC2]"></i>
          </div>
        ) : posts.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-4 text-center">
              <p className="text-[#B0A8B9]">
                {searchQuery ? (
                  <>
                    <span className="font-semibold text-[#4B4453]">{posts.length}</span> {posts.length === 1 ? 'post' : 'posts'} found
                    {' '}for <span className="font-semibold text-[#845EC2]">"{searchQuery}"</span>
                  </>
                ) : (
                  <>
                    Showing <span className="font-semibold text-[#4B4453]">{posts.length}</span> of{' '}
                    <span className="font-semibold text-[#4B4453]">{totalPages}</span> pages
                  </>
                )}
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenModal={handleOpenModal}
                  isSelected={selectedPost?.id === post.id}
                />
              ))}
            </div>

            {/* Pagination - Only show when not searching */}
            {!searchQuery && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <i className="fa-regular fa-folder-open text-6xl text-[#B0A8B9] mb-4"></i>
            <h3 className="text-2xl font-semibold text-[#4B4453] mb-2">No posts found</h3>
            <p className="text-[#B0A8B9]">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No posts available at the moment.'
              }
            </p>
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
