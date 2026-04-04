<template>
  <div class="goals-page">
    <div class="goals-page__header">
      <h1>Цели и прогресс</h1>
      <button class="btn-primary" @click="showAddGoal = true">
        Добавить цель
      </button>
    </div>

    <div class="goals-page__current">
      <h2>Текущие цели</h2>
      <div class="goals-grid">
        <div v-for="(goal, index) in activeGoals" :key="index" class="goal-card">
          <div class="goal-card__header">
            <h3>{{ goal.title }}</h3>
            <button class="btn-icon" @click="deleteGoal(index)">×</button>
          </div>
          <p class="goal-card__description">{{ goal.description }}</p>
          
          <div class="goal-card__progress">
            <div class="progress-info">
              <span>{{ goal.current }} / {{ goal.target }} {{ goal.unit }}</span>
              <span>{{ calculateProgress(goal) }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill" :style="{ width: calculateProgress(goal) + '%' }"></div>
            </div>
          </div>

          <div class="goal-card__meta">
            <span class="goal-card__deadline">До: {{ formatDate(goal.deadline) }}</span>
            <span :class="['goal-card__status', getStatusClass(goal)]">
              {{ getStatusText(goal) }}
            </span>
          </div>

          <button class="btn-update" @click="updateProgress(goal, index)">
            Обновить прогресс
          </button>
        </div>
      </div>

      <div v-if="activeGoals.length === 0" class="empty-state">
        <p>У вас пока нет активных целей</p>
        <button class="btn-primary" @click="showAddGoal = true">
          Создать первую цель
        </button>
      </div>
    </div>

    <div class="goals-page__completed" v-if="completedGoals.length > 0">
      <h2>Достигнутые цели</h2>
      <div class="completed-list">
        <div v-for="(goal, index) in completedGoals" :key="index" class="completed-item">
          <div class="completed-item__icon">✓</div>
          <div class="completed-item__content">
            <h4>{{ goal.title }}</h4>
            <p>Достигнуто: {{ formatDate(goal.completedDate) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления цели -->
    <Transition name="modal">
      <div v-if="showAddGoal" class="modal" @click.self="showAddGoal = false">
        <div class="modal__content">
          <button class="modal__close" @click="showAddGoal = false">&times;</button>
          <h2>Добавить новую цель</h2>
          
          <form @submit.prevent="addGoal" class="goal-form">
            <div class="form-group">
              <label for="goalTitle">Название цели *</label>
              <input type="text" id="goalTitle" v-model="newGoal.title" required placeholder="Например: Сбросить вес" />
            </div>

            <div class="form-group">
              <label for="goalDescription">Описание</label>
              <textarea id="goalDescription" v-model="newGoal.description" rows="3" placeholder="Подробности о цели..."></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="current">Текущее значение *</label>
                <input type="number" id="current" v-model.number="newGoal.current" required step="0.1" />
              </div>

              <div class="form-group">
                <label for="target">Целевое значение *</label>
                <input type="number" id="target" v-model.number="newGoal.target" required step="0.1" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="unit">Единица измерения *</label>
                <select id="unit" v-model="newGoal.unit" required>
                  <option value="кг">кг (вес)</option>
                  <option value="км">км (дистанция)</option>
                  <option value="раз">раз (повторения)</option>
                  <option value="мин">мин (время)</option>
                  <option value="ккал">ккал (калории)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="deadline">Срок достижения *</label>
                <input type="date" id="deadline" v-model="newGoal.deadline" required />
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showAddGoal = false">Отмена</button>
              <button type="submit" class="btn-primary">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Модальное окно обновления прогресса -->
    <Transition name="modal">
      <div v-if="showUpdateProgress" class="modal" @click.self="showUpdateProgress = false">
        <div class="modal__content">
          <button class="modal__close" @click="showUpdateProgress = false">&times;</button>
          <h2>Обновить прогресс</h2>
          
          <form @submit.prevent="saveProgress" class="progress-form">
            <div class="form-group">
              <label for="newValue">Новое значение ({{ editingGoal?.unit }})</label>
              <input type="number" id="newValue" v-model.number="newProgressValue" step="0.1" required />
            </div>

            <div class="current-progress">
              <p>Текущий прогресс: <strong>{{ editingGoal?.current }} {{ editingGoal?.unit }}</strong></p>
              <p>Цель: <strong>{{ editingGoal?.target }} {{ editingGoal?.unit }}</strong></p>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showUpdateProgress = false">Отмена</button>
              <button type="submit" class="btn-primary">Сохранить</button>
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

const goals = useLocalStorage('goals', []);

const showAddGoal = ref(false);
const showUpdateProgress = ref(false);
const editingGoal = ref(null);
const editingIndex = ref(-1);
const newProgressValue = ref(0);

const newGoal = ref({
  title: '',
  description: '',
  current: 0,
  target: 100,
  unit: 'кг',
  deadline: '',
  createdDate: new Date(),
  completed: false
});

const activeGoals = computed(() => {
  return goals.value.filter(goal => !goal.completed);
});

const completedGoals = computed(() => {
  return goals.value.filter(goal => goal.completed);
});

const calculateProgress = (goal) => {
  if (goal.target === 0) return 0;
  const progress = (goal.current / goal.target) * 100;
  return Math.min(Math.round(progress), 100);
};

const getStatusClass = (goal) => {
  const progress = calculateProgress(goal);
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  if (progress >= 100) return 'completed';
  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 7) return 'urgent';
  return 'on-track';
};

const getStatusText = (goal) => {
  const progress = calculateProgress(goal);
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  if (progress >= 100) return 'Достигнута';
  if (daysLeft < 0) return 'Просрочена';
  if (daysLeft <= 7) return `Осталось ${daysLeft} дн.`;
  return 'В процессе';
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const addGoal = () => {
  goals.value.push({
    ...newGoal.value,
    createdDate: new Date(),
    completed: false
  });
  
  newGoal.value = {
    title: '',
    description: '',
    current: 0,
    target: 100,
    unit: 'кг',
    deadline: '',
    createdDate: new Date(),
    completed: false
  };
  
  showAddGoal.value = false;
};

const updateProgress = (goal, index) => {
  editingGoal.value = goal;
  editingIndex.value = index;
  newProgressValue.value = goal.current;
  showUpdateProgress.value = true;
};

const saveProgress = () => {
  if (editingIndex.value >= 0) {
    goals.value[editingIndex.value].current = newProgressValue.value;
    
    // Проверяем, достигнута ли цель
    if (newProgressValue.value >= goals.value[editingIndex.value].target) {
      goals.value[editingIndex.value].completed = true;
      goals.value[editingIndex.value].completedDate = new Date();
    }
  }
  
  showUpdateProgress.value = false;
  editingGoal.value = null;
  editingIndex.value = -1;
};

const deleteGoal = (index) => {
  if (confirm('Удалить эту цель?')) {
    goals.value.splice(index, 1);
  }
};
</script>

<style scoped lang="scss">
.goals-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

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

  &__current,
  &__completed {
    margin-bottom: 50px;

    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 25px;
    }
  }
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.goal-card {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      flex: 1;
    }
  }

  &__description {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  &__progress {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  &__deadline {
    color: #666;
  }

  &__status {
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 12px;

    &.completed {
      background-color: rgba(76, 175, 80, 0.2);
      color: #2e7d32;
    }

    &.on-track {
      background-color: rgba(33, 150, 243, 0.2);
      color: #1565c0;
    }

    &.urgent {
      background-color: rgba(255, 152, 0, 0.2);
      color: #e65100;
    }

    &.overdue {
      background-color: rgba(244, 67, 54, 0.2);
      color: #c62828;
    }
  }
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, #87e0cb, #c6e088);
    transition: width 0.3s ease;
  }
}

.btn-icon {
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336;
  }
}

.btn-update {
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976D2;
  }
}

.completed-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.completed-item {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  gap: 15px;
  align-items: center;

  &__icon {
    width: 40px;
    height: 40px;
    background-color: rgba(76, 175, 80, 0.2);
    color: #2e7d32;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;

    h4 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 5px 0;
    }

    p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
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

.goal-form,
.progress-form {
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
  select,
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

.current-progress {
  padding: 15px;
  background-color: rgba(135, 224, 203, 0.2);
  border-radius: 12px;

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #333;

    strong {
      color: #000;
    }
  }
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
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
