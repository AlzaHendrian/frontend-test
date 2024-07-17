<template>
  <div class="flex justify-between w-[90%] mx-auto py-20 gap-14">
    <div v-if="articleDetail" class="w-[100%] px-8 py-12">
      <img :src="articleDetail.image" alt="article image" width="90%">
      <div class="p-8 w-[100%] shadow-xl">
        <div class="flex gap-4">
          <p class="color">{{ articleDetail.posted }}</p>
          <p>by Web {{ articleDetail.creator }}</p>
          <p>0 Comments</p>
        </div>
        <p class="mt-6 text-justify mx-8">
          {{ articleDetail.desc }}
        </p>
      </div>
    </div>


    <div class="w-[50%]">
        <h1 class="text-[24px] font-bold">Search</h1>
        <SearchFeature></SearchFeature>

        <div>
          <h1 class="mt-8 mb-6">Artikel Baru</h1>
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