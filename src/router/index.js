import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import List from '../views/List.vue';
import Details from '../views/Details.vue';
import AddBlog from '../views/AddBlog.vue';
import ModifyComments from '../views/ModifyComments.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
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
    component: List
  },
  {
    path: '/:id/comments/:commentId',
    name: 'ModifyComments',
    component: ModifyComments
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

const token = localStorage.getItem('user-token');

router.beforeEach((to, _, next) => {
  window.scrollTo(0, 0);
  if (to.name !== 'Login' && token === null) {
    // Redirect user to login, if user is not authenticated
    next({ name: 'Login' });
  } else {
    next();
  }
  next();
});

export default router;
