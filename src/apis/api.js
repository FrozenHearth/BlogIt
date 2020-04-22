import axiosConfig from '../config/axiosConfig';

export const login = payload => {
  return axiosConfig({
    url: `/auth/login/`,
    method: 'POST',
    data: payload
  });
};

export const getBlogList = () => {
  return axiosConfig({
    url: `/blogapp/blogs`,
    method: 'GET'
  });
};

export const getNextBlogList = offset => {
  return axiosConfig({
    url: `/blogapp/blogs?limit=6&offset=${offset}`,
    method: 'GET'
  });
};

export const getMyPublishedBlogs = () => {
  return axiosConfig({
    url: `/blogapp/my-published`,
    method: 'GET'
  });
};

export const getNextPublishedBlogsList = offset => {
  return axiosConfig({
    url: `/blogapp/my-published?limit=6&offset=${offset}`,
    method: 'GET'
  });
};

export const getMyDrafts = () => {
  return axiosConfig({
    url: `/blogapp/my-drafts`,
    method: 'GET'
  });
};

export const getNextDraftsList = offset => {
  return axiosConfig({
    url: `/blogapp/my-drafts?limit=6&offset=${offset}`,
    method: 'GET'
  });
};

export const getBlogDetails = id => {
  return axiosConfig({
    url: `/blogapp/blogs/${id}`,
    method: 'GET'
  });
};

export const createBlog = payload => {
  return axiosConfig({
    url: `/blogapp/blogs`,
    method: 'POST',
    data: payload
  });
};

export const updateBlog = (id, payload) => {
  return axiosConfig({
    url: `/blogapp/blogs/${id}`,
    method: 'PUT',
    data: payload
  });
};

export const deleteBlog = id => {
  return axiosConfig({
    url: `/blogapp/blogs/${id}`,
    method: 'DELETE'
  });
};

export const imageUpload = payload => {
  return axiosConfig({
    url: `/blogapp/picture`,
    method: 'POST',
    data: payload
  });
};

export const addTags = payload => {
  return axiosConfig({
    url: `/blogapp/tags`,
    method: 'POST',
    data: payload
  });
};

export const addComment = (blogId, payload) => {
  return axiosConfig({
    url: `/blogapp/blogs/${blogId}/comments`,
    method: 'POST',
    data: payload
  });
};

export const updateComment = (blogId, commentId, payload) => {
  return axiosConfig({
    url: `/blogapp/blogs/${blogId}/comments/${commentId}`,
    method: 'PUT',
    data: payload
  });
};

export const deleteComment = (blogId, commentId) => {
  return axiosConfig({
    url: `/blogapp/blogs/${blogId}/comments/${commentId}`,
    method: 'DELETE'
  });
};

export const getCommentDetails = (blogId, commentId) => {
  return axiosConfig({
    url: `/blogapp/blogs/${blogId}/comments/${commentId}`,
    method: 'GET'
  });
};
