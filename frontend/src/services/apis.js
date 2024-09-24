const backend_host = import.meta.env.VITE_BACKEND_HOST;
const api_version = '/api/v1';
const base_url = `${backend_host}${api_version}`;

// USER APIs
export const signupAPI = `${base_url}/user/signup`;
export const loginAPI = `${base_url}/user/login`;
export const logoutAPI = `${base_url}/user/logout`;


// POST APIs