<template>
  <DashboardCard @click="$emit('click')" class="training-log-card">
    <p class="training-log">журнал<br/>тренировок</p>
  </DashboardCard>
</template>

<script setup>
import DashboardCard from '../ui/DashboardCard.vue';

defineEmits(['click']);
</script>

<style scoped lang="scss">
.training-log-card {
  flex: 1;
  display: flex;
}

.training-log {
  font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: 36px;
  line-height: 1.2;
  color: #000;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 35px;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    font-size: 32px;
    padding: 35px 30px;
  }

  @media (max-width: 575px) {
    font-size: 28px;
    padding: 30px 25px;
  }
}
</style>
