import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import ArticleDetailPage from '../views/ArticleDetailPage.vue';
import CreateArticlePage from '../views/CreateArticlePage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetailPage },
  { path: '/create', name: 'CreateArticle', component: CreateArticlePage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router;