<template>
  <div class="flex flex-col md:flex-row justify-between w-full mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-20 gap-4 md:gap-14">
    <div v-if="articleDetail" class="w-full px-2 md:px-4 lg:px-8 py-4 md:py-6 lg:py-12">
      <img :src="articleDetail.image" alt="article image" class="w-full">
      <div class="p-2 md:p-4 lg:p-8 w-full shadow-xl">
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
          <p class="text-sm md:text-base">{{ articleDetail.posted }}</p>
          <p class="text-sm md:text-base">by Web {{ articleDetail.creator }}</p>
          <p class="text-sm md:text-base">0 Comments</p>
        </div>
        <p class="mt-2 md:mt-4 text-justify">
          {{ articleDetail.desc }}
        </p>
      </div>
    </div>

    <div class="w-full md:w-[50%]">
      <h1 class="text-lg md:text-xl lg:text-2xl font-bold">Search</h1>
      <SearchFeature></SearchFeature>

      <div>
        <h1 class="mt-4 md:mt-8 mb-3 md:mb-6 text-lg md:text-xl lg:text-2xl">Artikel Baru</h1>
        <NewArticle :articles="newArticles"></NewArticle>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SearchFeature from './global/SearchFeature.vue';
import NewArticle from './global/NewsArticle.vue';

export default {
  components: {
    SearchFeature,
    NewArticle
  },
  computed: {
    ...mapGetters(['newArticles']),
    ...mapState(['articleDetail']),
  },
  methods: {
    ...mapActions(['fetchArticleDetail', 'fetchNewArticles']),
  },
  async created() {
    const articleId = this.$route.params.id;
    await this.fetchArticleDetail(articleId);
  },
  mounted() {
    this.fetchNewArticles();
  }
};
</script>