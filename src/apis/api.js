import axiosConfig from '../config/axiosConfig';

export const login = payload => {
  return axiosConfig({
    url: `/auth/login/`,
    method: 'POST',
    data: payload
  });
};
