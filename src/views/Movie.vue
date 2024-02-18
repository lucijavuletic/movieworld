<!-- Movie.vue -->
<template>
  <div class="movie-details-container">
    <!-- Large background image -->
    <div class="movie-details-container__bckg-container">
      <div
        class="movie-details-container__bckg-container__image"
        :style="{ backgroundImage: `url('${getBackgroundImageUrl(movieDetails.backdrop_path)}')` }"
      ></div>
    </div>
    <!-- Movie content -->
    <div class="movie-details-container__content">
      <!-- Left part with poster, ratings and heart -->
      <div class="movie-details-container__content__left">
        <div class="movie-details-container__content__left__poster">
          <div
            class="movie-details-container__content__left__poster__image"
            :style="{ backgroundImage: `url('${getMoviePosterUrl(movieDetails.poster_path)}')` }"
          ></div>
          <div class="movie-details-container__content__left__poster__duration">
            <img
              class="movie-details-container__content__left__poster__duration__icon"
              src="../assets/images/icon-clock.svg"
            />
            {{ movieDetails.runtime }} min
          </div>
        </div>
        <div class="movie-details-container__content__left__rating-and-heart">
          <div class="movie-details-container__content__left__rating-and-heart__rating">
            <star-rating :value="movieDetails.vote_average / 2"></star-rating>
          </div>
          <div class="movie-details-container__content__left__rating-and-heart__heart">
            <IconHeart></IconHeart>
          </div>
        </div>
      </div>
      <!-- Right part with textual movie data (title, year, genre, overview..) -->
      <div class="movie-details-container__content__right">
        <h2 class="movie-details-container__content__right__title">{{ movieDetails.title }}</h2>
        <div class="movie-details-container__content__right__year">
          <img class="movie-details-container__content__right__year__icon" src="../assets/images/date-icon.svg" alt="Date year" />
          {{ getReleaseYear(movieDetails.release_date) }}
        </div>
        <div class="movie-details-container__content__right__genres">
          <strong>Genre: </strong>
          <span v-for="(genre, index) in movieDetails.genres" :key="genre.id">
            {{ genre.name }}<span v-if="!isLastItem(index, movieDetails.genres)">, </span>
          </span>
        </div>
        <div v-if="movieDetails.imdb_id" class="movie-details-container__content__right__imdb">
          View Movie on <a :href="getIMDbUrl(movieDetails.imdb_id)" target="_blank">IMDb</a>
        </div>
        <p class="movie-details-container__content__right__legend">
          {{ movieDetails.tagline }}
        </p>
        <p class="movie-details-container__content__right__overview">
          {{ movieDetails.overview }}
        </p>
        <div class="movie-details-container__content__right__credits">
          <h3 class="movie-details-container__content__right__credits__title">
            Credits
          </h3>
          <div v-if="movieDetails.credits && movieDetails.credits.cast">
            <span v-for="(person, index) in movieDetails.credits.cast" :key="person.id">
              {{ person.name }}<span v-if="!isLastItem(index, movieDetails.credits.cast)">, </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Recommended Movies -->
    <div class="movie-details-container__recommendations" v-if="recommendedMovies.length > 0">
      <h3 class="movie-details-container__recommendations__title">Recommended Movies:</h3>
      <div class="movie-details-container__recommendations__movies">
        <movie-item v-for="movie in recommendedMovies" :key="movie.id" :movie="movie" @go-to-movie-details="goToMovieDetails"></movie-item>
      </div>
    </div>
    <!-- Similar Movies -->
    <div class="movie-details-container__similar" v-if="similarMovies.length > 0">
      <h3 class="movie-details-container__similar__title">Similar Movies:</h3>
      <div class="movie-details-container__similar__movies">
        <movie-item v-for="movie in similarMovies" :key="movie.id" :movie="movie" @go-to-movie-details="goToMovieDetails"></movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import IconHeart from '@/components/IconHeart.vue';
import MovieItem from '@/components/MovieItem.vue';
import StarRating from '@/components/StarRating.vue';

