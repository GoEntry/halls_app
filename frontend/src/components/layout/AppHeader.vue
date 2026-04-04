<template>
  <header class="header">
    <div class="header__container">
      <RouterLink to="/" class="header__logo">
        <h1>HALLS</h1>
      </RouterLink>
      
      <nav class="header__nav">
        <div class="header__nav-bg" :style="navBgStyle"></div>
        <RouterLink 
          v-for="(link, index) in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="header__link"
          :ref="el => linkRefs[index] = el"
          @mouseenter="onLinkHover(index)"
          @mouseleave="onLinkLeave"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <button class="theme-toggle" @click="toggleTheme" :title="theme === 'light' ? 'Темная тема' : 'Светлая тема'">
        <svg v-if="theme === 'light'" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke-width="2"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';

const route = useRoute();
const { theme, toggleTheme } = useTheme();

const navLinks = [
  { path: '/', name: 'Главная' },
  { path: '/trainings', name: 'Тренировки' },
  { path: '/nutrition', name: 'Питание' },
  { path: '/videos', name: 'Видео' },
  { path: '/goals', name: 'Цели' },
  { path: '/profile', name: 'Профиль' }
];

const linkRefs = ref([]);
const hoveredIndex = ref(null);
const activeIndex = ref(0);
const navBgStyle = ref({
  left: '0px',
  width: '0px',
  opacity: '0'
});

const updateNavBg = (index) => {
  if (linkRefs.value[index]) {
    const link = linkRefs.value[index].$el || linkRefs.value[index];
    const rect = link.getBoundingClientRect();
    const nav = link.parentElement;
    const navRect = nav.getBoundingClientRect();
    
    navBgStyle.value = {
      left: `${rect.left - navRect.left}px`,
      width: `${rect.width}px`,
      opacity: '1'
    };
  }
};

const onLinkHover = (index) => {
  hoveredIndex.value = index;
  updateNavBg(index);
};

const onLinkLeave = () => {
  hoveredIndex.value = null;
  updateNavBg(activeIndex.value);
};

const updateActiveLink = () => {
  const currentPath = route.path;
  const index = navLinks.findIndex(link => {
    if (link.path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(link.path);
  });
  
  activeIndex.value = index >= 0 ? index : 0;
  
  setTimeout(() => {
    updateNavBg(activeIndex.value);
  }, 50);
};

watch(() => route.path, updateActiveLink);

onMounted(() => {
  updateActiveLink();
  window.addEventListener('resize', () => updateNavBg(activeIndex.value));
});
</script>

<style scoped lang="scss">
.header {
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &__container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: 991px) {
      padding: 15px 20px;
      flex-direction: column;
      gap: 15px;
    }
  }

  &__logo {
    text-decoration: none;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    h1 {
      font-family: "Sonic Italic", Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-style: italic;
      font-size: 32px;
      color: var(--text-primary);
      margin: 0;
      transition: color 0.3s ease;

      @media (max-width: 991px) {
        font-size: 28px;
      }
    }
  }

  &__nav {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 4px;
    background-color: var(--nav-bg);
    border-radius: 12px;
    transition: background-color 0.3s ease;

    @media (max-width: 991px) {
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__nav-bg {
    position: absolute;
    top: 4px;
    bottom: 4px;
    background: linear-gradient(135deg, #87e0cb, #c6e088);
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 0;
    box-shadow: 0 2px 8px rgba(135, 224, 203, 0.4);
  }

  &__link {
    position: relative;
    z-index: 1;
    font-weight: 600;
    font-size: 16px;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 8px;
    transition: color 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: var(--text-primary);
    }

    &.router-link-active {
      color: #fff;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
      font-size: 14px;
      padding: 8px 14px;
    }
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--nav-bg);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: var(--nav-hover);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .theme-icon {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }
}
</style>
