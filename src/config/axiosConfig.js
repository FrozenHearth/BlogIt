import axios from 'axios';

let token = localStorage.getItem('user-token');

const instance = axios.create({
  baseURL: 'https://blog-api-ver1.herokuapp.com'
});

if (token) {
  instance.defaults.headers.common = { Authorization: `Token ${token}` };
}

export default instance;
