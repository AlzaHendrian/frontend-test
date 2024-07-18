<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
    <h1 class="text-2xl font-bold mb-6 lg:mb-8">Create New Article</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input
          v-model="article.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter title"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="desc">
          Description
        </label>
        <textarea
          v-model="article.desc"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="desc"
          placeholder="Enter description"
          rows="5"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
          Image URL
        </label>
        <input
          v-model="article.image"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="text"
          placeholder="Enter image URL"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="posted">
          Posted At
        </label>
        <input
          v-model="article.posted"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="posted"
          type="date"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="creator">
          Creator
        </label>
        <input
          v-model="article.creator"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="creator"
          type="text"
          placeholder="Enter creator name"
          required
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Toastify } from '../main';
export default {
  data() {
    return {
      article: {
        title: '',
        desc: '',
        image: '',
        posted: '',
        creator: '',
      },
    };
  },
  methods: {
    ...mapActions(['createArticle']),
    confirmSubmit() {
      if (window.confirm("Are you sure you want to submit this article?")) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      const article = {
        title: this.article.title,
        desc: this.article.desc,
        image: this.article.image,
        posted: this.article.posted,
        creator: this.article.creator,
      };

      try {
        await this.createArticle(article);
        Toastify({
          text: "Sukses menambahkan artikel!",
          duration: 8000,
          close: true,
          gravity: "top", 
          position: "right", 
          backgroundColor: "#06D001",
        }).showToast();
        this.$router.push('/');
      } catch (error) {
        Toastify({
          text: "gagal menambahkan artikel!",
          duration: 8000, 
          close: true,
          gravity: "top", 
          position: "right",
          backgroundColor: "red",
        }).showToast();
      }
    },
  },
};
</script>