export default {
  components: {
    IconHeart,
    MovieItem,
    StarRating,
  },
  setup() {
    const movieId = ref(null);
    const movieDetails = ref({});
    const recommendedMovies = ref([]);
    const similarMovies = ref([]);
    const maxDisplayedMovies = 6;
    const router = useRouter();

    const fetchMovieDetails = async () => {
      try {
        const apiKey = '4f9870dd7efed00d70817e86cdb90878';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId.value}?api_key=${apiKey}&append_to_response=credits,genres`
        );
        movieDetails.value = response.data;
        scrollToTop();
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchRecommendedMovies = async () => {
      try {
        const apiKey = '4f9870dd7efed00d70817e86cdb90878';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId.value}/recommendations?api_key=${apiKey}`
        );
        recommendedMovies.value = response.data.results.slice(0, maxDisplayedMovies);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const apiKey = '4f9870dd7efed00d70817e86cdb90878';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId.value}/similar?api_key=${apiKey}`
        );
        similarMovies.value = response.data.results.slice(0, maxDisplayedMovies);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    const getBackgroundImageUrl = (backdropPath) => {
      if (!backdropPath) {
        return '';
      }
      return `https://image.tmdb.org/t/p/original${backdropPath}`;
    };

    const getMoviePosterUrl = (posterPath) => {
      if (!posterPath) {
        return window.location.origin + '/src/assets/images/movie-poster-placeholder.png';
      }
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    };

    const isLastItem = (index, arr) => {
      return index === arr.length - 1;
    };

    const getReleaseYear = (releaseDate) => {
      if (!releaseDate) {
        return '';
      }
      return new Date(releaseDate).getFullYear();
    };

    const getIMDbUrl = (imdbId) => {
      return `https://www.imdb.com/title/${imdbId}/`;
    };

    const goToMovieDetails = (id) => {
      router.push({ name: 'Movie', params: { id } });
    };

    watch(
      () => router.currentRoute.value.params.id,
      (newMovieId, oldMovieId) => {
        movieId.value = newMovieId;
        fetchMovieDetails();
        fetchRecommendedMovies();
        fetchSimilarMovies();
      }
    );

    // Fetch data on component mount
    onMounted(() => {
      movieId.value = router.currentRoute.value.params.id;
      fetchMovieDetails();
      fetchRecommendedMovies();
      fetchSimilarMovies();
    });

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return {
      movieId,
      movieDetails,
      recommendedMovies,
      similarMovies,
      maxDisplayedMovies,
      fetchMovieDetails,
      fetchRecommendedMovies,
      fetchSimilarMovies,
      getBackgroundImageUrl,
      getMoviePosterUrl,
      isLastItem,
      getReleaseYear,
      getIMDbUrl,
      goToMovieDetails,
      scrollToTop,
    };
  },
};
</script>
  
<style scoped lang="scss">
@import '../assets/styles/common/mixins.scss';
@import '../assets/styles/common/colors.scss';
.movie-details-container {
  margin-top: 32px;

  &__bckg-container {
    &__image {
      @include responsiveImageContainer(16,4);
      background-position: 50% 30%;
      background-repeat: no-repeat;
      background-size: cover;
      // Increase image size so it breaks outside Container max width
      width: calc(100% + 144px);
      margin-left: -72px;

      &:before {
        // Add shadowish overlay on image
        background-color: $color-dark-brown;
        opacity: 0.5;
      }
    }
  }

  &__content {
    position: relative;
    margin-top: -112px;
    display: flex;
    gap: 32px;
    margin-bottom: 80px;

    &__left {
      width: 25%;

      &__poster {
        box-shadow: 4px 4px 4px rgba(50, 50, 50, 0.541);
        position: relative;
        border-radius: 8px;
        margin-bottom: 24px;

        &__image {
          @include responsiveImageContainer(3,4);
          background-position: 50% 30%;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 8px;
        }

        &__duration {
          position: absolute;
          width: 100%;
          background-color: rgba(50, 50, 50, 0.7);
          bottom: 0;
          color: $color-white;
          font-size: 18px;
          border-radius: 0 0 8px 8px;
          padding: 4px 0;
          display: flex;
          align-items: center;
          gap: 4px;
          
          &__icon {
            max-width: 18px;
            margin-left: 12px;
          }
        }
      }

      &__rating-and-heart {
        display: flex;
        justify-content: space-between;

        &__heart {
          max-width: 32px;
          cursor: pointer;

          svg {
            max-width: 100%;
            height: 100%;
            transition: all .2s ease-in-out;
          }

          &:hover {
            svg {
              fill: $color-cherry-red;
            }
          }
        }
      }
    }

    &__right {
      max-width: 50%;
      max-width: 700px;
      margin-top: 132px;

      &__title {
        max-width: 80%;
        margin-bottom: 16px;
        line-height: 110%;
      }

      &__year {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        &__icon {
          max-width: 16px;
        }
      }

      &__genres {
        margin-bottom: 8px;
        display: block;
        font-size: 16px;
      }

      &__imdb {
        margin-bottom: 32px;

        a {
          font-weight: bold;
          color: $color-dark-brown;
          transition: all .2s ease-in-out;

          &:hover {
            text-decoration-color: transparent;
          }
        }
      }

      &__legend {
        font-style: italic;
        font-size: 18px;
        margin-bottom: 4px;
      }

      &__overview {
        margin-bottom: 24px;
        font-size: 16px;
      }
    }
  }

  &__recommendations, &__similar {
    &__title {
      font-size: 28px;
    }

    &__movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 24px 0 52px;

      .c-movie-item {
        flex: 1 0 16.66%;
        max-width: 15%;
        padding: 0;
        margin-right: 16px;
      }
    }
  }

  @include respondBetween(0, 1000px) {
    &__content {
      &__left {
        width: 40%;
      }

      &__right {
        width: 50%;
      }
    }

    &__recommendations, &__similar {
      &__title {
        font-size: 24px;
      }

      &__movies {
        justify-content: flex-start;
        .c-movie-item {
          flex: 1 0 33.33%;
          max-width: 33.33%;
          padding: 8px;
          margin-right: 0;
          margin-bottom: 24px;
        }
      }
    }
  }

  @include respondBetween(0, 600px) {
    &__content {
      flex-direction: column;
      margin-top: -40px;

      &__left {
        width: 100%;
      }

      &__right {
        width: 100%;
        margin-top: 0;
      }
    }

    &__recommendations, &__similar {
      &__movies {
        .c-movie-item {
          flex: 1 0 50%;
          max-width: 50%;
        }
      }
    }
  }
}
</style>
  