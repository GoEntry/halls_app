<template>
  <div class="profile-page">
    <div class="profile-page__container">
      <h1>Профиль</h1>

      <div class="profile-card">
        <div class="profile-card__avatar">
          <div class="avatar-placeholder">
            {{ userInitials }}
          </div>
          <button class="btn-change-avatar">Изменить фото</button>
        </div>

        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-section">
            <h2>Личная информация</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Имя *</label>
                <input type="text" id="firstName" v-model="profile.firstName" required />
              </div>

              <div class="form-group">
                <label for="lastName">Фамилия *</label>
                <input type="text" id="lastName" v-model="profile.lastName" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" v-model="profile.email" required />
              </div>

              <div class="form-group">
                <label for="phone">Телефон</label>
                <input type="tel" id="phone" v-model="profile.phone" placeholder="+7 (___) ___-__-__" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="birthDate">Дата рождения</label>
                <input type="date" id="birthDate" v-model="profile.birthDate" />
              </div>

              <div class="form-group">
                <label for="gender">Пол</label>
                <select id="gender" v-model="profile.gender">
                  <option value="">Не указан</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2>Физические параметры</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="height">Рост (см)</label>
                <input type="number" id="height" v-model.number="profile.height" min="100" max="250" />
              </div>

              <div class="form-group">
                <label for="weight">Вес (кг)</label>
                <input type="number" id="weight" v-model.number="profile.weight" min="30" max="300" step="0.1" />
              </div>
            </div>

            <div class="calculated-bmi" v-if="bmi">
              <p>Индекс массы тела (ИМТ): <strong>{{ bmi }}</strong></p>
              <p class="bmi-category">{{ bmiCategory }}</p>
            </div>
          </div>

          <div class="form-section">
            <h2>Цели и предпочтения</h2>
            
            <div class="form-group">
              <label for="fitnessGoal">Основная цель</label>
              <select id="fitnessGoal" v-model="profile.fitnessGoal">
                <option value="">Не выбрана</option>
                <option value="lose-weight">Снижение веса</option>
                <option value="gain-muscle">Набор мышечной массы</option>
                <option value="maintain">Поддержание формы</option>
                <option value="endurance">Развитие выносливости</option>
                <option value="flexibility">Улучшение гибкости</option>
              </select>
            </div>

            <div class="form-group">
              <label for="activityLevel">Уровень активности</label>
              <select id="activityLevel" v-model="profile.activityLevel">
                <option value="sedentary">Сидячий образ жизни</option>
                <option value="light">Легкая активность (1-3 раза в неделю)</option>
                <option value="moderate">Умеренная активность (3-5 раз в неделю)</option>
                <option value="active">Высокая активность (6-7 раз в неделю)</option>
                <option value="very-active">Очень высокая активность (2 раза в день)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="preferredWorkouts">Предпочитаемые виды тренировок</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="running" />
                  Бег
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="cycling" />
                  Велосипед
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="swimming" />
                  Плавание
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="strength" />
                  Силовые
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="yoga" />
                  Йога
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="profile.preferredWorkouts" value="hiit" />
                  HIIT
                </label>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2>Статистика</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">Всего тренировок</span>
                <span class="stat-value">{{ totalWorkouts }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Дней с нами</span>
                <span class="stat-value">{{ daysWithUs }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Сожжено калорий</span>
                <span class="stat-value">{{ totalCalories }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Активных целей</span>
                <span class="stat-value">{{ activeGoalsCount }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="resetForm">
              Отменить
            </button>
            <button type="submit" class="btn-primary">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const profile = useLocalStorage('userProfile', {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: '',
  height: null,
  weight: null,
  fitnessGoal: '',
  activityLevel: 'moderate',
  preferredWorkouts: [],
  joinDate: new Date()
});

const trainingLog = useLocalStorage('trainingLog', []);
const goals = useLocalStorage('goals', []);

const userInitials = computed(() => {
  const first = profile.value.firstName?.[0] || '';
  const last = profile.value.lastName?.[0] || '';
  return (first + last).toUpperCase() || 'U';
});

const bmi = computed(() => {
  if (!profile.value.height || !profile.value.weight) return null;
  const heightInMeters = profile.value.height / 100;
  return (profile.value.weight / (heightInMeters * heightInMeters)).toFixed(1);
});

const bmiCategory = computed(() => {
  if (!bmi.value) return '';
  const value = parseFloat(bmi.value);
  
  if (value < 18.5) return 'Недостаточный вес';
  if (value < 25) return 'Нормальный вес';
  if (value < 30) return 'Избыточный вес';
  return 'Ожирение';
});

const totalWorkouts = computed(() => trainingLog.value.length);

const daysWithUs = computed(() => {
  const joinDate = new Date(profile.value.joinDate);
  const today = new Date();
  const diffTime = Math.abs(today - joinDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const totalCalories = computed(() => {
  return trainingLog.value.reduce((sum, t) => sum + (t.kcal || 0), 0);
});

const activeGoalsCount = computed(() => {
  return goals.value.filter(g => !g.completed).length;
});

const saveProfile = () => {
  alert('Профиль успешно сохранен!');
};

const resetForm = () => {
  if (confirm('Отменить все изменения?')) {
    location.reload();
  }
};

onMounted(() => {
  if (!profile.value.joinDate) {
    profile.value.joinDate = new Date();
  }
});
</script>

<style scoped lang="scss">
.profile-page {
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__container {
    max-width: 900px;
    margin: 0 auto;

    h1 {
      font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-style: italic;
      font-size: 36px;
      color: #000;
      margin: 0 0 30px 0;

      @media (max-width: 768px) {
        font-size: 28px;
      }
    }
  }
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  &__avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
  }
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #87e0cb, #c6e088);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: white;
}

.btn-change-avatar {
  padding: 8px 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.form-section {
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 20px 0;
    color: #000;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

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
    font-size: 14px;
    color: #333;
  }

  input,
  select {
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
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.calculated-bmi {
  padding: 20px;
  background-color: rgba(135, 224, 203, 0.2);
  border-radius: 12px;
  margin-top: 15px;

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #333;

    strong {
      font-size: 20px;
      color: #000;
    }
  }

  .bmi-category {
    font-weight: 600;
    color: #2e7d32;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background-color: rgba(135, 224, 203, 0.15);
  border-radius: 12px;
  text-align: center;

  .stat-label {
    font-size: 14px;
    color: #666;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #000;
  }
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);

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
