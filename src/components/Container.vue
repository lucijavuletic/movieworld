<!-- Container.vue -->
<template>
    <div class="c-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Container',
  // Other component options can be added here
};
</script>

<style scoped>
    .c-container {
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        padding: 0 64px;
    }
</style>