import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
