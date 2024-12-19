<template>
  <div class="halls dashboardContainer">
    <main class="mainLayout">
      <!-- Main dashboard layout with training information and controls -->

      <section class="leftColumn">
        <article class="nextTrainingCard" @click="toggleModal">
          <div class="trainingInfo">
            <p class="trainingTitle">следующая<br />тренировка</p>
            <div class="dateTimeWrapper">
              <div class="dateContainer">
                <div class="dayDisplay"><span class="dayDisplay_span0">28</span></div>
                <div class="monthWrapper">
                  <div class="monthDisplay"><span class="monthDisplay_span0">октября</span></div>
                </div>
              </div>
              <div class="timeDisplay">
                <p class="timeText">18<br />00</p>
                <img
                  class="dividerLine"
                  src="/assets/12846dc73fe8737bea0ba8acac6f6006.svg"
                  alt="alt text"
                />
              </div>
            </div>
          </div>
        </article>
        <article class="weightGoalCard" @click="toggleWeightGoalModal">
          <div class="goalContent">
            <p class="goalTitle">цель по<br />весу</p>
            <p class="weightTarget">{{ weightGoal }} кг</p>
          </div>
        </article>
      </section>

      <article class="lastTrainingCard" @click="toggleLastTrainingModal">
        <!-- Last training session summary and statistics -->

        <div class="trainingStats">
          <div class="statsContent">
            <p class="statsTitle">Последняя<br />тренировка</p>
            <div class="metricsContainer">
              <p class="distanceMetric">Расстояние: {{ lastTraining.distance }} км</p>
              <p class="caloriesMetric">Ккалл: {{ lastTraining.kcal }}</p>
              <p class="pulseMetric">Пульс: {{ lastTraining.pulse }}у/м</p>
            </div>
          </div>
          <div class="colorIndicator"></div>
          <img
            class="statsGraph"
            src="/assets/ec6e34c30518a88257c0d143e3b59ef6.png"
            alt="alt text"
          />
        </div>
      </article>
      <section class="rightColumn">
        <article class="addTrainingCard" @click="toggleAddTrainingModal">
          <div class="addTrainingContent">
            <p class="addTrainingText">добавить<br />тренировку</p>
            <img
              class="addTrainingIcon"
              src="/assets/89ca88becca1db089b9b2cacf4d7cd38.png"
              alt="alt text"
            />
          </div>
        </article>
        <article class="trainingLogCard" @click="toggleTrainingLogModal">
          <p class="logTitle">
            журнал<br/>тренировок
          </p>
          <p class="logTitle">
            журнал<br/>тренировок
          </p>
        </article>
      </section>

      <div class="wrapper2">
        <div class="flex_col">
          <img class="image_training" @click="toggleModal" src="/assets/15a4a024ce8a1adbb5084269305518c9.svg" alt="alt text" />
          <img class="image_videos" @click="toggleVideosModal" src="/assets/99b61546705c23a6304528e7b7332781.svg" alt="alt text" />
          <img class="image_eat" src="/assets/7f63fbbb7cc3a03652d0b3fe30352183.svg" alt="alt text" />
        </div>
      </div>

      <!-- Modal Window -->
      <div v-if="isModalOpen" class="modal show" @click.self="toggleModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleModal">&times;</span>
          <h2>Детали встречи</h2>
          <p>Дата: 25 декабря</p>
          <p>Время: 17:00</p>
          <p>Место: Спортзал "DTX"</p>
          <p>Тренер: Лущев Евгений</p>
        </div>
      </div>

      <!-- Weight Goal Modal Window -->
      <div v-if="isWeightGoalModalOpen" class="modal show" @click.self="toggleWeightGoalModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleWeightGoalModal">&times;</span>
          <h2>Цель по весу</h2>
          <label for="weight">Целевой вес (кг):</label>
          <input type="number" id="weight" v-model="weightGoal" />
          <label for="completionDate">Дата завершения:</label>
          <input type="date" id="completionDate" v-model="completionDate" />
          <button @click="saveWeightGoal">Сохранить</button>
        </div>
      </div>

      <!-- Modal for Last Training Details -->
      <div v-if="showLastTrainingModal" class="modal show">
        <div class="modalContent">
          <h2>Детали Последней Тренировки</h2>
          <p>Время: {{ lastTraining.time }}</p>
          <p>Тип тренировки: {{ lastTraining.type }}</p>
          <p>Расстояние: {{ lastTraining.distance }} км</p>
          <p>Ккал: {{ lastTraining.kcal }}</p>
          <p>Средний темп: {{ lastTraining.averagePace }} мин/км</p>
          <button @click="toggleLastTrainingModal">Закрыть</button>
        </div>
      </div>

      <!-- Modal for Add Training -->
      <div v-if="isAddTrainingModalOpen" class="modal show" @click.self="toggleAddTrainingModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleAddTrainingModal">&times;</span>
          <h2>Добавить тренировку</h2>
          <form @submit.prevent="addTraining">
            <label for="trainingType">Тип тренировки:</label>
            <input type="text" id="trainingType" v-model="newTraining.type" required />
            <label for="distance">Расстояние (км):</label>
            <input type="number" id="distance" v-model="newTraining.distance" required />
            <label for="pulse">Пульс (уд/мин):</label>
            <input type="number" id="pulse" v-model="newTraining.pulse" required />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>

      <!-- Modal for Add Training -->
      <div v-if="isAddTrainingModalOpen" class="modal show" @click.self="toggleAddTrainingModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleAddTrainingModal">&times;</span>
          <h2>Добавить тренировку</h2>
          <form @submit.prevent="addTraining">
            <label for="trainingType">Тип тренировки:</label>
            <input type="text" id="trainingType" v-model="newTraining.type" required />
            <label for="distance">Расстояние (км):</label>
            <input type="number" id="distance" v-model="newTraining.distance" required />
            <label for="pulse">Пульс (уд/мин):</label>
            <input type="number" id="pulse" v-model="newTraining.pulse" required />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>

      <!-- Modal for Training Log -->
      <div v-if="isTrainingLogModalOpen" class="modal show" @click.self="toggleTrainingLogModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleTrainingLogModal">&times;</span>
          <h2>Журнал тренировок</h2>
          <ul>
            <li v-for="(entry, index) in trainingLog" :key="index">
              {{ entry.type }} - {{ entry.distance }} км - {{ entry.pulse }} уд/мин - {{ entry.kcal }} ккал
              {{ entry.type }} - {{ entry.distance }} км - {{ entry.pulse }} уд/мин - {{ entry.kcal }} ккал
            </li>
          </ul>
        </div>
      </div>

      <!-- Modal for Videos -->
      <div v-if="isVideosModalOpen" class="modal show" @click.self="toggleVideosModal">
        <div class="modalContent">
          <span class="closeButton" @click="toggleVideosModal">&times;</span>
          <h2>Видео для домашней тренировки</h2>
          <ul>
            <li><a href="https://www.youtube.com/watch?v=J3tRz0pyfys&pp=
              ygUl0LTQvtC80LDRiNC90LjQtSDRgtGA0LXQvdC40YDQvtCy0LrQuA%3D%3D"
              target="_blank">Тренировка для МУЖЧИН без железа в домашних условиях</a></li>
            <li><a href="https://www.youtube.com/watch?v=ESMmH-JfPCY&pp=
              ygUl0LTQvtC80LDRiNC90LjQtSDRgtGA0LXQvdC40YDQvtCy0LrQuA%3D%3D"
              target="_blank">Сжигаем калории за 15 минут</a></li>
            <li><a href="https://www.youtube.com/watch?v=X9hhzhwlVww&pp=
              ygUl0LTQvtC80LDRiNC90LjQtSDRgtGA0LXQvdC40YDQvtCy0LrQuA%3D%3D"
              target="_blank">Растяжка всего тела за 10 минут</a></li>
            <li><a href="https://www.youtube.com/watch?v=rL2_d4F7SjE&pp=
              ygUl0LTQvtC80LDRiNC90LjQtSDRgtGA0LXQvdC40YDQvtCy0LrQuA%3D%3D"
              target="_blank">Тренировка на все тело за 15 минут</a></li>
          </ul>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      isWeightGoalModalOpen: false,
      showLastTrainingModal: false,
      isAddTrainingModalOpen: false,
      isTrainingLogModalOpen: false,
      isVideosModalOpen: false,
      isDietsModalOpen: false,
      weightGoal: 50, // default weight goal
      completionDate: '', // default completion date
      lastTraining: {
        time: '30:00',
        type: 'Бег',
        distance: 5,
        kcal: 300,
        pulse: 120,
        averagePace: 6,
      },
      newTraining: {
        type: '',
        distance: 0,
        pulse: 0,
        kcal: 0,
      },
      trainingLog: [
        { type: 'Бег', distance: 5, pulse: 120, kcal: 300 },
        { type: 'Велосипед', distance: 10, pulse: 110, kcal: 400 },
        { type: 'Плавание', distance: 2, pulse: 130, kcal: 250 },
        { type: 'Йога', distance: 0, pulse: 80, kcal: 200 },
      ],
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.loadTrainingLog()
    this.loadWeightGoal()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.isModalOpen = false
        this.isWeightGoalModalOpen = false
        this.showLastTrainingModal = false
        this.isAddTrainingModalOpen = false
        this.isTrainingLogModalOpen = false
        this.isVideosModalOpen = false
        this.isDietsModalOpen = false
      }
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    toggleWeightGoalModal() {
      this.isWeightGoalModalOpen = !this.isWeightGoalModalOpen
    },
    toggleLastTrainingModal() {
      this.showLastTrainingModal = !this.showLastTrainingModal
    },
    toggleAddTrainingModal() {
      this.isAddTrainingModalOpen = !this.isAddTrainingModalOpen
    },
    toggleTrainingLogModal() {
      this.isTrainingLogModalOpen = !this.isTrainingLogModalOpen
    },
    toggleVideosModal() {
      this.isVideosModalOpen = !this.isVideosModalOpen
    },
    toggleDietsModal() {
      this.isDietsModalOpen = !this.isDietsModalOpen
    },
    saveWeightGoal() {
      // Save the weight goal and completion date to localStorage
      localStorage.setItem(
        'weightGoal',
        JSON.stringify({
          weightGoal: this.weightGoal,
          completionDate: this.completionDate,
        })
      )
      console.log(`Weight Goal: ${this.weightGoal}, Completion Date: ${this.completionDate}`)
      this.toggleWeightGoalModal()
    },
    loadWeightGoal() {
      const savedGoal = localStorage.getItem('weightGoal')
      if (savedGoal) {
        const { weightGoal, completionDate } = JSON.parse(savedGoal)
        this.weightGoal = weightGoal
        this.completionDate = completionDate
      }
    },
    addTraining() {
      const calories = this.calculateCalories(
        this.newTraining.type,
        this.newTraining.distance,
        this.newTraining.pulse
      )
      this.newTraining.kcal = calories
      this.trainingLog.push({ ...this.newTraining })
      // Save the training log to localStorage
      localStorage.setItem('trainingLog', JSON.stringify(this.trainingLog))
      this.toggleAddTrainingModal()
    },
    loadTrainingLog() {
      const savedLog = localStorage.getItem('trainingLog')
      if (savedLog) {
        this.trainingLog = JSON.parse(savedLog)
      }
    },
    calculateCalories(type, distance, pulse) {
      // Simple calorie calculation logic
      return distance * pulse * 0.1
    },
  },
}
</script>

<style scoped lang="scss">
@import 'Halls.scss';

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.7s ease;
  z-index: 1000;
}
.modal.show {
  opacity: 1;
}
.modalContent {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.7s ease, opacity 0.7s ease-in-out;
  opacity: 0;
  font-family: inherit;
  position: relative;
}
.modalContent h2,
.modalContent p {
  font-family: inherit;
}
.modal.show .modalContent {
  transform: translateY(0);
  opacity: 1;
}
.modal.show + .halls.dashboardContainer > *:not(.nextTrainingCard) {
  filter: brightness(0.5);
}
.nextTrainingCard {
  filter: none !important;
}
.halls.dashboardContainer {
  filter: none;
}
.halls.dashboardContainer > * {
  z-index: 0;
}

.modalContent {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.modalContent input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.modalContent button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.modalContent button:hover {
  background-color: #45a049;
}
.closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
