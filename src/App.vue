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

<style scoped>
main {
  background-color: #DDD0C8;
  min-height: 150vh;
  padding-top: 87px;
  overflow: hidden;
}
</style>
