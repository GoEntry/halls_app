<template>
  <article class="card" @click="$emit('click')">
    <slot />
  </article>
</template>

<script setup>
defineEmits(['click']);
</script>

<style scoped lang="scss">
.card {
  background-color: var(--bg-card);
  border-radius: 29px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 20px var(--shadow-color);
  }
}
</style>
