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
