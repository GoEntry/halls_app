<template>
  <div class="training-form-page">
    <div class="training-form-page__container">
      <h1>{{ isEdit ? 'Редактировать тренировку' : 'Добавить тренировку' }}</h1>
      
      <form @submit.prevent="handleSubmit" class="training-form">
        <div class="form-group">
          <label for="type">Тип тренировки *</label>
          <select id="type" v-model="form.type" required>
            <option value="">Выберите тип</option>
            <option value="Бег">Бег</option>
            <option value="Велосипед">Велосипед</option>
            <option value="Плавание">Плавание</option>
            <option value="Йога">Йога</option>
            <option value="Силовая">Силовая тренировка</option>
            <option value="Кардио">Кардио</option>
            <option value="Растяжка">Растяжка</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="date">Дата тренировки *</label>
            <input type="date" id="date" v-model="form.date" required />
          </div>

          <div class="form-group">
            <label for="duration">Длительность (мин) *</label>
            <input type="number" id="duration" v-model.number="form.duration" min="1" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="distance">Расстояние (км)</label>
            <input type="number" id="distance" v-model.number="form.distance" step="0.1" min="0" />
          </div>

          <div class="form-group">
            <label for="pulse">Средний пульс (уд/мин)</label>
            <input type="number" id="pulse" v-model.number="form.pulse" min="0" />
          </div>
        </div>

        <div class="form-group">
          <label for="notes">Заметки</label>
          <textarea id="notes" v-model="form.notes" rows="4" placeholder="Как прошла тренировка, самочувствие..."></textarea>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.autoCalories" />
            Рассчитать калории автоматически
          </label>
        </div>

        <div class="form-group" v-if="!form.autoCalories">
          <label for="kcal">Калории (ккал)</label>
          <input type="number" id="kcal" v-model.number="form.kcal" min="0" />
        </div>

        <div class="calculated-info" v-if="form.autoCalories && calculatedCalories">
          <p>Расчетные калории: <strong>{{ calculatedCalories }} ккал</strong></p>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$router.back()">
            Отмена
          </button>
          <button type="submit" class="btn-primary">
            {{ isEdit ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocalStorage } from '@/composables/useLocalStorage';

const router = useRouter();
const route = useRoute();

const trainingLog = useLocalStorage('trainingLog', []);

const isEdit = computed(() => route.params.id !== undefined && route.params.id !== 'new');

const form = ref({
  type: '',
  date: new Date().toISOString().split('T')[0],
  duration: 30,
  distance: 0,
  pulse: 0,
  kcal: 0,
  notes: '',
  autoCalories: true
});

const calculatedCalories = computed(() => {
  if (!form.value.autoCalories) return 0;
  
  // Простая формула расчета калорий
  const baseCalories = form.value.duration * 5; // 5 ккал/мин базовая
  const distanceBonus = form.value.distance * 50; // 50 ккал/км
  const pulseMultiplier = form.value.pulse > 0 ? form.value.pulse / 100 : 1;
  
  return Math.round((baseCalories + distanceBonus) * pulseMultiplier);
});

onMounted(() => {
  if (isEdit.value) {
    const index = parseInt(route.params.id);
    const training = trainingLog.value[index];
    if (training) {
      form.value = {
        ...training,
        date: training.date ? new Date(training.date).toISOString().split('T')[0] : form.value.date,
        autoCalories: false
      };
    }
  }
});

const handleSubmit = () => {
  const trainingData = {
    ...form.value,
    date: new Date(form.value.date),
    kcal: form.value.autoCalories ? calculatedCalories.value : form.value.kcal
  };

  if (isEdit.value) {
    const index = parseInt(route.params.id);
    trainingLog.value[index] = trainingData;
  } else {
    trainingLog.value.unshift(trainingData);
  }

  router.push('/trainings');
};
</script>

<style scoped lang="scss">
.training-form-page {
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__container {
    max-width: 800px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 40px;
    border-radius: 20px;

    @media (max-width: 768px) {
      padding: 30px 20px;
    }

    h1 {
      font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-style: italic;
      font-size: 32px;
      color: #000;
      margin: 0 0 30px 0;

      @media (max-width: 768px) {
        font-size: 28px;
      }
    }
  }
}

.training-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    font-size: 16px;
    color: #333;

    input[type="checkbox"] {
      margin-right: 8px;
    }
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  select,
  textarea {
    padding: 12px 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-size: 16px;
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: #87e0cb;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.calculated-info {
  padding: 15px;
  background-color: rgba(135, 224, 203, 0.2);
  border-radius: 12px;
  text-align: center;

  p {
    margin: 0;
    font-size: 18px;
    color: #333;

    strong {
      font-size: 24px;
      color: #000;
    }
  }
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
}

.btn-primary,
.btn-secondary {
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.btn-primary {
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #d0d0d0;
  }
}
</style>
