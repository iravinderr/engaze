import axios from "axios";

export const postRequestAxios = async (apiUrl, reqBody, params = {}, token = localStorage.getItem("accessToken"), contentType = "application/json") => {
    return await axios.post(apiUrl, reqBody, {
        withCredentials: true,
        params: params,
        headers: {
            "Content-Type": `${contentType}`,
            Authorization: `Bearer ${token}`
        }
    });
};

export const putRequestAxios = async (apiUrl, reqBody, params = {}, token = localStorage.getItem("accessToken"), contentType = "application/json") => {
    return await axios.put(apiUrl, reqBody, {
        withCredentials: true,
        params: params,
        headers: {
            "Content-Type": `${contentType}`,
            Authorization: `Bearer ${token}`
        }
    });
};

export const getRequestAxios = async (apiUrl, params = {}, token = localStorage.getItem("accessToken")) => {
    return await axios.get(apiUrl, {
        withCredentials: true,
        params: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteRequestAxios = async (apiUrl, params = {}, token = localStorage.getItem("accessToken")) => {
    return await axios.delete(apiUrl, {
        withCredentials: true,
        params: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};