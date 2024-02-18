<!-- TopContainer.vue -->
<!-- Container that goes on top of every page that contains search and navigation on right -->
<template>
    <div class="top-container">
      <div class="top-container__search-container">
        <input
          class="top-container__search-container__input"
          type="text"
          v-model="searchQuery"
          @keyup="handleSearchKeyUp"
          placeholder="Search..."
          @click.stop
          @click="showAutocomplete"
        />
        <button 
            @click="performSearch(true)" 
            class="top-container__search-container__button"
        >
          <img 
            class="top-container__search-container__button__icon" 
            src="@/assets/images/search-icon.png" 
            alt="Search" 
            >
        </button>
        <div 
            v-if="searchResults.length > 0 && autocompleteVisible" 
            class="top-container__search-container__autocomplete" 
            ref="autocomplete"
        >
          <router-link 
            v-for="(result, index) in searchResults" 
            :key="index" 
            :to="{ name: 'Movie', params: { id: result.id } }"
        >
            <div 
                class="top-container__search-container__autocomplete__item" 
                @click.stop
            >
              <img 
                class="top-container__search-container__autocomplete__item__image" 
                :src="getMoviePosterUrl(result.poster_path)" alt="Poster" 
                >
              <div class="top-container__search-container__autocomplete__item__details">
                <div class="top-container__search-container__autocomplete__item__details__title">
                  {{ result.title }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="top-container__right-nav">
        <p class="top-container__right-nav__option">
          Favorites
        </p>
        <div class="top-container__right-nav__divider"></div>
        <p class="top-container__right-nav__option">
          Visited
        </p>
      </div>
    </div>
  </template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        searchResults: [],
        autocompleteVisible: false
      };
    },
    methods: {
      // API search function
      async performSearch(openSearchPage = false) {
        try {
          const apiKey = '4f9870dd7efed00d70817e86cdb90878';
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchQuery}`);
          this.searchResults = response.data.results;
          if (openSearchPage) {
            this.$router.push({ name: 'SearchPage', query: { term: this.searchQuery }, params: { searchResults: JSON.stringify(this.searchResults) } });
          }
        } catch (error) {
          console.error('Error performing search:', error);
        }
      },
      // Handles actions on keypress in search field
      handleSearchKeyUp(e) {
        if (e.key === "Enter") {
          // If enter is pressed go to search page
          this.performSearch(true);
          // Hide autocomplete
          this.autocompleteVisible = false;
        } else {
          this.performSearch();
          this.autocompleteVisible = true;
        }
      },
      // Prepares and returns Movie poster image url
      getMoviePosterUrl(posterPath) {
        if (!posterPath) {
          return window.location.origin + '/src/assets/images/movie-poster-placeholder.png';
        }
        return `https://image.tmdb.org/t/p/w92/${posterPath}`;
      },
      showAutocomplete() {
        this.autocompleteVisible = true;
      },
    },
  };
</script>
  
<style scoped lang="scss">
@import '../assets/styles/common/colors.scss';
@import '../assets/styles/common/variables.scss';
@import '../assets/styles/common/mixins.scss';

.top-container {
    display: flex;
    justify-content: space-between;

    &__search-container {
        width: 50%;
        display: flex;
        align-items: center;
        position: relative;
        
        &__input {
            display: flex;
            align-items: center;
            padding: 10px 10px 10px 40px;
            background: $color-beige;
            border: 1px solid $color-dark-brown;
        }

        &__button {
            padding-left: 12px;
            background-color: inherit;
            border: none;
            cursor: pointer;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);

            &__icon {
                width: 15px;
                height: 15px;
            }
        }

        &__autocomplete {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            border: 1px solid $color-dark-brown;
            background-color: #f6f5f5;
            z-index: 1;
            max-height: 40vh;
            max-width: 500px;
            overflow-y: auto;

            a {
                text-decoration: none;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: $color-beige;
            }

            &__item {
                display: flex;
                padding: 8px;
                cursor: pointer;
                transition: background-color 0.3s;
                border-bottom: 1px solid $color-beige;

                &:hover {
                    background-color: $color-beige;
                }

                &__image {
                    width: 20%;
                    height: auto; 
                    margin-right: 8px;
                    border-radius: 4px;
                }

                &__details {
                    flex: 1;

                    &__title {
                        font-weight: bold;
                        font-size: 18px;
                        color: $color-dark-brown;
                        margin-top: 24px;
                    }
                }
            }
        }
    }

    &__right-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        max-width: 160px;

        &__divider {
            height: 20px;
            width: 1px;
            background: $color-dark-brown;
        }

        &__option {
            margin: 0;
            font-size: 18px;
            cursor: pointer;
            text-decoration: underline;
            text-decoration-color: transparent;
            transition: all .2s ease-in-out;

            &:hover {
                text-decoration-color: $color-dark-brown;
            }
        }
    }

    @include respondBetween(0, 600px) {
        &__search-container {
            width: 58%;

            &__input {
                max-width: 100%;
            }

            &__autocomplete {
                &__item {
                    &__details {
                        &__title {
                        font-size: 14px;
                        }
                    }
                }
            }
        }

        &__right-nav {
            width: 32%;
            gap: 4px;

            &__option {
                font-size: 14px;
            }
        }
    }
}
</style>
  