<!-- StarRating.vue -->

<template>
  <div class="star-rating">
    <span v-for="(star, index) in stars" :key="index">
      <span :class="{ 'fas': star, 'far': !star }">&#9733;</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    max: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      stars: [],
    };
  },
  watch: {
    value(newValue) {
      this.updateStars(newValue);
    },
  },
  mounted() {
    this.updateStars(this.value);
  },
  methods: {
    updateStars(value) {
      const normalizedValue = Math.min(this.max, Math.max(0, Math.round(value)));
      this.stars = Array(this.max).fill(false).map((_, index) => index < normalizedValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/common/colors.scss';

.star-rating {
  display: inline-block;
  font-size: 1.5em;
  background: $color-dark-brown;
  padding: 0 8px;
  border-radius: 4px;
}

.star-rating span {
  color: $color-yellow; 
}

.star-rating span.fas {
  color: $color-yellow;
}

.star-rating span.far {
  color: $color-beige;
}
</style>
