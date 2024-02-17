<script>
import Navbar from './components/Navbar.vue';
import Container from './components/Container.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Container,
    Footer
  },
};
</script>

<template>
  <Navbar></Navbar> 

  <main>
    <Container>
      <router-view></router-view>
    </Container>
  </main>

  <Footer></Footer>
</template>

<style scoped lang="scss">
@import './assets/styles/common/colors.scss';
@import './assets/styles/common/variables.scss';

main {
  background-color: $color-beige;
  min-height: calc(100vh - $navbar-height);
  padding-top: $navbar-height;
  overflow: hidden;
}
</style>
