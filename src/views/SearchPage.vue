<!-- Search page -->
<template>
    <!-- Search results -->
    <div class="search-page-container">
        <h4 class="search-page-container__title" v-if="searchTerm && searchResults.length > 0">
            Results for "{{ searchTerm }}": 
        </h4>
        <p class="search-page-container__no-results-text" v-if="searchResults.length == 0">
            No movies found for for "{{ searchTerm }}"...
        </p>
        <div class="search-page-container__results">
            <!-- <movie-item v-for="movie in searchResults" :key="movie.id" :movie="movie"></movie-item> -->
            <router-link
                v-for="movie in searchResults"
                :key="movie.id"
                :to="{ name: 'Movie', params: { id: movie.id } }"
            >
                <movie-item :movie="movie"></movie-item>
            </router-link>
        </div>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
import axios from 'axios';

export default {
    components: {
        MovieItem
    },
    data() {
        return {
        searchTerm: this.$route.query.term || '',
        searchResults: JSON.parse(this.$route.params.searchResults || '[]'),
        };
    },
    watch: {
        '$route.query.term'(newTerm) {
        this.searchTerm = newTerm || '';
        },
        '$route.params.searchResults'(newResults) {
        this.searchResults = JSON.parse(newResults || '[]');
        }
    },
    mounted() {
        this.fetchSearchResults();
    },
    methods: {
        async fetchSearchResults() {
        if (this.searchTerm && this.searchResults.length === 0) {
            try {
            const apiKey = '4f9870dd7efed00d70817e86cdb90878';
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchTerm}`
            );
            this.searchResults = response.data.results;
            } catch (error) {
            console.error('Error fetching search results:', error);
            }
        }
        },
    },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/common/mixins.scss';
@import '../assets/styles/common/colors.scss';

.search-page-container {
    margin-top: 40px;

    &__title {
        margin-bottom: 32px;
    }

    &__no-results-text {
        font-size: 18px;
    }

    &__results {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 32px);
        margin-left: -16px;
        margin-bottom: 40px;

        a {
            flex: 1 0 16.666%;
            max-width: 16.666%;
            margin-bottom: 24px;
            text-decoration: none;
            color: $color-dark-brown;
        }
    }

    @include respondBetween(0, 834px) {
        &__results {
            a {
            flex: 1 0 25%;
            max-width: 25%;
        }
        }
    }

    @include respondBetween(0, 600px) {
        width: 100%;
        margin-left: 0;
        margin-bottom: 32px;

        &__results {
            padding: 0 8px;
        }

        a {
            flex: 1 0 50%;
            max-width: 50%;
        }
    }
}
</style>