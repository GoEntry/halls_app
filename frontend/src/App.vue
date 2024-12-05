<script setup>
import { useRoute, RouterView } from 'vue-router';
import { watch } from "vue";

const route = useRoute();

watch(
    route,
    async () => {
    }
);

</script>

<template>
  <RouterView/>
</template>

