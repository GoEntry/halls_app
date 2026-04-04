<template>
  <DashboardCard @click="$emit('click')">
    <div class="add-training">
      <p class="add-training__text">добавить<br/>тренировку</p>
      <img class="add-training__icon" src="/assets/89ca88becca1db089b9b2cacf4d7cd38.png" alt="" />
    </div>
  </DashboardCard>
</template>

<script setup>
import DashboardCard from '../ui/DashboardCard.vue';

defineEmits(['click']);
</script>

<style scoped lang="scss">
.add-training {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 30px 35px;
  height: 100%;

  &__text {
    font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 36px;
    line-height: 1.2;
    color: #000;
    margin: 0;
    width: 100%;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 32px;
    }

    @media (max-width: 575px) {
      font-size: 28px;
    }
  }

  &__icon {
    width: 120px;
    height: 120px;
    object-fit: contain;

    @media (max-width: 575px) {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
