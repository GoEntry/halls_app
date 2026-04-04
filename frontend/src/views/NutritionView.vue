<template>
  <div class="nutrition-page">
    <div class="nutrition-page__header">
      <h1>Журнал питания</h1>
      <button class="btn-primary" @click="showAddMeal = true">
        Добавить прием пищи
      </button>
    </div>

    <div class="nutrition-page__summary">
      <div class="summary-card">
        <h3>Сегодня</h3>
        <p class="summary-date">{{ formatDate(new Date()) }}</p>
      </div>
      <div class="summary-card">
        <h3>Калории</h3>
        <p class="summary-value">{{ todayCalories }} / {{ dailyGoal }}</p>
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: caloriesProgress + '%' }"></div>
        </div>
      </div>
      <div class="summary-card">
        <h3>Белки</h3>
        <p class="summary-value">{{ todayProtein }} г</p>
      </div>
      <div class="summary-card">
        <h3>Жиры</h3>
        <p class="summary-value">{{ todayFats }} г</p>
      </div>
      <div class="summary-card">
        <h3>Углеводы</h3>
        <p class="summary-value">{{ todayCarbs }} г</p>
      </div>
    </div>

    <div class="nutrition-page__meals">
      <h2>Приемы пищи</h2>
      
      <div v-for="(meal, index) in todayMeals" :key="index" class="meal-card">
        <div class="meal-card__header">
          <div>
            <h3>{{ meal.name }}</h3>
            <span class="meal-card__time">{{ meal.time }}</span>
          </div>
          <button class="btn-delete" @click="deleteMeal(index)">Удалить</button>
        </div>
        <div class="meal-card__nutrition">
          <span>{{ meal.calories }} ккал</span>
          <span>Б: {{ meal.protein }}г</span>
          <span>Ж: {{ meal.fats }}г</span>
          <span>У: {{ meal.carbs }}г</span>
        </div>
        <p class="meal-card__description" v-if="meal.description">{{ meal.description }}</p>
      </div>

      <div v-if="todayMeals.length === 0" class="empty-state">
        <p>Сегодня еще не было приемов пищи</p>
        <button class="btn-primary" @click="showAddMeal = true">
          Добавить первый прием пищи
        </button>
      </div>
    </div>

    <!-- Диеты -->
    <div class="nutrition-page__diets">
      <h2>Готовые планы питания</h2>
      <div class="diet-cards">
        <div v-for="diet in diets" :key="diet.calories" class="diet-card" @click="applyDiet(diet)">
          <h3>{{ diet.calories }} ккал</h3>
          <p>{{ diet.description }}</p>
          <button class="btn-secondary">Применить</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления приема пищи -->
    <Transition name="modal">
      <div v-if="showAddMeal" class="modal" @click.self="showAddMeal = false">
        <div class="modal__content">
          <button class="modal__close" @click="showAddMeal = false">&times;</button>
          <h2>Добавить прием пищи</h2>
          
          <form @submit.prevent="addMeal" class="meal-form">
            <div class="form-group">
              <label for="mealName">Название *</label>
              <input type="text" id="mealName" v-model="newMeal.name" required placeholder="Завтрак, Обед, Ужин..." />
            </div>

            <div class="form-group">
              <label for="mealTime">Время *</label>
              <input type="time" id="mealTime" v-model="newMeal.time" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="calories">Калории (ккал) *</label>
                <input type="number" id="calories" v-model.number="newMeal.calories" required min="0" />
              </div>
              <div class="form-group">
                <label for="protein">Белки (г)</label>
                <input type="number" id="protein" v-model.number="newMeal.protein" min="0" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="fats">Жиры (г)</label>
                <input type="number" id="fats" v-model.number="newMeal.fats" min="0" />
              </div>
              <div class="form-group">
                <label for="carbs">Углеводы (г)</label>
                <input type="number" id="carbs" v-model.number="newMeal.carbs" min="0" />
              </div>
            </div>

            <div class="form-group">
              <label for="description">Описание</label>
              <textarea id="description" v-model="newMeal.description" rows="3" placeholder="Что входило в прием пищи..."></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showAddMeal = false">Отмена</button>
              <button type="submit" class="btn-primary">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const meals = useLocalStorage('meals', []);
const dailyGoal = ref(2000);

const showAddMeal = ref(false);

const newMeal = ref({
  name: '',
  time: '',
  calories: 0,
  protein: 0,
  fats: 0,
  carbs: 0,
  description: '',
  date: new Date()
});

const diets = [
  { calories: 2000, description: 'Завтрак - Овсянка, Обед - Курица с рисом, Ужин - Салат' },
  { calories: 3000, description: 'Завтрак - Омлет, Обед - Стейк с картофелем, Ужин - Паста' },
  { calories: 4000, description: 'Завтрак - Блины, Обед - Пицца, Ужин - Бургер' }
];

const todayMeals = computed(() => {
  const today = new Date().toDateString();
  return meals.value.filter(meal => new Date(meal.date).toDateString() === today);
});

const todayCalories = computed(() => {
  return todayMeals.value.reduce((sum, meal) => sum + meal.calories, 0);
});

const todayProtein = computed(() => {
  return todayMeals.value.reduce((sum, meal) => sum + meal.protein, 0);
});

const todayFats = computed(() => {
  return todayMeals.value.reduce((sum, meal) => sum + meal.fats, 0);
});

const todayCarbs = computed(() => {
  return todayMeals.value.reduce((sum, meal) => sum + meal.carbs, 0);
});

const caloriesProgress = computed(() => {
  return Math.min((todayCalories.value / dailyGoal.value) * 100, 100);
});

const formatDate = (date) => {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const addMeal = () => {
  meals.value.unshift({
    ...newMeal.value,
    date: new Date()
  });
  
  newMeal.value = {
    name: '',
    time: '',
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    description: '',
    date: new Date()
  };
  
  showAddMeal.value = false;
};

const deleteMeal = (index) => {
  if (confirm('Удалить этот прием пищи?')) {
    const mealIndex = meals.value.findIndex(m => todayMeals.value[index] === m);
    meals.value.splice(mealIndex, 1);
  }
};

const applyDiet = (diet) => {
  dailyGoal.value = diet.calories;
  alert(`План питания на ${diet.calories} ккал установлен как цель`);
};
</script>

<style scoped lang="scss">
.nutrition-page {
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

  &__summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  &__meals {
    margin-bottom: 40px;

    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  &__diets {
    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
}

.summary-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
  text-align: center;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin: 0 0 10px 0;
  }

  .summary-date {
    font-size: 16px;
    color: #333;
    margin: 0;
  }

  .summary-value {
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin: 0;
  }
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, #87e0cb, #c6e088);
    transition: width 0.3s ease;
  }
}

.meal-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;

    h3 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
  }

  &__time {
    font-size: 14px;
    color: #666;
  }

  &__nutrition {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 10px;

    span {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
  }

  &__description {
    font-size: 14px;
    color: #666;
    margin: 10px 0 0 0;
  }
}

.diet-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.diet-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0 0 15px 0;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__content {
    background-color: #fff;
    padding: 30px;
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 32px;
    background: none;
    border: none;
    cursor: pointer;
    color: #000;
  }

  h2 {
    margin: 0 0 20px 0;
    font-size: 24px;
  }
}

.meal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

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
  textarea {
    padding: 12px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #87e0cb;
    }
  }

  textarea {
    resize: vertical;
  }
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary,
.btn-delete {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
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

.btn-delete {
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  font-size: 12px;

  &:hover {
    background-color: #da190b;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
