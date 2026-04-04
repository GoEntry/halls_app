<template>
  <BaseModal v-model="isOpen">
    <h2>Добавить тренировку</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="type">Тип тренировки:</label>
        <input type="text" id="type" v-model="form.type" required />
      </div>
      <div class="form-group">
        <label for="distance">Расстояние (км):</label>
        <input type="number" id="distance" v-model.number="form.distance" step="0.1" required />
      </div>
      <div class="form-group">
        <label for="pulse">Пульс (уд/мин):</label>
        <input type="number" id="pulse" v-model.number="form.pulse" required />
      </div>
      <button type="submit" class="btn-submit">Добавить</button>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'add']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref({
  type: '',
  distance: 0,
  pulse: 0
});

watch(isOpen, (newVal) => {
  if (!newVal) {
    form.value = { type: '', distance: 0, pulse: 0 };
  }
});

const handleSubmit = () => {
  const kcal = Math.round(form.value.distance * form.value.pulse * 0.1);
  emit('add', { ...form.value, kcal });
  isOpen.value = false;
};
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

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 8px;
    color: #000;

    @media (max-width: 575px) {
      font-size: 14px;
    }
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: "Brotesk", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;

    @media (max-width: 575px) {
      font-size: 14px;
      padding: 10px;
    }

    &:focus {
      outline: none;
      border-color: #4CAF50;
    }
  }
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background-color: #4CAF50;
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
    background-color: #45a049;
  }
}
</style>
