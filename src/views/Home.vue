<!-- Home.vue -->
<template>
    <!-- Category navigation -->
    <div class="category-nav">
        <button
            v-for="item in [
                { category: 'popular', label: 'Popular' },
                { category: 'top_rated', label: 'Top Rated' },
                { category: 'upcoming', label: 'Upcoming' }
            ]"
            :key="item.category"
            class="category-nav__option"
            :class="{ 'category-nav__option--active': item.category === activeCategory }"
            @click="fetchMoviesByCategory(item.category)"
        >
            {{ item.label }}
        </button>
    </div>
    <!-- Movies grid -->
    <div class="movies-container">
        <div class="movies-container__movies">
            <movie-item v-for="movie in displayedMoviesWithGenres" :key="movie.id" :movie="movie" @go-to-movie-details="goToMovieDetails"></movie-item>
        </div>
        <Button :clickHandler="loadMore" :isDisabled="!hasMoreMovies" :buttonText="'Load More'"></Button>
    </div>
  </template>
  
<script>
  import axios from 'axios';
  import MovieItem from '@/components/MovieItem.vue';
  import Button from '@/components/Button.vue';
  
  export default {
    components: {
        MovieItem,
        Button
    },
    data() {
      return {
        apiKey: '4f9870dd7efed00d70817e86cdb90878',
        movies: [],
        genres: [], 
        moviesPerPage: 12,
        page: 1,
        totalMovies: 0,
        activeCategory: 'popular'
      };
    },
    computed: {
        displayedMovies() {
            const startIndex = (this.page - 1) * this.moviesPerPage;
            const endIndex = startIndex + this.moviesPerPage;
            return this.movies.slice(0, endIndex);
        },
        displayedMoviesWithGenres() {
            return this.displayedMovies.map(movie => ({
                ...movie,
                genres: this.getGenresLabels(movie.genre_ids),
            }));
        },
        hasMoreMovies() {
            return this.totalMovies > this.movies.length;
        },
    },
    mounted() {
        this.fetchGenres();
        this.fetchMoviesByCategory(this.activeCategory);
    },
    methods: {
        async fetchMovies(category) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${this.apiKey}&page=${this.page}`);
                this.totalMovies = response.data.total_results;

                // Map genre IDs to their names for each movie
                const moviesWithGenres = response.data.results.map(movie => ({
                    ...movie,
                    genres: this.getGenresLabels(movie.genre_ids),
                }));

                // Concatenate the new movies with the existing ones
                this.movies = [...this.movies, ...moviesWithGenres];
                this.activeCategory = category; // Update active category
            } catch (error) {
                console.error(`Error fetching ${category} movies:`, error);
            }
        },
        fetchMoviesByCategory(category) {
            this.page = 1;
            this.movies.length = 0;
            this.fetchMovies(category);
        },
        loadMore() {
            if (this.hasMoreMovies) {
                this.page++;
                this.fetchMovies(this.activeCategory);
            }
        },
        async fetchGenres() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
                this.genres = response.data.genres;
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        },
        getGenresLabels(genreIds) {
            return genreIds.map(genreId => {
                const genre = this.genres.find(g => g.id === genreId);
                return genre ? genre.name : '';
            });
        },
        goToMovieDetails(movieId) {
            // Use Vue Router to navigate to the movie details page
            this.$router.push({ name: 'Movie', params: { id: movieId } });
        },
    },
  };
</script>

<style scoped lang="scss">
@import '../assets/styles/common/colors.scss';
@import '../assets/styles/common/mixins.scss';

.category-nav {
    position: relative;
    padding-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 64px;
    max-width: 440px;

    &__option {
        padding: 4px 0;
        width: 30%;
        border: 1px solid $color-dark-brown;
        text-align: center;
        display: block;
        transition: all .15s ease-in-out;
        font-size: 18px;
        padding: 8px 16px;
        background-color: $color-beige;
        outline: none;

        &:hover {
            background-color: rgba(50, 50, 50, 0.1);
            border-color: rgba(50, 50, 50, 0.5);
            cursor: pointer;
        }

        &--active {
            background-color: $color-dark-brown;
            color: $color-white;

            &:hover {
                pointer-events: none;
                background-color: $color-dark-brown;
                color: $color-white;
            }
        }
    }
}

.movies-container {
    &__movies {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 16px);
        margin-bottom: 40px;

        .c-movie-item {
            flex: 1 0 16.666%;
            max-width: 16.666%;
            margin-bottom: 24px;
        }
    }

    .c-button {
        margin: 0 auto 72px;
        display: block;
    }
}

@include respondBetween(0, 860px) {
    .category-nav {
        &__option {
            font-size: 14px;
        }
    }
    .movies-container {
        margin-bottom: 40px;

        .c-movie-item {
            flex: 1 0 25%;
            max-width: 25%;
        }
    }
}

@include respondBetween(0, 600px) {
    .category-nav {
        &__option {
            font-size: 12px;
        }
    }
    .movies-container {
        margin-bottom: 32px;

        .c-movie-item {
            flex: 1 0 33.33%;
            max-width: 33.33%;
        }
    }
}
</style>