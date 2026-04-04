<template>
  <DashboardCard @click="$emit('click')">
    <div class="weight-goal">
      <p class="weight-goal__title">цель по<br/>весу</p>
      <p class="weight-goal__value">{{ weight }} кг</p>
    </div>
  </DashboardCard>
</template>

<script setup>
import DashboardCard from '../ui/DashboardCard.vue';

defineProps({
  weight: { type: Number, required: true }
});

defineEmits(['click']);
</script>

<style scoped lang="scss">
.weight-goal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 30px 35px;
  height: 100%;

  &__title {
    font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 28px;
    line-height: 1.2;
    color: #000;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 575px) {
      font-size: 22px;
    }
  }

  &__value {
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 70px;
    line-height: 1.2;
    color: #000;
    text-align: right;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 60px;
    }

    @media (max-width: 575px) {
      font-size: 50px;
    }
  }
}
</style>
