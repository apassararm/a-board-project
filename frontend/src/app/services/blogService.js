import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};


export const searchBlogByTitle = async (title) => {
  const response = await axios.get(`${API_URL}/blogs/search/${title}`);
  return response.data;
};

export const searchBlogByUserAndTitle = async (username, title) => {
  const response = await axios.get(`${API_URL}/blogs/searchbyuser/${username}/${title}`);
  return response.data;
};


export const getBlogsByUser = async (username) => {
  const response = await axios.get(`${API_URL}/blogs/user/${username}`);
  return response.data;
};

export const getBlogsByTag = async (tag) => {
  const response = await axios.get(`${API_URL}/blogs/filter/${tag}`);
  return response.data;
};

export const getBlogsByUserAndTag = async (username, tag) => {
  const response = await axios.get(`${API_URL}/blogs/filterbyuser/${username}/${tag}`);
  return response.data;
};

export const createBlog = async (blog) => {
  const response = await axios.post(`${API_URL}/blogs`, blog);
  return response.data;
};

export const updateBlog = async (id, blog) => {
  const response = await axios.patch(`${API_URL}/blogs/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`);
  return response.data;
};
