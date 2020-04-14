import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Blog from '../views/Blog.vue';
import CreateBlog from '../views/CreateBlog.vue';
import Published from '../views/Published.vue';
import PublishedView from '../views/PublishedView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/addBlog',
    name: 'CreateBlog',
    component: CreateBlog
  },
  {
    path: '/myPublished',
    name: 'Published',
    component: Published
  },
  {
    path: '/myPublished/:id',
    name: 'PublishedView',
    component: PublishedView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
