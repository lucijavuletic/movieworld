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
@import '../assets/styles/common/colors.scss';

.footer {
    background: $color-dark-brown;

    &__container {
        padding: 24px 0;
        position: relative;
        text-align: center;

        &__text {
          color: $color-white;
          margin: 0 auto 24px;
          font-size: 18px;

          a {
            font-weight: bold;
            color: $color-white;
            transition: all .15s ease-in-out;

            &:hover {
              text-decoration-color: transparent;
            }
          }
        }

        &__title {
            gap: 8px;
            margin: 0 auto;
            font-size: 18px;
            color: $color-dark-brown;
            background-color: $color-beige;
            width: fit-content;
            padding: 4px 24px;
            border-radius: 24px;
        }
    }
}
</style>