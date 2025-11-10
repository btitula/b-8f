import { CONSTANT } from './constant.js';

const { COLORS, FONT_AWESOME_ICONS, TIMEOUT } = CONSTANT;

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortPostsByIdButton = document.getElementById('button-sort-posts-by-id');
const sortIcon = document.getElementById('sortIcon');
const postLists = document.getElementById('postLists');
const postLoading = document.getElementById('postLoading');
const postContent = document.getElementById('postContent');
const postPagination = document.getElementById('postPagination');
const pageNumbers = document.getElementById('pageNumbers');
const buttonPreviousPage = document.getElementById('button-previous-page');
const buttonNextPage = document.getElementById('button-next-page');

let toastContainer;
let sortAsc = true;
let userCache = {}; // Avoid calling API again when sorting posts, use `userCache` to store user info

/**
 * Utils
 */
// https://www.youtube.com/watch?v=EWveKYaX-P0&t=607s
const generateToast = ({ message, backgroundColor, color = COLORS.TEXT_COLOR, lifetime = `${TIMEOUT.THREE_SECONDS}ms` }) => {
  toastContainer.insertAdjacentHTML('beforeend', `
    <p class="toast" style="background-color: ${backgroundColor}; color: ${color}; animation-duration: ${lifetime};">
      ${message}
    </p>
  `);

  const toast = toastContainer.lastElementChild;
  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
}

const createToast = (type, message) => {
  const toastConfig = {
    success: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_CHECK,
      backgroundColor: COLORS.GREEN
    },
    error: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION,
      backgroundColor: COLORS.RED
    },
    info: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_INFO,
      backgroundColor: COLORS.GRAY
    },
    warning: {
      icon: FONT_AWESOME_ICONS.FA_CIRCLE_EXCLAMATION,
      backgroundColor: COLORS.YELLOW
    }
  };

  const config = toastConfig[type]

  generateToast({
    message: `<i class="fa-solid ${config.icon}"></i><span>${message}</span>`,
    backgroundColor: config.backgroundColor,
    lifetime: `${TIMEOUT.THREE_SECONDS}ms`
  });
};

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;
  query.length > 0 ? searchButton.classList.remove('hidden') : searchButton.classList.add('hidden');
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.query.value;
  // console.log(`searchForm: ${query}`);
  const foundPosts = await searchPosts(query);
  console.log(foundPosts);
  if (Number(foundPosts.total) === 0) {
    createToast('error', 'No posts found');
  } else {
    createToast('success', `${foundPosts.total} posts found`);
    posts = foundPosts.posts; // Update posts variable so sort works correctly
    // Apply current sort order to search results
    const sortedPosts = sortPostsById(posts, sortAsc);
    await renderPostLists(sortedPosts);
  }
});

/**
 *
 * @returns User
 */
