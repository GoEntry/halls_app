<template>
  <DashboardCard @click="$emit('click')">
    <div class="last-training">
      <p class="last-training__title">Последняя<br/>тренировка</p>
      <div class="last-training__metrics">
        <p>Расстояние: {{ training.distance }} км</p>
        <p>Ккалл: {{ training.kcal }}</p>
        <p>Пульс: {{ training.pulse }} у/м</p>
      </div>
      <div class="last-training__indicator"></div>
      <img class="last-training__graph" src="/assets/ec6e34c30518a88257c0d143e3b59ef6.png" alt="" />
    </div>
  </DashboardCard>
</template>

<script setup>
import DashboardCard from '../ui/DashboardCard.vue';

defineProps({
  training: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped lang="scss">
.last-training {
  padding: 30px 35px 40px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 28px;
    line-height: 1.2;
    color: var(--text-primary);
    margin: 0 0 25px 0;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 575px) {
      font-size: 22px;
    }
  }

  &__metrics {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    p {
      font-family: "Brotesk", Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 22px;
      line-height: 1.4;
      color: var(--text-primary);
      margin: 0;
      transition: color 0.3s ease;

      @media (max-width: 768px) {
        font-size: 20px;
      }

      @media (max-width: 575px) {
        font-size: 18px;
      }

      &:not(:first-child) {
        padding-left: 50px;

        @media (max-width: 575px) {
          padding-left: 30px;
        }
      }
    }
  }

  &__indicator {
    min-height: 6px;
    background-color: rgba(94, 94, 94, 0.5);
    border-radius: 3px;
    margin-bottom: 25px;
  }

  &__graph {
    width: 100%;
    max-width: 100%;
    border-radius: 20px;
    object-fit: cover;
    display: block;
    flex: 1;

    @media (max-width: 991px) {
      max-width: 60%;
      margin: 0 auto;
    }
  }
}
</style>
