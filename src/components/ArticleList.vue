<template>
  <div ref="scrollContainer">
    <div class="flex justify-between w-[90%] mx-auto py-20 gap-14">
      <div>
        <div v-for="article in articles" :key="article.id"
          class="w-[100%] mb-16 cursor-pointer article-container text-[#7A7A7A]" @click="goToDetail(article.id)">
          <img :src="article.image" alt="article" width="90%">
          <div class="w-[100%] p-6 shadow-xl">
            <h1 class="text-justify text-[#2f2f2f] ">{{ article.title }}</h1>
            <div class="flex mt-6 gap-4">
              <p class="color">{{ article.posted }}</p>
              <p>by Web {{ article.creator }}</p>
              <p>0 Comments</p>
            </div>
            <p class="mt-6 text-justify">
              {{ article.desc }}
            </p>
          </div>
        </div>
        <div ref="loadMore" class="loading-indicator">
          <p v-if="allDataLoaded"></p>
          <div v-else class="spinner"></div>
        </div>
      </div>

      <div class="w-[100%]">
        <h1>Search</h1>
        <SearchFeature></SearchFeature>

        <div>
          <h1 class="mt-8 mb-6">Artikel Baru</h1>
          <NewArticle :articles="newArticles"></NewArticle>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash.debounce';
import SearchFeature from './global/SearchFeature.vue';
import NewArticle from './global/NewsArticle.vue';


export default {
  name: 'ArticleList',
  components: {
    SearchFeature,
    NewArticle
  },
  computed: {
    ...mapGetters(['articles', 'newArticles', 'currentPage', 'totalPages', 'isLoading']),
    allDataLoaded() {
      return this.currentPage >= this.totalPages;
    }
  },
  methods: {
    ...mapActions(['fetchInitialArticles', 'fetchMoreArticles', 'fetchNewArticles']),
    handleIntersect(entries) {
      const [entry] = entries;
      if (entry.isIntersecting && !this.isLoading && !this.allDataLoaded) {
        this.debouncedFetchMoreArticles();
      }
    },
    fetchMoreArticlesDebounced() {
      this.fetchMoreArticles();
    },
    fetchArticles() {
      this.fetchInitialArticles({ page: 1, limit: 1, search: this.searchQuery });
      console.log('Fetched articles:', this.articles);
    },
    goToDetail(articleId) {
      this.$router.push({ name: 'ArticleDetail', params: { id: articleId } });
    }
  },
  mounted() {
    this.fetchArticles();
    this.fetchNewArticles();

    this.$nextTick(() => {
      const loadMoreElement = this.$refs.loadMore;
      if (loadMoreElement) {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        };
        this.observer = new IntersectionObserver(this.handleIntersect, options);
        this.observer.observe(loadMoreElement);
      } else {
        console.error('Load more element not found');
      }
    });

    this.debouncedFetchArticles = debounce(this.fetchArticles, 200);
    this.debouncedFetchMoreArticles = debounce(this.fetchMoreArticlesDebounced, 200);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  watch: {
    articles(newVal) {
      if (this.currentPage >= this.totalPages) {
        this.allDataLoaded = true;
      }
      console.log(newVal, "<<< newVal");
    }
  }
}
</script>

<style scoped>
/* Kelas CSS yang ada */
h1 {
  font-weight: bold;
  font-size: 24px;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

.article-container:hover h1 {
  color: orange;
}

.article-container:hover .color {
  color: black;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
