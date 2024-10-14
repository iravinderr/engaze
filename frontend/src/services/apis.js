const backend_host = import.meta.env.VITE_BACKEND_HOST;
const api_version = '/api/v1';
const base_url = `${backend_host}${api_version}`;

// AuthN & AuthZ APIs
export const signupAPI = `${base_url}/auth/signup`;
export const loginAPI = `${base_url}/auth/login`;
export const logoutAPI = `${base_url}/auth/logout`;
export const verifyTokenAPI = `${base_url}/auth/verify-token`;


// USER APIs
export const searchUserAPI = `${base_url}/user/search`;
export const getProfileDetailsAPI = `${base_url}/user/get-profile-details`;
export const updateProfileDetailsAPI = `${base_url}/user/update-profile-details`;
export const changeUsernameAPI = `${base_url}/user/change-username`;


// POST APIs
export const createPostAPI = `${base_url}/post/create`;
export const deletePostAPI = `${base_url}/post/delete`;
export const getOwnPostsAPI = `${base_url}/post/get-own-posts`;
export const getPostsForHomeAPI = `${base_url}/post/get-posts-for-home`;