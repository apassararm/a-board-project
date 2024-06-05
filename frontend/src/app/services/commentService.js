import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllComments = async () => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};

export const getCommentByBlogId = async (blogId) => {
  const response = await axios.get(`${API_URL}/comments/blog/${blogId}`);
  return response.data;
};

export const getCommentById = async (id) => {
  const response = await axios.get(`${API_URL}/comments/${id}`);
  return response.data;
};

export const createComment = async (comment) => {
  const response = await axios.post(`${API_URL}/comments`, comment);
  return response.data;
};

export const updateComment = async (id, comment) => {
  const response = await axios.patch(`${API_URL}/comments/${id}`, comment);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${API_URL}/comments/${id}`);
  return response.data;
};
