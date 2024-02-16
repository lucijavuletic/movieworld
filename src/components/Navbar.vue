<script>
import Container from './Container.vue';

export default {
  components: {
    Container,
  },
  data() {
    return {
      isNavbarHidden: false,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 120) {
        // Scrolling down
        this.isNavbarHidden = true;
      } else {
        // Scrolling up
        this.isNavbarHidden = false;
      }

      this.lastScrollPosition = currentScrollPosition;
    },
  }
};

</script>

<template>
    <nav v-bind:class="{ 'navbar': true, 'navbar--hidden': isNavbarHidden }">
        <Container>
            <div class="navbar__container"> 
                <div class="navbar__container__dots">
                    <div class="navbar__container__dots__dot"></div>
                    <div class="navbar__container__dots__dot"></div>
                    <div class="navbar__container__dots__dot"></div>
                </div>
                <a class="navbar__container__title" href="/">
                    <img class="navbar__container__title__icon" src="../assets/images/cinema.svg">
                    <h1 class="navbar__container__title__text">MovieWorld</h1>
                </a>
            </div>
        </Container>
    </nav>
</template>

<style scoped lang="scss">
.navbar {
    position: fixed;
    width: 100%;
    transition: transform 0.25s ease-in-out;
    background: #DDD0C8;
    border-bottom: 1px solid rgba(168, 123, 95, 0.26);
    z-index: 100;

    &__container {
        display: flex;
        padding: 16px 0;
        position: relative;
        text-align: center;

        &__dots, &__title {
            width: 50%;
        }

        &__dots {
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);

            &__dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #323232;
            }
        }

        &__title {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 auto;
            width: auto;
            text-align: center;
            text-decoration: none;
            transition: all .15s ease-in-out;

            &__icon {
                max-width: 28px;
            }

            &__text {
                font-size: 28px;
                color: #323232;
            }
            
            &:hover {
                opacity: .8;
            }
        }
    }

    &--hidden {
        transform: translateY(-100%);
    }
}
</style>