import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import List from '../views/List.vue';
import Details from '../views/Details.vue';
import AddBlog from '../views/AddBlog.vue';
import MyDrafts from '../views/MyDrafts.vue';
import ModifyComments from '../views/ModifyComments.vue';

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
    component: List
  },
  {
    path: '/blog/:id',
    name: 'BlogDetails',
    component: Details
  },
  {
    path: '/myPublished/:id',
    name: 'PublishedDetails',
    component: Details
  },
  {
    path: '/myDrafts/:id',
    name: 'MyDraftsDetails',
    component: Details
  },
  {
    path: '/addBlog',
    name: 'CreateBlog',
    component: AddBlog
  },
  {
    path: '/myPublished',
    name: 'Published',
    component: List
  },

  {
    path: '/myDrafts',
    name: 'MyDrafts',
    component: MyDrafts
  },

  {
    path: '/:id/comments/:commentId',
    name: 'ModifyComments',
    component: ModifyComments
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
