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
                    <img class="navbar__container__title__icon" src="../assets/images/cinema.svg" alt="Movie icon">
                    <h1 class="navbar__container__title__text">MovieWorld</h1>
                </a>
            </div>
        </Container>
    </nav>
</template>

<style scoped lang="scss">
@import '../assets/styles/common/colors.scss' ;
@import '../assets/styles/common/mixins.scss' ;

.navbar {
    position: fixed;
    width: 100%;
    transition: transform 0.25s ease-in-out;
    background: $color-beige;
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
                background-color: $color-dark-brown;
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
            text-shadow: 1px 1px 3px rgba(50, 50, 50, 0.308);

            &__icon {
                max-width: 28px;
            }

            &__text {
                font-size: 28px;
                color: $color-dark-brown;
            }
            
            &:hover {
                opacity: .8;
            }
        }
    }

    &--hidden {
        transform: translateY(-100%);
    }

    @include respondBetween(0, 600px) {
      &__container {
        &__dots {
          gap: 4px;

          &__dot {
            width: 5px;
            height: 5px;
          }
        }
        &__title {
          gap: 4px;
          
          &__icon {
            max-width: 18px;
          }

          &__text {
            font-size: 16px;
          }
        }
      }
    }
}
</style>