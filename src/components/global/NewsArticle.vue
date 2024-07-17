<template>
      <div v-for="article in articles.slice(0, 3)" :key="article.id" class="flex gap-8 mb-12 cursor-pointer text-[#7A7A7A] article-container" @click="goToDetail(article.id)">
        <img :src="article.image" alt="article" width="90px" class="h-[90px]">
        <div>
          <h2 class="font-semibold">{{ article.title }}</h2>
          <span class="text-xs">by {{ article.creator }}</span>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'NewsArticles',
    props: {
      articles: {
        type: Array,
        required: true
      }
    },
    methods: {
      goToDetail(articleId) {
        this.$router.push({ name: 'ArticleDetail', params: { id: articleId } });
      }
    }
  }
  </script>
  
  <style scoped>
  h2 {
    color: black;
  }
  .article-container:hover h2 {
  color: orange;
}
  </style>
  