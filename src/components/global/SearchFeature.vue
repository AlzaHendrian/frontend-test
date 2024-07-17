<template>
    <div class="search-box">
      <input type="text" placeholder="inspirasi desain" v-model="searchQuery" @input="debouncedSearch">
      <button @click="searchArticles">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </template>
  
  <script>
  import debounce from 'lodash.debounce';
  import { mapActions } from 'vuex';
  export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    ...mapActions(['fetchInitialArticles']),
    searchArticles() {
      this.fetchInitialArticles({ page: 1, limit: 10, search: this.searchQuery });
    }
  },
  created() {
    this.debouncedSearch = debounce(this.searchArticles, 300);
  }
}
  </script>  
  
  <style scoped>
  .search-box {
    display: flex;
    align-items: center;
    border: 1.5px solid black;
    padding-left: 8px;
    border-radius: 20px;
    margin-top: 24px;
  }
  
  .search-box input {
    border: none;
    outline: none;
    padding-left: 6px;
    flex-grow: 1;
  }
  
  .search-box button {
    background-color: black;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 0 20px 20px 0;
    align-items: center;
    justify-content: center;
  }
  
  .search-box button:hover {
    background-color: orange;
  }
  </style>
  