<template>
  <BaseModal v-model="isOpen">
    <h2>Журнал тренировок</h2>
    <ul class="training-list" v-if="trainings.length">
      <li v-for="(entry, index) in trainings" :key="index" class="training-item">
        <strong>{{ entry.type }}</strong> - {{ entry.distance }} км - {{ entry.pulse }} уд/мин - {{ entry.kcal }} ккал
      </li>
    </ul>
    <p v-else class="empty-message">Журнал пуст</p>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean,
  trainings: { type: Array, required: true }
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

.training-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.training-item {
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  padding: 12px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #000;

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 10px;
  }

  strong {
    font-weight: 600;
  }
}

.empty-message {
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  color: #666;

  @media (max-width: 575px) {
    font-size: 14px;
  }
}
</style>
