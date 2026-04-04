<template>
  <div class="dashboard">
    <main class="dashboard__layout">
      <section class="dashboard__column">
        <NextTrainingCard @click="modals.nextTraining = true" />
        <WeightGoalCard :weight="weightGoal.weight" @click="modals.weightGoal = true" />
      </section>

      <LastTrainingCard :training="lastTraining" @click="modals.lastTraining = true" />

      <section class="dashboard__column">
        <AddTrainingCard @click="modals.addTraining = true" />
        <TrainingLogCard @click="modals.trainingLog = true" />
      </section>

      <div class="dashboard__actions">
        <div class="dashboard__actions-inner">
          <img 
            class="dashboard__action-icon" 
            src="/assets/15a4a024ce8a1adbb5084269305518c9.svg" 
            alt="Тренировки" 
            @click="modals.nextTraining = true" 
          />
          <img 
            class="dashboard__action-icon" 
            src="/assets/99b61546705c23a6304528e7b7332781.svg" 
            alt="Видео" 
            @click="modals.videos = true" 
          />
          <img 
            class="dashboard__action-icon" 
            src="/assets/7f63fbbb7cc3a03652d0b3fe30352183.svg" 
            alt="Питание" 
            @click="modals.diets = true" 
          />
        </div>
      </div>
    </main>

    <!-- Modals -->
    <NextTrainingModal v-model="modals.nextTraining" />
    <WeightGoalModal 
      v-model="modals.weightGoal" 
      :weight="weightGoal.weight"
      :completion-date="weightGoal.completionDate"
      @save="handleWeightGoalSave" 
    />
    <LastTrainingModal 
      v-model="modals.lastTraining" 
      :training="lastTraining" 
    />
    <AddTrainingModal 
      v-model="modals.addTraining" 
      @add="handleAddTraining" 
    />
    <TrainingLogModal 
      v-model="modals.trainingLog" 
      :trainings="trainingLog" 
    />
    <VideosModal v-model="modals.videos" />
    <DietsModal v-model="modals.diets" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

import NextTrainingCard from './dashboard/NextTrainingCard.vue';
import WeightGoalCard from './dashboard/WeightGoalCard.vue';
import LastTrainingCard from './dashboard/LastTrainingCard.vue';
import AddTrainingCard from './dashboard/AddTrainingCard.vue';
import TrainingLogCard from './dashboard/TrainingLogCard.vue';

import NextTrainingModal from './modals/NextTrainingModal.vue';
import WeightGoalModal from './modals/WeightGoalModal.vue';
import LastTrainingModal from './modals/LastTrainingModal.vue';
import AddTrainingModal from './modals/AddTrainingModal.vue';
import TrainingLogModal from './modals/TrainingLogModal.vue';
import VideosModal from './modals/VideosModal.vue';
import DietsModal from './modals/DietsModal.vue';

const modals = reactive({
  nextTraining: false,
  weightGoal: false,
  lastTraining: false,
  addTraining: false,
  trainingLog: false,
  videos: false,
  diets: false
});

const weightGoal = useLocalStorage('weightGoal', {
  weight: 50,
  completionDate: ''
});

const trainingLog = useLocalStorage('trainingLog', [
  { type: 'Бег', distance: 5, pulse: 120, kcal: 300 },
  { type: 'Велосипед', distance: 10, pulse: 110, kcal: 400 },
  { type: 'Плавание', distance: 2, pulse: 130, kcal: 250 },
  { type: 'Йога', distance: 0, pulse: 80, kcal: 200 }
]);

const lastTraining = ref({
  time: '30:00',
  type: 'Бег',
  distance: 5,
  kcal: 300,
  pulse: 120,
  averagePace: 6
});

const handleWeightGoalSave = ({ weight, completionDate }) => {
  weightGoal.value = { weight, completionDate };
};

const handleAddTraining = (training) => {
  trainingLog.value.push(training);
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    Object.keys(modals).forEach(key => modals[key] = false);
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  background: linear-gradient(118deg, #87e0cb 7.92%, #c6e088 90.54%);
  overflow-x: hidden;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__layout {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
    max-width: 1600px;
    margin: 110px auto;
    padding: 0 40px;

    @media (max-width: 991px) {
      margin: 50px auto;
      padding: 0 20px;
    }

    @media (max-width: 575px) {
      padding: 0 15px;
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
    background-color: rgba(255, 255, 255, 0.631);
    border-radius: 29px;
    flex-shrink: 0;
    align-self: stretch;

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
    transition: transform 0.3s ease;
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
</style>
