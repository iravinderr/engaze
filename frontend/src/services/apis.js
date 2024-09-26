const backend_host = import.meta.env.VITE_BACKEND_HOST;
const api_version = '/api/v1';
const base_url = `${backend_host}${api_version}`;

// AuthN & AuthZ APIs
export const signupAPI = `${base_url}/auth/signup`;
export const loginAPI = `${base_url}/auth/login`;
export const logoutAPI = `${base_url}/auth/logout`;


// USER APIs



// POST APIs