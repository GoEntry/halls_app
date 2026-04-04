<template>
  <div class="dashboard-view">
    <div class="dashboard">
      <main class="dashboard__layout">
        <section class="dashboard__column">
          <NextTrainingCard @click="$router.push('/trainings')" />
          <WeightGoalCard :weight="weightGoal.weight" @click="$router.push('/goals')" />
        </section>

        <LastTrainingCard :training="lastTraining" @click="$router.push('/trainings')" />

        <section class="dashboard__column">
          <AddTrainingCard @click="$router.push('/trainings/new')" />
          <TrainingLogCard @click="$router.push('/trainings')" />
        </section>

        <div class="dashboard__actions">
          <div class="dashboard__actions-inner">
            <img 
              class="dashboard__action-icon" 
              src="/assets/15a4a024ce8a1adbb5084269305518c9.svg" 
              alt="Тренировки" 
              @click="$router.push('/trainings')" 
            />
            <img 
              class="dashboard__action-icon" 
              src="/assets/99b61546705c23a6304528e7b7332781.svg" 
              alt="Видео" 
              @click="$router.push('/videos')" 
            />
            <img 
              class="dashboard__action-icon" 
              src="/assets/7f63fbbb7cc3a03652d0b3fe30352183.svg" 
              alt="Питание" 
              @click="$router.push('/nutrition')" 
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

import NextTrainingCard from '@/components/dashboard/NextTrainingCard.vue';
import WeightGoalCard from '@/components/dashboard/WeightGoalCard.vue';
import LastTrainingCard from '@/components/dashboard/LastTrainingCard.vue';
import AddTrainingCard from '@/components/dashboard/AddTrainingCard.vue';
import TrainingLogCard from '@/components/dashboard/TrainingLogCard.vue';

const weightGoal = useLocalStorage('weightGoal', {
  weight: 50,
  completionDate: ''
});

const lastTraining = ref({
  time: '30:00',
  type: 'Бег',
  distance: 5,
  kcal: 300,
  pulse: 120,
  averagePace: 6
});
</script>

<style scoped lang="scss">
.dashboard-view {
  min-height: calc(100vh - 80px);
  background: var(--bg-primary);
  transition: background 0.3s ease;
}

.dashboard {
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__layout {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
    max-width: 1600px;
    margin: 0 auto;
    padding: 60px 40px;

    @media (max-width: 991px) {
      padding: 40px 20px;
    }

    @media (max-width: 575px) {
      padding: 30px 15px;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 380px;
    flex-shrink: 0;

    @media (max-width: 1200px) {
      width: 340px;
    }

    @media (max-width: 1024px) {
      width: 100%;
      max-width: 500px;
    }
  }

  &__actions {
    width: 140px;
    background-color: var(--bg-card);
    border-radius: 29px;
    flex-shrink: 0;
    align-self: stretch;
    transition: background-color 0.3s ease;

    @media (max-width: 1024px) {
      width: 100%;
      max-width: 500px;
      align-self: auto;
    }
  }

  &__actions-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 20px;
    gap: 60px;
    height: 100%;

    @media (max-width: 1024px) {
      flex-direction: row;
      justify-content: space-evenly;
      padding: 30px 20px;
      gap: 20px;
      height: auto;
    }
  }

  &__action-icon {
    width: 90px;
    height: 90px;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease, filter 0.3s ease;
    object-fit: contain;

    &:hover {
      transform: translateY(-10px);
    }

    @media (max-width: 575px) {
      width: 70px;
      height: 70px;
    }
  }
}

[data-theme="dark"] {
  .dashboard__action-icon {
    filter: brightness(0.9);
  }
}
</style>
