import { CONSTANT } from './constant.js';

const { COLORS, FONT_AWESOME_ICONS, TIMEOUT } = CONSTANT;

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const postLists = document.getElementById('postLists');
const postLoading = document.getElementById('postLoading');
const postContent = document.getElementById('postContent');

let toastContainer;

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
  console.log(`searchForm: ${query}`);
  const posts = await searchPosts(query);
  console.log(posts);
  if (Number(posts.total) === 0) {
    createToast('error', 'No posts found');
  }
});
/**
 * 
 * @returns User
 */
const getUserInfo = async (userId) => {
  let url = `https://dummyjson.com/users/${userId}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    const userFullname = `${data.firstName} ${data.lastName}`;
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
  posts.forEach(async (post) => {
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
    console.log(post);

    const postCard = document.createElement('div');
    postCard.innerHTML = `
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
                id="button-read-more"
                class="button-read-more hover:bg-green-600 hover:rounded-md hover:text-green-100 text-sm font-light p-1 border-t border-gray-200 cursor-pointer transition-all duration-300">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Read More</span>
              </button>
              <button type="button"
                class="button-edit-post text-sm font-light p-1 border-t border-gray-200 cursor-not-allowed transition-all duration-300">
                <i class="fa-solid fa-pen"></i>
                <span>Edit</span>
              </button>
              <button type="button"
                class="button-remove-post text-sm font-light p-1 border-t border-gray-200 cursor-not-allowed transition-all duration-300">
                <i class="fa-solid fa-trash-can"></i>
                <span>Remove</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    `;
    postLists.appendChild(postCard);
  });
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


const posts = await getPostListsWithLimit(1);
await renderPostLists(posts);


postLists.addEventListener('click', async (e) => {
  const readMoreButton = e.target.closest('#button-read-more');
  if (!readMoreButton) return;

  postContent.innerHTML = '';

  const postId = readMoreButton.dataset.postId;
  postContent.classList.remove('hidden');
  const postContentData = await getPostContent(postId);
  // console.log('PostContentData:', postContentData);
  // console.log('PostID:', postId);

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
});


postContent.addEventListener('click', (e) => {
  const closeButton = e.target.closest('.fa-xmark');
  if (!closeButton) return;
  postContent.classList.add('hidden');
});