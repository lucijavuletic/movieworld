// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Movie from '../views/Movie.vue';
import SearchPage from '@/views/SearchPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    props: (route) => ({ 
      term: route.query.term, 
      searchResults: route.params.searchResults 
    })
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
