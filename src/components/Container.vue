<!-- Container.vue -->
<template>
    <div class="c-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style scoped lang="scss">
@import '../assets/styles/common/mixins.scss';
    .c-container {
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        padding: 0 64px;

        @include respondBetween(0, 860px) {
            padding: 0 32px;
        }
    }
</style>