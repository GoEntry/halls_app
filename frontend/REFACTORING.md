# Рефакторинг проекта HALLS

## Что было сделано

### Архитектура
- Разбил монолитный компонент `Halls.vue` (389 строк) на модульную структуру
- Создал переиспользуемые UI компоненты (`BaseModal`, `DashboardCard`)
- Разделил логику на отдельные компоненты карточек и модальных окон

### Структура компонентов

```
src/
├── components/
│   ├── Halls.vue (главный компонент - 150 строк)
│   ├── ui/
│   │   ├── BaseModal.vue (универсальное модальное окно)
│   │   └── DashboardCard.vue (базовая карточка)
│   ├── dashboard/
│   │   ├── NextTrainingCard.vue
│   │   ├── WeightGoalCard.vue
│   │   ├── LastTrainingCard.vue
│   │   ├── AddTrainingCard.vue
│   │   └── TrainingLogCard.vue
│   └── modals/
│       ├── NextTrainingModal.vue
│       ├── WeightGoalModal.vue
│       ├── LastTrainingModal.vue
│       ├── AddTrainingModal.vue
│       ├── TrainingLogModal.vue
│       ├── VideosModal.vue
│       └── DietsModal.vue
├── composables/
│   └── useLocalStorage.js (реактивная работа с localStorage)
├── fonts/
│   ├── fonts.css (подключение шрифтов)
│   ├── Brotesk.woff
│   └── Sonic.woff
└── router/
    └── index.js (упрощен)
```

### Улучшения

1. **Composition API** - переписал с Options API на современный Composition API
2. **Композаблы** - создал `useLocalStorage` для автоматической синхронизации с localStorage
3. **Стили** - убрал дублирование, оптимизировал CSS (650 строк → ~200 строк)
4. **Шрифты** - исправлено подключение кастомных шрифтов (Brotesk, Sonic Italic)
5. **Модальные окна** - единый `BaseModal` с transitions вместо дублирования кода
6. **Адаптивность** - улучшена верстка для мобильных устройств
7. **Центрирование** - все блоки правильно отцентрированы с max-width: 1400px
8. **Удалил неиспользуемые файлы**:
   - `Halls.scss` (650 строк)
   - `global.scss`, `utils.scss`
   - `views/HomeView.vue`, `views/AboutView.vue`
   - `components/icons/*`
   - `ScreenList.vue`
   - Старый `fonts.css` из корня

### Типографика

- **Brotesk** - основной шрифт для текста (400, 600)
- **Sonic Italic** - акцентный шрифт для заголовков (700, italic)
- Все размеры шрифтов адаптивны для разных экранов

### Преимущества новой структуры

- Код стал читаемым и поддерживаемым
- Каждый компонент отвечает за одну задачу
- Легко тестировать отдельные части
- Переиспользуемые UI компоненты
- Автоматическая синхронизация с localStorage
- Уменьшен объем кода в 2 раза
- Правильное подключение шрифтов
- Улучшенная адаптивность

## Запуск

```bash
cd frontend
npm install
npm start
```

Приложение будет доступно по адресу: http://localhost:5173

## Сборка

```bash
npm run build
```

Результат сборки будет в папке `dist/`
