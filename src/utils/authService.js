import axios from 'axios';

export const loginService = user =>
  new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_LOGIN_URL,
      data: user,
      method: 'POST'
    })
      .then(resp => {
        const token = resp.data.token;
        localStorage.setItem('user-token', token);
        localStorage.setItem('username', user.username);
        resolve(resp);
      })
      .catch(err => {
        localStorage.removeItem('user-token');
        reject(err);
      });
  });

export const logoutService = () => {
  localStorage.removeItem('user-token');
  localStorage.removeItem('username');
};
