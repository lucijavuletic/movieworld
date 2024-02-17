<template>
    <div @click="toggleHeart" :class="{ 'heart-filled': isHeartFilled }">
        <svg id="Layer_1" width=80 height=80 data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.39"><defs></defs><title>red-heart</title><path class="cls-1" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"/></svg>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        isHeartFilled: false,
      };
    },
    methods: {
      toggleHeart() {
        this.isHeartFilled = !this.isHeartFilled;
      },
    },
  };
</script>
  
<style scoped lang="scss">
  @import '../assets/styles/common/colors.scss';
  .heart-filled path {
    fill: $color-red;
    cursor: pointer;
  }

  svg {
    max-width: 100%;
    height: auto;
    overflow: visible;

    path {
        fill: transparent;
        stroke-width: 14px;
        stroke: $color-red;
        transition: all .25s ease-in-out;
    }
  }
</style>
  