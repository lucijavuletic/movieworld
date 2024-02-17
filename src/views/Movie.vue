<!-- Movie.vue -->
<template>
    <div>
      <h1>Movie Details for ID: {{ movieId }}</h1>
      <!-- Other movie details can be added here -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        movieId: null,
      };
    },
    created() {
      // Access the dynamic route parameter ':id'
      this.movieId = this.$route.params.id;
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the Movie component */
  </style>
  