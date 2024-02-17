// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Movie from '../views/Movie.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
