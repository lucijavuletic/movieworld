<!-- Button.vue -->
<template>
    <button class="c-button" @click="clickHandler" :disabled="isDisabled">
      {{ buttonText }}
    </button>
</template>
  
<script>
  export default {
    props: {
      clickHandler: Function,
      isDisabled: Boolean,
      buttonText: String,
    },
  };
</script>
  
<style lang="scss">
  @import '../assets/styles/common/colors.scss';
  @import '../assets/styles/common/mixins.scss';
  
  .c-button {
    padding: 20px 32px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
    outline: none;
    border: none;
    border-radius: 16px;
    background-color: $color-dark-brown;
    color: $color-white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  
    &:hover {
      background-color: rgba(50, 50, 50, 0.8);
    }
  
    &:active {
      opacity: 0.8;
    }
  
    @include respondBetween(0, 860px) {
      font-size: 14px;
      padding: 16px 24px;
      border-radius: 12px;
    }
  }
</style>
  