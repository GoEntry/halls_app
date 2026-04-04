<template>
  <DashboardCard @click="$emit('click')">
    <div class="next-training">
      <p class="next-training__title">следующая<br/>тренировка</p>
      <div class="next-training__datetime">
        <div class="next-training__date">
          <div class="next-training__day">{{ day }}</div>
          <div class="next-training__month">{{ month }}</div>
        </div>
        <div class="next-training__time">
          <p class="next-training__time-text">{{ hours }}<br/>{{ minutes }}</p>
          <img class="next-training__divider" src="/assets/12846dc73fe8737bea0ba8acac6f6006.svg" alt="" />
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup>
import DashboardCard from '../ui/DashboardCard.vue';

defineProps({
  day: { type: [String, Number], default: '25' },
  month: { type: String, default: 'декабря' },
  hours: { type: String, default: '17' },
  minutes: { type: String, default: '00' }
});

defineEmits(['click']);
</script>

<style scoped lang="scss">
.next-training {
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 30px 35px;
  height: 100%;

  &__title {
    font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 28px;
    line-height: 1.2;
    color: var(--text-primary);
    margin: 0;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 575px) {
      font-size: 22px;
    }
  }

  &__datetime {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 25px;
    flex: 1;
  }

  &__date {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  &__day {
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 90px;
    line-height: 1;
    color: var(--text-primary);
    text-align: center;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 72px;
    }

    @media (max-width: 575px) {
      font-size: 64px;
    }
  }

  &__month {
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 32px;
    line-height: 1.2;
    color: var(--text-primary);
    text-align: center;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 575px) {
      font-size: 24px;
    }
  }

  &__time {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
  }

  &__time-text {
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 90px;
    line-height: 1;
    color: var(--text-primary);
    text-align: center;
    margin: 0;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 72px;
    }

    @media (max-width: 575px) {
      font-size: 64px;
    }
  }

  &__divider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 4px;
  }
}
</style>
