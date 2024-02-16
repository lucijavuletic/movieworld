<script>
import Container from './Container.vue';

export default {
  components: {
    Container,
  }
};

</script>

<template>
    <footer class="footer">
        <Container>
            <div class="footer__container"> 
              <p class="footer__container">
                <p class="footer__container__text">
                  Data is provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a>.
                </p>
                <p class="footer__container__title">
                  MovieWorld
                </p>
              </p>
            </div>
        </Container>
      </footer>
</template>

<style scoped lang="scss">
.footer {
    background: #323232;

    &__container {
        padding: 24px 0;
        position: relative;
        text-align: center;

        &__text {
          color: #fff;
          margin: 0 auto 24px;
          font-size: 18px;

          a {
            font-weight: bold;
            color: #fff;
            transition: all .15s ease-in-out;

            &:hover {
              text-decoration-color: transparent;
            }
          }
        }

        &__title {
            gap: 8px;
            margin: 0 auto;
            font-size: 24px;
            color: #323232;
            background-color: #DDD0C8;
            width: fit-content;
            padding: 4px 16px;
            border-radius: 24px;
        }
    }
}
</style>