const getUserInfo = async (userId) => {
  if (userCache[userId]) {
    return userCache[userId];
  }

  let url = `https://dummyjson.com/users/${userId}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    const userFullname = `${data.firstName} ${data.lastName}`;

    userCache[userId] = userFullname; // Avoid calling API again when sorting posts, use `userCache` to store user info
    return userFullname;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 
 * @returns Total Posts Count
 */
const getTotalPostsCount = async () => {
  let url = 'https://dummyjson.com/posts'
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.total;
  } catch (error) {
    throw new Error(error);
  }
}

const getPostListsWithLimit = async (limit, skip = 0) => {
  postLoading.classList.remove('hidden');
  let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw new Error(error);
  } finally {
    postLoading.classList.add('hidden');
  }
}

const renderPostLists = async (posts) => {
  postLists.innerHTML = '';
  for (const post of posts) {
    let postReactionLikeCount = 0;
    let postReactionDislikeCount = 0;

    const postId = post.id;
    const postTitle = post.title;
    const postBody = post.body;
    const postTags = post.tags;
    const postReactions = post.reactions;
    if (Object.keys(postReactions).length > 0) {
      postReactionLikeCount = postReactions.likes;
      postReactionDislikeCount = postReactions.dislikes;
    }
    const postUserId = post.userId;
    const postUserFullName = await getUserInfo(postUserId);
    const postViewsCount = post.views;
    // console.log(post);

    postLists.insertAdjacentHTML('beforeend', `
      <div class="post-card min-h-[300px] border border-gray-200 rounded-md p-4 hover:shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] transition-all duration-300 relative">
        <ul class="post-tags flex gap-1 absolute top-1 right-1">
          ${postTags.map(tag => `
            <li class="bg-gray-200 text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100">
              ${tag}
            </li>
          `).join('')}
        </ul>
        <div class="post-content">
          <ul class="flex flex-col gap-2">
            <li class="min-h-[60px] text-base font-semibold w-full border-b border-gray-200 pb-2">${postTitle}</li>
            <li class="text-base text-gray-500 text-left font-normal line-clamp-5">
              ${postBody}
            </li>
            <li class="flex justify-between">
              <ul class="post-author flex gap-1">
                <li
                  class="text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <i class="fa-solid fa-user"></i>
                  <span>${postUserFullName}</span>
                </li>
              </ul>
              <ul class="post-reactions flex gap-1">
                <li class="text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <i class="fa-solid fa-hashtag"></i>
                  <span>${postId}</span>
                </li>
                <li class="text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100 ">
                  <i class="fa-solid fa-eye"></i>
                  <span>${postViewsCount}</span>
                </li>
                <li
                  class="text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <i class="fa-solid fa-thumbs-up"></i>
                  <span>${postReactionLikeCount}</span>
                </li>
                <li
                  class="text-gray-500 p-[4px] rounded-md text-[8px] font-extralight border border-gray-100 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                  <i class="fa-solid fa-thumbs-down"></i>
                  <span>${postReactionDislikeCount}</span>
                </li>
              </ul>
            </li>
            <li class="mt-4 flex justify-between">
              <button
                type="button"
                data-post-id="${postId}"
                class="button-read-more hover:bg-green-600 hover:rounded-md hover:text-green-100 text-sm font-light p-1 border-t border-gray-200 cursor-pointer transition-all duration-300">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Read More</span>
              </button>
              <button
                type="button"
                data-post-id="${postId}"
                class="button-edit-post text-sm font-light p-1 border-t border-gray-200 cursor-pointer transition-all duration-300">
                <i class="fa-solid fa-pen"></i>
                <span>Edit</span>
              </button>
              <button
                type="button"
                data-post-id="${postId}"
                class="button-remove-post text-sm font-light p-1 border-t border-gray-200 cursor-pointer transition-all duration-300">
                <i class="fa-solid fa-trash-can"></i>
                <span>Remove</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    `);
  }
}

const getPostContent = async (postId) => {
  let url = `https://dummyjson.com/posts/${postId}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const searchPosts = async (searchTerm) => {
  let url = `https://dummyjson.com/posts/search?q=${searchTerm}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}


const sortPostsById = (posts, sortAsc) => {
  if (sortAsc) {
    posts.sort((a, b) => a.id - b.id);
  } else {
    posts.sort((a, b) => b.id - a.id);
  }
  return posts;
}


const renderPageNumbers = async (activePageNumber = 1) => {
  postPagination.classList.add('hidden');
  const totalPostsCount = await getTotalPostsCount();
  const postsPerPage = 10
  const pagesNumberCount = Math.ceil(totalPostsCount / postsPerPage);

  let content = '';
  for (let i = 1; i <= pagesNumberCount; i++) {
    if (i === Number(activePageNumber)) {
      content += `<span data-page-number="${i}" class="page-number active cursor-pointer">${i}</span>`;
    } else {
      content += `<span data-page-number="${i}" class="page-number cursor-pointer transition-all duration-300 hover:text-green-800">${i}</span>`;
    }
  }
  pageNumbers.innerHTML = content;
  postPagination.classList.remove('hidden');
}
/**
 * Init Toast
 */
(function initToast() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="toast-container">
    </div>
  `);
  toastContainer = document.querySelector('.toast-container');
})();


