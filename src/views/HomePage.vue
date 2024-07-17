<template>
  <div class="container-image">
    <div className="pt-[20rem]">
      <h1 className="text-[42px] font-bold text-white ms-32">News & Arcticle</h1>
      <p className="text-end text-white me-36 font-bold text-lg mt-8">Home <span className="mx-4">-</span> <span
          className="text-orange-500">Blog</span></p>
    </div>
  </div>
  <div className="w-[100%]">
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList.vue';

export default {
  name: 'HomePage',
  components: {
    ArticleList
  }
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
