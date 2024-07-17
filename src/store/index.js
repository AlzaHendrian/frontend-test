import { createArticle, getArticleById, getArticles } from '@/services/articleService';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      articles: [],
      newArticles: [],
      currentArticle: null,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
    };
  },
  mutations: {
    SET_ARTICLES(state, { articles, totalPages }) {
      state.articles = articles;
      state.totalPages = totalPages;
    },
    ADD_ARTICLE(state, article) {
      state.articles.push(article);
    },
    SET_NEW_ARTICLES(state, articles) {
      state.newArticles = articles;
    },
    SET_ARTICLE_DETAIL(state, article) {
      state.articleDetail = article;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchInitialArticles({ commit }, { page, limit, search}) {
      try {
        const response = await getArticles(page, limit, search);
        const data = response.data;
        commit('SET_ARTICLES', { articles: data.articles, totalPages: data.totalPages });
      } catch (error) {
        console.error('Error fetching initial articles:', error);
      }
    },
    async fetchMoreArticles({ commit, state }) {
      if (!state.isLoading && state.currentPage <= state.totalPages) {
        commit('SET_LOADING', true);
        try {
          const nextPage = state.currentPage + 1;
          const response = await getArticles(nextPage, 1);
          const data = response.data;
          
          if (nextPage > state.totalPages) {
            commit('SET_LOADING', false);
          } else {
            commit('ADD_ARTICLE', data.articles[0]);
            commit('SET_CURRENT_PAGE', nextPage);
            commit('SET_LOADING', false);
          }
        } catch (error) {
          console.error('Error fetching more articles:', error);
          commit('SET_LOADING', false);
        }
      }
    },
    async fetchNewArticles({ commit }) {
      try {
        const response = await getArticles(1, 100, '');
        const data = response.data;
        commit('SET_NEW_ARTICLES', data.articles);
      } catch (error) {
        console.error('Error fetching new articles:', error);
      }
    },
    async createArticle({ commit }, article) {
      try {
        const newArticle = await createArticle(article);
        commit('ADD_ARTICLE', newArticle);
      } catch (error) {
        console.error('Error creating article:', error);
      }
    },
    async fetchArticleDetail({ commit }, id) {
      try {
        const response = await getArticleById(id);
        commit('SET_ARTICLE_DETAIL', response.data);
      } catch (error) {
        console.error('Error fetching article detail:', error);
      }
    },
    async changePage({ commit, dispatch }, page) {
      commit('SET_CURRENT_PAGE', page);
      dispatch('fetchArticles', { page, limit: 10 });
    },
  },
  getters: {
    articles: (state) => state.articles,
    newArticles: (state) => state.newArticles,
    articleDetail: (state) => state.articleDetail,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
    isLoading: (state) => state.isLoading,
  },
});

export default store;
