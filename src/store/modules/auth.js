import { login } from '../../apis/api';

export default {
  namespaced: true,
  state: {
    token: null,
    username: null
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    }
  },
  actions: {
    async signInAction({ commit }, credentials) {
      const response = await login(credentials).then(res => {
        const token = res.data.token;
        localStorage.setItem('user-token', token);
        const username = JSON.parse(res.config.data).username;
        commit('SET_TOKEN', token);
        commit('SET_USERNAME', username);
      });
      return response;
    }
  },
  modules: {}
};
