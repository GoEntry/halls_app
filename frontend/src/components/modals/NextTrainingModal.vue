<template>
  <BaseModal v-model="isOpen">
    <h2>Детали встречи</h2>
    <p>Дата: {{ date }}</p>
    <p>Время: {{ time }}</p>
    <p>Место: {{ place }}</p>
    <p>Тренер: {{ trainer }}</p>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean,
  date: { type: String, default: '25 декабря' },
  time: { type: String, default: '17:00' },
  place: { type: String, default: 'Спортзал "DTX"' },
  trainer: { type: String, default: 'Лущев Евгений' }
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
}
</style>
