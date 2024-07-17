<template>
  <div v-if="articleDetail" class="container-image">
    <div className="pt-[16rem]">
      <h1 className="text-[42px] font-bold text-white ms-32 w-[80%]">{{ articleDetail.title }}</h1>
      <p className="text-end text-white me-36 font-bold text-lg mt-8">Home <span className="mx-4">-</span> <span
          className="text-orange-500">{{ articleDetail.title }}</span></p>
    </div>
  </div>
  <div>
    <ArticleDetail />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ArticleDetail from '../components/ArticleDetail.vue';

export default {
  name: 'ArticleDetailPage',
  components: {
    ArticleDetail
  },
  computed: {
    ...mapState(['articleDetail']),
  },
  methods: {
    ...mapActions(['fetchArticleDetail']),
  },
  async created() {
    const articleId = this.$route.params.id;
    await this.fetchArticleDetail(articleId);
  },
}
</script>

<style scoped>
.container-image {
  background-image: url('https://bintoroarchitect.co.id/wp-content/uploads/2021/11/bintoroarchitect-Tips-and-Tricks.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
}
</style>