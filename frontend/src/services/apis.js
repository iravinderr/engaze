const backend_host = import.meta.env.VITE_BACKEND_HOST;
const api_version = '/api/v1';
const base_url = `${backend_host}${api_version}`;

// AuthN & AuthZ APIs
export const signupAPI = `${base_url}/auth/signup`;
export const loginAPI = `${base_url}/auth/login`;
export const logoutAPI = `${base_url}/auth/logout`;
export const verifyTokenAPI = `${base_url}/auth/verify-token`;
export const requestNonceAPI = `${base_url}/auth/request-nonce`;
export const verifyWalletSignatureAPI = `${base_url}/auth/verify-wallet-signature`;


// USER APIs
export const getProfileDetailsAPI = `${base_url}/user/get-profile-details`;
export const changeProfilePictureAPI = `${base_url}/user/change-profile-picture`;
export const changeUsernameAPI = `${base_url}/user/change-username`;
export const searchUserAPI = `${base_url}/user/search`;
export const fetchUserDetailsAPI = `${base_url}/user/fetch-user-details`;
export const fetchRandomUserDetailsAPI = `${base_url}/user/fetch-random-user-details`
export const followUserAPI = `${base_url}/user/follow`;
export const unfollowUserAPI = `${base_url}/user/unfollow`;
export const checkIfFollowedAPI = `${base_url}/user/check-if-followed`;
export const checkIfLikedAPI = `${base_url}/user/check-if-liked`;

// POST APIs
export const createPostAPI = `${base_url}/post/create`;
export const deletePostAPI = `${base_url}/post/delete`;
export const likePostAPI = `${base_url}/post/like`;
export const unlikePostAPI = `${base_url}/post/unlike`;
export const getOwnPostsAPI = `${base_url}/post/get-own-posts`;
export const getPostsForHomeAPI = `${base_url}/post/get-posts-for-home`;
export const getPostsForFeedAPI = `${base_url}/post/get-posts-for-feed`;
export const fetchUserPostsAPI = `${base_url}/post/fetch-user-posts`;