<template>
  <BaseModal v-model="isOpen">
    <h2>Выбор диеты</h2>
    <ul class="diet-list">
      <li v-for="(diet, index) in diets" :key="index" class="diet-item">
        <strong>{{ diet.calories }} ккал:</strong> {{ diet.description }}
      </li>
    </ul>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const diets = [
  { calories: 2000, description: 'Завтрак - Овсянка, Обед - Курица с рисом, Ужин - Салат' },
  { calories: 3000, description: 'Завтрак - Омлет, Обед - Стейк с картофелем, Ужин - Паста' },
  { calories: 4000, description: 'Завтрак - Блины, Обед - Пицца, Ужин - Бургер' }
];
</script>

<style scoped lang="scss">
h2 {
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 1.3;
  margin: 0 0 20px;
  color: #000;
  text-align: center;

  @media (max-width: 575px) {
    font-size: 24px;
  }
}

.diet-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.diet-item {
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  padding: 15px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #000;

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 12px;
  }

  strong {
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
  }
}
</style>
