import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  const data = ref(defaultValue);

  const loadData = () => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        data.value = JSON.parse(saved);
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
  };

  const saveData = () => {
    try {
      localStorage.setItem(key, JSON.stringify(data.value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  loadData();

  watch(data, saveData, { deep: true });

  return data;
}
