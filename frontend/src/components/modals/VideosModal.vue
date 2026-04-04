<template>
  <BaseModal v-model="isOpen">
    <h2>Видео для домашней тренировки</h2>
    <ul class="video-list">
      <li v-for="(video, index) in videos" :key="index">
        <a :href="video.url" target="_blank" rel="noopener noreferrer">{{ video.title }}</a>
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

const videos = [
  {
    title: 'Тренировка для МУЖЧИН без железа в домашних условиях',
    url: 'https://www.youtube.com/watch?v=J3tRz0pyfys'
  },
  {
    title: 'Сжигаем калории за 15 минут',
    url: 'https://www.youtube.com/watch?v=ESMmH-JfPCY'
  },
  {
    title: 'Растяжка всего тела за 10 минут',
    url: 'https://www.youtube.com/watch?v=X9hhzhwlVww'
  },
  {
    title: 'Тренировка на все тело за 15 минут',
    url: 'https://www.youtube.com/watch?v=rL2_d4F7SjE'
  }
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

.video-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 15px;

    a {
      font-family: "Brotesk", Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      color: #2196F3;
      text-decoration: none;
      transition: color 0.3s ease;

      @media (max-width: 575px) {
        font-size: 14px;
      }

      &:hover {
        color: #1976D2;
        text-decoration: underline;
      }
    }
  }
}
</style>
