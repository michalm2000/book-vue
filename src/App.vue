<template>
  <div id="app">
        <!-- <BooksList/> -->
      <books-list></books-list>

  </div>
</template>

<script>
import BooksList from './components/BooksList.vue'
// import AuthorsList from './components/AuthorsList.vue'


export default {
  name: 'App',
  components: {
    BooksList
    // AuthorsList
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
