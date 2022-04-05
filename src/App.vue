<template>
  <div id="app">
     <div>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand id="logo" href="#/">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#/books">Books</b-nav-item>
        <b-nav-item href="#/authors">Authors</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <component :is="currentView" />
  </div>

</template>

<script>
import BooksList from './components/BooksList.vue'
import AuthorsList from './components/AuthorsList.vue'

const routes = {
  '/books': BooksList,
  '/authors': AuthorsList
}

export default {
  name: 'App',
   data() {
    return {
      currentPath: window.location.hash
    }
  },
  components: {
    BooksList,
    AuthorsList
  },
  computed: {
    currentView(){
        return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted () {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
		})
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#logo {
  margin-left: 10vw;
}
#navbar{
  background: black;
}
</style>
