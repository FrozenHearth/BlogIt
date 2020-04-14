import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Blogs from '../views/Blogs.vue';
import SingleBlog from '../views/SingleBlog.vue';
import CreateBlog from '../views/CreateBlog.vue';
import Published from '../views/Published.vue';
import PublishedDetails from '../views/PublishedDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/blog/:id',
    name: 'SingleBlog',
    component: SingleBlog
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
    name: 'PublishedDetails',
    component: PublishedDetails
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
