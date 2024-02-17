<!-- MovieItem.vue -->

<template>
    <div class="c-movie-item" @click="goToMovieDetails">
        <div class="c-movie-item__image-container">
          <div class="c-movie-item__image-container__image" :style="{ backgroundImage: `url('${getMoviePosterUrl(movie.poster_path)}')` }"></div>
          <div :class="{ 
            'c-movie-item__image-container__image__rating': true, 
            'c-movie-item__image-container__image__rating--bad': isBadRated(movie.vote_average) 
          }">
            {{ roundFloatToOneDecimal(movie.vote_average) }}
          </div>
        </div>
        <p class="c-movie-item__year">
            <img class="c-movie-item__year__icon" src="../assets/images/date-icon.svg" alt="Date year">
            {{ getReleaseYear(movie.release_date) }}
        </p>
        <h3 class="c-movie-item__title">{{ movie.title }}</h3>
        <p class="c-movie-item__genre">
          <span v-for="(genre, index) in movie.genres" :key="index">{{ genre }}{{ index < movie.genres.length - 1 ? ', ' : '' }}</span>
        </p>
    </div>
  </template>
  
<script>
  export default {
    props: {
      movie: Object,
    },
    methods: {
      goToMovieDetails() {
        this.$emit('go-to-movie-details', this.movie.id);
      },
      getMoviePosterUrl(posterPath) {
        if (!posterPath) {
          return '';
        }
        return `https://image.tmdb.org/t/p/w500/${posterPath}`;
      },
      getReleaseYear(releaseDate) {
        if (!releaseDate) {
          return '';
        }
        return new Date(releaseDate).getFullYear();
      },
      roundFloatToOneDecimal(num) {
        const roundedNumber = Math.ceil(num * 10) / 10;
        return roundedNumber.toFixed(1);
      },
      isBadRated(num) {
        return this.roundFloatToOneDecimal(num) < 6.0;
      },
    },
  };
</script>
  
<style scoped lang="scss">
@import '../assets/styles/common/mixins.scss';
@import '../assets/styles/common/colors.scss';
  
  .c-movie-item {
    padding: 16px;

    &__image-container {
      position: relative;
      margin-bottom: 8px;
      overflow: hidden;
  
      &__image {
        @include responsiveImageContainer(4,3);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        transform: scale(1);
        transition: transform .4s ease-in-out;
        border-radius: 4px;
  
        &::before {
          clear: both;
          content: "";
          display: block;
          padding-top: 140%;
        }
  
        &::after {
          clear: both;
          content: "";
          display: block;
        }
  
        &__rating {
          position: absolute;
          top: 0;
          right: 0;
          padding: 8px;
          border: 1px solid $color-white;
          border-radius: 0 0 0 24px;
          background-color: $color-green;
          color: $color-white;
  
          &--bad {
            background-color: $color-cherry-red;
            color: $color-white;
          }
        }
      }
    }
  
    &__year {
      display: flex;
      align-items: center;
      gap: 4px;

      &__icon {
        max-width: 14px;
      }

      font-weight: bold;
      font-size: 12px;
    }
  
    &__title {
      color: $color-dark-brown;
      font-weight: bold;
      font-size: 18px;
    }
  
    &__genre {
      font-size: 14px;
    }
  
    &:hover {
      cursor: pointer;
      .c-movie-item {
        &__image-container__image {
          transform: scale(1.1);
        }
      }
    }

    @include respondBetween(0, 600px) {
        padding: 8px;

        &__title {
            font-size: 14px;
        }

        &__genre {
            font-size: 12px;
        }
    }
  }
</style>
  