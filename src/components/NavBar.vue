<template>
    <nav class="bg-white shadow">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <div>
            <router-link to="/" class="text-gray-800 text-xl font-bold"><img class="logo" src="https://bintoroarchitect.co.id/wp-content/uploads/2024/01/Architect-Vertical-Color-Black.png" alt="logo"></router-link>
          </div>
          <div>
            <a class="text-gray-800 mx-3 hover:text-blue-500" href="/">
              Home
            </a>
            <router-link to="/create" class="text-gray-800 mx-3 hover:text-blue-500">Create Article</router-link>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  }
  
  </script>
  
  <style scoped>
  .logo {
    width: 100px;
  }
  </style>
  