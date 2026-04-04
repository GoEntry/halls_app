<template>
  <BaseModal v-model="isOpen">
    <h2>Цель по весу</h2>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="weight">Целевой вес (кг):</label>
        <input type="number" id="weight" v-model.number="localWeight" required />
      </div>
      <div class="form-group">
        <label for="date">Дата завершения:</label>
        <input type="date" id="date" v-model="localDate" required />
      </div>
      <button type="submit" class="btn-save">Сохранить</button>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseModal from '../ui/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean,
  weight: { type: Number, required: true },
  completionDate: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const localWeight = ref(props.weight);
const localDate = ref(props.completionDate);

watch(() => props.weight, (newVal) => {
  localWeight.value = newVal;
});

watch(() => props.completionDate, (newVal) => {
  localDate.value = newVal;
});

const handleSave = () => {
  emit('save', {
    weight: localWeight.value,
    completionDate: localDate.value
  });
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

.btn-save {
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
