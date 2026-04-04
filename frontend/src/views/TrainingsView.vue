<template>
  <div class="trainings-page">
    <div class="trainings-page__header">
      <h1>Журнал тренировок</h1>
      <button class="btn-primary" @click="$router.push('/trainings/new')">
        Добавить тренировку
      </button>
    </div>

    <div class="trainings-page__filters">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Поиск по типу тренировки..."
        class="filter-input"
      />
      <select v-model="filterType" class="filter-select">
        <option value="">Все типы</option>
        <option value="Бег">Бег</option>
        <option value="Велосипед">Велосипед</option>
        <option value="Плавание">Плавание</option>
        <option value="Йога">Йога</option>
        <option value="Силовая">Силовая</option>
      </select>
    </div>

    <div class="trainings-page__stats">
      <div class="stat-card">
        <h3>Всего тренировок</h3>
        <p class="stat-value">{{ trainingLog.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Общая дистанция</h3>
        <p class="stat-value">{{ totalDistance }} км</p>
      </div>
      <div class="stat-card">
        <h3>Сожжено калорий</h3>
        <p class="stat-value">{{ totalCalories }} ккал</p>
      </div>
    </div>

    <div class="trainings-page__list">
      <div 
        v-for="(training, index) in filteredTrainings" 
        :key="index" 
        class="training-card"
        @click="viewTraining(training, index)"
      >
        <div class="training-card__header">
          <h3>{{ training.type }}</h3>
          <span class="training-card__date">{{ formatDate(training.date) }}</span>
        </div>
        <div class="training-card__details">
          <div class="detail-item">
            <span class="label">Расстояние:</span>
            <span class="value">{{ training.distance }} км</span>
          </div>
          <div class="detail-item">
            <span class="label">Пульс:</span>
            <span class="value">{{ training.pulse }} уд/мин</span>
          </div>
          <div class="detail-item">
            <span class="label">Калории:</span>
            <span class="value">{{ training.kcal }} ккал</span>
          </div>
        </div>
        <button class="btn-delete" @click.stop="deleteTraining(index)">Удалить</button>
      </div>

      <div v-if="filteredTrainings.length === 0" class="empty-state">
        <p>Тренировок не найдено</p>
        <button class="btn-primary" @click="$router.push('/trainings/new')">
          Добавить первую тренировку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@/composables/useLocalStorage';

const router = useRouter();

const trainingLog = useLocalStorage('trainingLog', [
  { type: 'Бег', distance: 5, pulse: 120, kcal: 300, date: new Date('2024-03-20') },
  { type: 'Велосипед', distance: 10, pulse: 110, kcal: 400, date: new Date('2024-03-22') },
  { type: 'Плавание', distance: 2, pulse: 130, kcal: 250, date: new Date('2024-03-25') },
  { type: 'Йога', distance: 0, pulse: 80, kcal: 200, date: new Date('2024-03-28') }
]);

const searchQuery = ref('');
const filterType = ref('');

const filteredTrainings = computed(() => {
  return trainingLog.value.filter(training => {
    const matchesSearch = training.type.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = !filterType.value || training.type === filterType.value;
    return matchesSearch && matchesType;
  });
});

const totalDistance = computed(() => {
  return trainingLog.value.reduce((sum, t) => sum + t.distance, 0).toFixed(1);
});

const totalCalories = computed(() => {
  return trainingLog.value.reduce((sum, t) => sum + t.kcal, 0);
});

const formatDate = (date) => {
  if (!date) return 'Сегодня';
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const viewTraining = (training, index) => {
  router.push(`/trainings/${index}`);
};

const deleteTraining = (index) => {
  if (confirm('Вы уверены, что хотите удалить эту тренировку?')) {
    trainingLog.value.splice(index, 1);
  }
};
</script>

<style scoped lang="scss">
.trainings-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      align-items: stretch;
    }

    h1 {
      font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-style: italic;
      font-size: 36px;
      color: #000;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 28px;
      }
    }
  }

  &__filters {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.filter-input,
.filter-select {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #87e0cb;
  }
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 20px;
  text-align: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #666;
    margin: 0 0 10px 0;
  }

  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0;
  }
}

.training-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    h3 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
  }

  &__date {
    font-size: 14px;
    color: #666;
  }

  &__details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 15px;
  }
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;

  .label {
    font-size: 14px;
    color: #666;
  }

  .value {
    font-size: 18px;
    font-weight: 600;
    color: #000;
  }
}

.btn-primary {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
}

.btn-delete {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #da190b;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
}
</style>
