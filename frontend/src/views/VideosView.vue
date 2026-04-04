<template>
  <div class="videos-page">
    <div class="videos-page__header">
      <h1>Видео-тренировки</h1>
    </div>

    <div class="videos-page__categories">
      <button 
        v-for="category in categories" 
        :key="category.id"
        :class="['category-btn', { active: selectedCategory === category.id }]"
        @click="selectedCategory = category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="videos-page__grid">
      <div 
        v-for="video in filteredVideos" 
        :key="video.id" 
        class="video-card"
      >
        <div class="video-card__thumbnail">
          <img :src="video.thumbnail" :alt="video.title" />
          <div class="video-card__duration">{{ video.duration }}</div>
        </div>
        <div class="video-card__content">
          <h3>{{ video.title }}</h3>
          <p class="video-card__description">{{ video.description }}</p>
          <div class="video-card__meta">
            <span class="video-card__level">{{ video.level }}</span>
            <span class="video-card__category">{{ getCategoryName(video.category) }}</span>
          </div>
          <a :href="video.url" target="_blank" rel="noopener noreferrer" class="btn-watch">
            Смотреть
          </a>
        </div>
      </div>
    </div>

    <div v-if="filteredVideos.length === 0" class="empty-state">
      <p>Видео в этой категории пока нет</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = [
  { id: 'all', name: 'Все' },
  { id: 'home', name: 'Домашние' },
  { id: 'cardio', name: 'Кардио' },
  { id: 'strength', name: 'Силовые' },
  { id: 'yoga', name: 'Йога и растяжка' },
  { id: 'hiit', name: 'HIIT' }
];

const selectedCategory = ref('all');

const videos = [
  {
    id: 1,
    title: 'Тренировка для МУЖЧИН без железа',
    description: 'Эффективная домашняя тренировка на все группы мышц без дополнительного оборудования',
    url: 'https://www.youtube.com/watch?v=J3tRz0pyfys',
    thumbnail: 'https://img.youtube.com/vi/J3tRz0pyfys/mqdefault.jpg',
    duration: '25:00',
    level: 'Средний',
    category: 'home'
  },
  {
    id: 2,
    title: 'Сжигаем калории за 15 минут',
    description: 'Интенсивная кардио-тренировка для быстрого сжигания калорий',
    url: 'https://www.youtube.com/watch?v=ESMmH-JfPCY',
    thumbnail: 'https://img.youtube.com/vi/ESMmH-JfPCY/mqdefault.jpg',
    duration: '15:00',
    level: 'Легкий',
    category: 'cardio'
  },
  {
    id: 3,
    title: 'Растяжка всего тела за 10 минут',
    description: 'Комплекс упражнений на растяжку для улучшения гибкости',
    url: 'https://www.youtube.com/watch?v=X9hhzhwlVww',
    thumbnail: 'https://img.youtube.com/vi/X9hhzhwlVww/mqdefault.jpg',
    duration: '10:00',
    level: 'Легкий',
    category: 'yoga'
  },
  {
    id: 4,
    title: 'Тренировка на все тело за 15 минут',
    description: 'Быстрая и эффективная тренировка для занятых людей',
    url: 'https://www.youtube.com/watch?v=rL2_d4F7SjE',
    thumbnail: 'https://img.youtube.com/vi/rL2_d4F7SjE/mqdefault.jpg',
    duration: '15:00',
    level: 'Средний',
    category: 'home'
  },
  {
    id: 5,
    title: 'HIIT тренировка для продвинутых',
    description: 'Высокоинтенсивная интервальная тренировка для максимального результата',
    url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
    thumbnail: 'https://img.youtube.com/vi/ml6cT4AZdqI/mqdefault.jpg',
    duration: '20:00',
    level: 'Продвинутый',
    category: 'hiit'
  },
  {
    id: 6,
    title: 'Силовая тренировка с гантелями',
    description: 'Комплексная силовая тренировка для набора мышечной массы',
    url: 'https://www.youtube.com/watch?v=UBMk30rjy0o',
    thumbnail: 'https://img.youtube.com/vi/UBMk30rjy0o/mqdefault.jpg',
    duration: '30:00',
    level: 'Средний',
    category: 'strength'
  },
  {
    id: 7,
    title: 'Утренняя йога для начинающих',
    description: 'Спокойная практика йоги для бодрого начала дня',
    url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
    thumbnail: 'https://img.youtube.com/vi/v7AYKMP6rOE/mqdefault.jpg',
    duration: '20:00',
    level: 'Легкий',
    category: 'yoga'
  },
  {
    id: 8,
    title: 'Кардио без прыжков',
    description: 'Эффективная кардио-тренировка для людей с проблемами суставов',
    url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8',
    thumbnail: 'https://img.youtube.com/vi/gC_L9qAHVJ8/mqdefault.jpg',
    duration: '25:00',
    level: 'Легкий',
    category: 'cardio'
  }
];

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'all') {
    return videos;
  }
  return videos.filter(video => video.category === selectedCategory.value);
});

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : '';
};
</script>

<style scoped lang="scss">
.videos-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__header {
    margin-bottom: 30px;

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

  &__categories {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.category-btn {
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  border-radius: 20px;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(135, 224, 203, 0.3);
  }

  &.active {
    background-color: rgba(135, 224, 203, 0.8);
    border-color: #87e0cb;
    color: #000;
  }
}

.video-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &__thumbnail {
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16:9 aspect ratio
    overflow: hidden;
    background-color: #000;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  &__content {
    padding: 20px;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #000;
  }

  &__description {
    font-size: 14px;
    color: #666;
    margin: 0 0 15px 0;
    line-height: 1.5;
  }

  &__meta {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  &__level,
  &__category {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 600;
  }

  &__level {
    background-color: rgba(76, 175, 80, 0.2);
    color: #2e7d32;
  }

  &__category {
    background-color: rgba(33, 150, 243, 0.2);
    color: #1565c0;
  }
}

.btn-watch {
  display: inline-block;
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
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
    margin: 0;
  }
}
</style>
