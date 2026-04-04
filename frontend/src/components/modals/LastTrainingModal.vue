<template>
  <BaseModal v-model="isOpen">
    <h2>Детали Последней Тренировки</h2>
    <div class="training-details">
      <p><strong>Время:</strong> {{ training.time }}</p>
      <p><strong>Тип тренировки:</strong> {{ training.type }}</p>
      <p><strong>Расстояние:</strong> {{ training.distance }} км</p>
      <p><strong>Ккал:</strong> {{ training.kcal }}</p>
      <p><strong>Средний темп:</strong> {{ training.averagePace }} мин/км</p>
    </div>
    <button @click="isOpen = false" class="btn-close">Закрыть</button>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean,
  training: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
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

.training-details {
  margin-bottom: 20px;

  p {
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;
    margin: 10px 0;
    color: #000;

    @media (max-width: 575px) {
      font-size: 16px;
    }

    strong {
      font-weight: 600;
    }
  }
}

.btn-close {
  width: 100%;
  padding: 14px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 12px;
  }

  &:hover {
    background-color: #555;
  }
}
</style>