let posts = await getPostListsWithLimit(10);
await renderPostLists(posts);
await renderPageNumbers();

sortPostsByIdButton.addEventListener('click', async () => {
  sortAsc = !sortAsc; // toggle
  if (sortAsc) {
    sortIcon.classList.remove('fa-arrow-up-wide-short');
    sortIcon.classList.add('fa-arrow-down-wide-short');
  } else {
    sortIcon.classList.remove('fa-arrow-down-wide-short');
    sortIcon.classList.add('fa-arrow-up-wide-short');
  }
  console.log(sortAsc);
  const sortedPosts = sortPostsById(posts, sortAsc);
  await renderPostLists(sortedPosts);
});


postLists.addEventListener('click', async (e) => {
  // Handle Read More button
  const readMoreButton = e.target.closest('.button-read-more');
  if (readMoreButton) {
    postContent.innerHTML = '';

    const postId = readMoreButton.dataset.postId;
    postContent.classList.remove('hidden');
    const postContentData = await getPostContent(postId);

    let postReactionLikeCount = 0;
    let postReactionDislikeCount = 0;

    const postTitle = postContentData.title;
    const postBody = postContentData.body;
    const postTags = postContentData.tags;
    const postReactions = postContentData.reactions;
    const postUserId = postContentData.userId;
    const postUserFullName = await getUserInfo(postUserId);
    const postViewsCount = postContentData.views;
    if (Object.keys(postReactions).length > 0) {
      postReactionLikeCount = postReactions.likes;
      postReactionDislikeCount = postReactions.dislikes;
    }

    postContent.innerHTML = `
        <div class="absolute inset-0 bg-black/80 opacity-80 backdrop-blur-xl" data-close></div>

        <div id="postContentInformation" class="post-content-information mx-auto h-full grid place-items-center ">
          <div
            class="w-[min(90vw,900px)] max-h-[85vh] overflow-auto bg-white rounded-md shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] relative">

            <div class="title bg-green-600 text-green-100 p-2 flex justify-between items-center">
              <h2 class="post-title text-xl font-semibold">${postTitle}</h2>
              <button
                class="w-8 h-8 rounded-full bg-green-100 text-green-600 border-1 border-green-600 flex items-center justify-center hover:bg-green-600 hover:text-green-100 hover:border-green-100 cursor-pointer transition-all duration-300"
                type="button" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="post-content p-8 flex flex-col gap-4">
              <ul class="flex flex-col gap-4">
                <li class="flex justify-between">
                  <ul class="post-author flex gap-1">
                    <li
                      class="text-green-600 p-[4px] rounded-md text-sm font-normal border border-green-600 hover:bg-green-600 hover:text-green-100 cursor-pointer transition-all duration-300">
                      <i class="fa-solid fa-user"></i>
                      <span>${postUserFullName}</span>
                    </li>
                  </ul>
                  <ul class="post-reactions flex gap-1">
                    <li class="text-gray-600 p-[4px] rounded-md text-sm font-normal border border-gray-600 ">
                      <i class="fa-solid fa-eye"></i>
                      <span>${postViewsCount}</span>
                    </li>
                    <li
                      class="text-blue-500 p-[4px] rounded-md text-sm font-normal border border-blue-600 hover:bg-blue-600 hover:text-blue-100 cursor-pointer transition-all duration-300">
                      <i class="fa-solid fa-thumbs-up"></i>
                      <span>${postReactionLikeCount}</span>
                    </li>
                    <li
                      class="text-red-500 p-[4px] rounded-md text-sm font-normal border border-red-600 hover:bg-red-600 hover:text-red-100 cursor-pointer transition-all duration-300">
                      <i class="fa-solid fa-thumbs-down"></i>
                      <span>${postReactionDislikeCount}</span>
                    </li>
                  </ul>
                </li>

                <li class="text-base text-gray-500 text-left font-normal">
                  ${postBody}
                </li>
              </ul>
              <div class="post-related text-xl font-semibold mb-2 border-t border-gray-200 pt-2 flex items-center gap-1">
                <span>
                  <i class="fa-solid fa-tags text-gray-500 "></i>
                </span>
                <ul class="post-tags flex gap-1">
                    ${postTags.map(tag => `
                      <li class="text-gray-600 p-[4px] text-sm font-normal border-b-1 border-gray-600 cursor-pointer hover:text-gray-500">
                        ${tag}
                      </li>
                    `).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
    `;
    return;
  }

  // Handle Edit button
  const editButton = e.target.closest('.button-edit-post');
  if (editButton) {
    postContent.innerHTML = '';

    const postId = editButton.dataset.postId;
    postContent.classList.remove('hidden');
    const postContentData = await getPostContent(postId);

    let postReactionLikeCount = 0;
    let postReactionDislikeCount = 0;

    const postTitle = postContentData.title;
    const postBody = postContentData.body;
    const postTags = postContentData.tags;
    const postReactions = postContentData.reactions;
    const postUserId = postContentData.userId;
    const postUserFullName = await getUserInfo(postUserId);
    const postViewsCount = postContentData.views;
    if (Object.keys(postReactions).length > 0) {
      postReactionLikeCount = postReactions.likes;
      postReactionDislikeCount = postReactions.dislikes;
    }

    postContent.innerHTML = `
        <div class="absolute inset-0 bg-black/80 opacity-80 backdrop-blur-xl" data-close></div>

        <div id="postContentInformation" class="post-content-information mx-auto h-full grid place-items-center ">
          <div
            class="w-[min(90vw,900px)] max-h-[85vh] overflow-auto bg-white rounded-md shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] relative">

            <div class="title bg-blue-600 text-blue-100 p-2 flex justify-between items-center">
              <h2 class="post-title text-xl font-semibold">Edit Post</h2>
              <button
                class="button-close-modal w-8 h-8 rounded-full bg-blue-100 text-blue-600 border-1 border-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-blue-100 hover:border-blue-100 cursor-pointer transition-all duration-300"
                type="button" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="post-content p-8 flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="editTitle" class="text-sm font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  id="editTitle"
                  value="${postTitle.replace(/"/g, '&quot;')}"
                  class="border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label for="editBody" class="text-sm font-semibold text-gray-700">Body</label>
                <textarea
                  id="editBody"
                  rows="8"
                  class="border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >${postBody}</textarea>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex justify-between">
                  <ul class="post-author flex gap-1">
                    <li
                      class="text-blue-600 p-[4px] rounded-md text-sm font-normal border border-blue-600">
                      <i class="fa-solid fa-user"></i>
                      <span>${postUserFullName}</span>
                    </li>
                  </ul>
                  <ul class="post-reactions flex gap-1">
                    <li class="text-gray-600 p-[4px] rounded-md text-sm font-normal border border-gray-600 ">
                      <i class="fa-solid fa-eye"></i>
                      <span>${postViewsCount}</span>
                    </li>
                    <li class="text-blue-500 p-[4px] rounded-md text-sm font-normal border border-blue-600">
                      <i class="fa-solid fa-thumbs-up"></i>
                      <span>${postReactionLikeCount}</span>
                    </li>
                    <li class="text-red-500 p-[4px] rounded-md text-sm font-normal border border-red-600">
                      <i class="fa-solid fa-thumbs-down"></i>
                      <span>${postReactionDislikeCount}</span>
                    </li>
                  </ul>
                </li>
              </ul>

              <div class="post-related text-xl font-semibold mb-2 border-t border-gray-200 pt-2 flex items-center gap-1">
                <span>
                  <i class="fa-solid fa-tags text-gray-500 "></i>
                </span>
                <ul class="post-tags flex gap-1">
                    ${postTags.map(tag => `
                      <li class="text-gray-600 p-[4px] text-sm font-normal border-b-1 border-gray-600">
                        ${tag}
                      </li>
                    `).join('')}
                </ul>
              </div>

              <div class="flex gap-2 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  class="button-cancel-edit px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300">
                  Cancel
                </button>
                <button
                  type="button"
                  data-post-id="${postId}"
                  class="button-save-edit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300">
                  <i class="fa-solid fa-save"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
    return;
  }

  // Handle Remove button
  const removeButton = e.target.closest('.button-remove-post');
  if (removeButton) {
    const postId = removeButton.dataset.postId;

    const confirmed = confirm('Delete this post?');
    if (!confirmed) return;

    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Deleted post:', data);

      createToast('success', 'Post deleted successfully!');

      posts = posts.filter(p => p.id !== Number(postId));
      await renderPostLists(posts);
    } catch (error) {
      console.error('Error deleting post:', error);
      createToast('error', 'Failed to delete post');
    }
    return;
  }
});


postContent.addEventListener('click', async (e) => {
  // Handle close button
  const closeButton = e.target.closest('.fa-xmark');
  if (closeButton) {
    postContent.classList.add('hidden');
    return;
  }

  // Handle cancel edit button
  const cancelButton = e.target.closest('.button-cancel-edit');
  if (cancelButton) {
    postContent.classList.add('hidden');
    return;
  }

  // Handle save edit button
  const saveButton = e.target.closest('.button-save-edit');
  if (saveButton) {
    const postId = saveButton.dataset.postId;
    const newTitle = document.getElementById('editTitle').value.trim();
    const newBody = document.getElementById('editBody').value.trim();

    if (!newTitle || !newBody) {
      createToast('error', 'Title and body cannot be empty');
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          body: newBody
        })
      });
      const data = await response.json();
      console.log('Updated post:', data);

      createToast('success', 'Post updated successfully!');

      // Update the post in the current list
      const postIndex = posts.findIndex(p => p.id === Number(postId));
      if (postIndex !== -1) {
        posts[postIndex].title = newTitle;
        posts[postIndex].body = newBody;
        await renderPostLists(posts);
      }

      // Close the modal
      postContent.classList.add('hidden');
    } catch (error) {
      console.error('Error updating post:', error);
      createToast('error', 'Failed to update post');
    }
    return;
  }
});

pageNumbers.addEventListener('click', (e) => {
  const pageNumber = e.target.closest('.page-number');
  if (!pageNumber) return;
  const pageNumberValue = pageNumber.dataset.pageNumber;
  console.log(pageNumberValue);

  (async () => {
    const posts = await getPostListsWithLimit(10, (pageNumberValue - 1) * 10);
    await renderPostLists(posts);
    await renderPageNumbers(pageNumberValue);
  })();
});

buttonPreviousPage.addEventListener('click', async () => {
  const activePageNumber = Number(pageNumbers.querySelector('.page-number.active').dataset.pageNumber);
  console.log(activePageNumber);
  if (activePageNumber > 1) {
    const posts = await getPostListsWithLimit(10, (activePageNumber - 1) * 10);
    await renderPostLists(posts);
    await renderPageNumbers(activePageNumber - 1);
  }
});

buttonNextPage.addEventListener('click', async () => {
  const activePageNumber = Number(pageNumbers.querySelector('.page-number.active').dataset.pageNumber);
  console.log(activePageNumber);
  const totalPostsCount = await getTotalPostsCount();
  const maxPages = Math.ceil(totalPostsCount / 10);
  if (activePageNumber < maxPages) {
    const posts = await getPostListsWithLimit(10, activePageNumber * 10);
    await renderPostLists(posts);
    await renderPageNumbers(activePageNumber + 1);
  }
});
