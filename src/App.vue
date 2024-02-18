<script>
import Navbar from './components/Navbar.vue';
import Container from './components/Container.vue';
import Footer from './components/Footer.vue';
import TopContainer from './components/TopContainer.vue';

export default {
  components: {
    Navbar,
    Container,
    Footer,
    TopContainer
  },
  methods: {
    handleClickOutside(event) {
      const autocompleteContainer = this.$refs.autocomplete;

      if (autocompleteContainer && !autocompleteContainer.contains(event.target)) {
        // Clicked outside search container, hide autocomplete
        this.autocompleteVisible = false;
      }
    }
  },
};
</script>

<template>
  <Navbar></Navbar> 

  <main @click="handleClickOutside">
    <!-- Main container styles -->
    <Container>
      <!-- Top container with search and right navigation -->
      <TopContainer></TopContainer>
      <router-view></router-view>
    </Container>
  </main>

  <Footer></Footer>
</template>

<style scoped lang="scss">
@import './assets/styles/common/variables.scss';
@import './assets/styles/common/colors.scss';

main {
  background-color: $color-beige;
  min-height: calc(100vh - $navbar-height);
  padding-top: 100px;
  overflow: hidden;
}
</style>
