<!-- Home.vue -->
<template>
    <!-- Page-specific content for the home page -->
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
            <div class="movies-container__movies__item" v-for="movie in displayedMovies" :key="movie.id" @click="goToMovieDetails(movie.id)">
                <div class="movies-container__movies__item-container">
                    <div class="movies-container__movies__item__image-container">
                        <div class="movies-container__movies__item__image-container__image" :style="{ backgroundImage: `url('${getMoviePosterUrl(movie.poster_path)}')` }"></div>
                            <div :class="{ 
                                'movies-container__movies__item__image-container__image__rating': true, 
                                'movies-container__movies__item__image-container__image__rating--bad': isBadRated(movie.vote_average) 
                            }">
                                {{ roundFloatToOneDecimal(movie.vote_average) }}
                            </div>
                        </div>
                <p class="movies-container__movies__item__year">
                    - {{ getReleaseYear(movie.release_date) }}
                </p>
                <h3 class="movies-container__movies__item__title">
                    {{ movie.title }}
                </h3>
                <p class="movies-container__movies__item__genre">
                    <span v-for="(genre, index) in movie.genres" :key="index">{{ genre }}{{ index < movie.genres.length - 1 ? ', ' : '' }}</span>
                </p>
                </div>
            </div>
        </div>
        <button class="movies-container__button" @click="loadMore" :disabled="!hasMoreMovies">
            Load More
        </button>
    </div>

  </template>
  
<script>
  import axios from 'axios';
  
  export default {
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
        getMoviePosterUrl(posterPath) {
            if (!posterPath) {
                return ''; // Handle cases where posterPath is not available
            }
            // Replace 'w500' with the desired image size
            return `https://image.tmdb.org/t/p/w500/${posterPath}`;
        },
        getReleaseYear(releaseDate) {
            if (!releaseDate) {
                return ''; // Handle cases where releaseDate is not available
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
        goToMovieDetails(movieId) {
            // Use Vue Router to navigate to the movie details page
            this.$router.push({ name: 'Movie', params: { id: movieId } });
        },
    },
  };
</script>

<style scoped lang="scss">
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
        border: 1px solid #323232;
        text-align: center;
        display: block;
        transition: all .15s ease-in-out;
        font-size: 18px;
        padding: 8px 16px;
        background-color: #DDD0C8;
        outline: none;

        &:hover {
            background-color: rgba(50, 50, 50, 0.11);
            border-color: rgba(50, 50, 50, 0.5);
            cursor: pointer;
        }

        &--active {
            background-color: #323232;
            color: white;

            &:hover {
                pointer-events: none;
                background-color: #323232;
                color: white;
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

        &__item {
            flex: 1 0 16.666%;
            max-width: 16.666%;
            margin-bottom: 24px;
            padding: 16px;

            &__image-container {
                position: relative;
                margin-bottom: 8px;
                overflow: hidden;

                &__image {
                    background-position: 50% 50%;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: block;
                    overflow: hidden;
                    padding: 0;
                    position: relative;
                    transform: scale(1);
                    transition: transform .4s ease-in-out;
                    width: 100%;
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
                        border: 1px solid #fff;
                        border-radius: 0 0 0 24px;
                        background-color: rgb(90, 161, 90);
                        color: #fff;

                        &--bad {
                            background-color: rgb(172, 100, 100);
                            color: #fff;
                        }
                    }
                }
            }

            &__year {
                font-weight: bold;
                font-size: 12px;
            }

            &__title {
                color: #323232;
                font-weight: bold;
                font-size: 18px;
            }

            &__genre {
                font-size: 14px;
            }

            &:hover {
                cursor: pointer;
                .movies-container__movies__item {
                    &__image-container__image {
                        transform: scale(1.1);
                    }
                }
            }
        }
    }

    &__button {
        margin: 0 auto 80px;
        width: auto;
        display: block;
        padding: 20px 32px;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
        outline: none;
        border: none;
        border-radius: 16px;
        background-color: #323232;
        color: #fff;
        cursor: pointer;
        transition: all .2s ease-in-out;

        &:hover {
            background-color: rgba(50, 50, 50, 0.8);
        }

        &:active {
            opacity: .8;
        }
    }
}
</style>