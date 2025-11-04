const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const postLists = document.getElementById('postLists');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;
  query.length > 0 ? searchButton.classList.remove('hidden') : searchButton.classList.add('hidden');
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target.query.value;
  console.log(`searchForm: ${query}`);
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
  let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw new Error(error);
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
    if (postReactions.length > 0) {
      postReactionLikeCount = postReactions[0];
      postReactionDislikeCount = postReactions[1];
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
              <button type="button"
                data-post-id="${postId}"
                class="button-read-more-post hover:bg-green-600 hover:rounded-md hover:text-green-100 text-sm font-light p-1 border-t border-gray-200 cursor-pointer transition-all duration-300">
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


const posts = await getPostListsWithLimit(10);
await renderPostLists(posts);
