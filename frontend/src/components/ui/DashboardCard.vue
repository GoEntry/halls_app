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
  background-color: rgba(255, 255, 255, 0.631);
  border-radius: 29px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
}
</style>
