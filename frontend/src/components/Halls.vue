
<template>

  <div class="halls dashboardContainer">
    <main class="mainLayout">
      <!-- Main dashboard layout with training information and controls -->

      <section class="leftColumn">
        <article class="nextTrainingCard">
          <div class="trainingInfo">
            <p class="trainingTitle">
              следующая<br/>тренировка
            </p>
            <div class="dateTimeWrapper">
              <div class="dateContainer">
                <div class="dayDisplay"><span class="dayDisplay_span0">28</span></div>
                <div class="monthWrapper">
                  <div class="monthDisplay"><span class="monthDisplay_span0">октября</span></div>
              </div>
              </div>
              <div class="timeDisplay">
                <p class="timeText">
                  18<br/>00
                </p>
                <img class="dividerLine" src="/assets/12846dc73fe8737bea0ba8acac6f6006.svg" alt="alt text" />
              </div>
            </div>
          </div>
        </article>
        <article class="weightGoalCard">
          <div class="goalContent">
            <p class="goalTitle">
              цель по<br/>весу
            </p>
            <p class="weightTarget">{{ weightGoal }} кг</p>
          </div>
        </article>
      </section>

      <article class="lastTrainingCard">
        <!-- Last training session summary and statistics -->

        <div class="trainingStats">
          <div class="statsContent">
            <p class="statsTitle">
              Последняя<br/>тренировка
            </p>
            <div class="metricsContainer">
              <p class="distanceMetric">Расстояние: {{ lastTraining.distance }} км</p>
              <p class="caloriesMetric">Ккалл:  {{ lastTraining.kcal }}</p>
              <p class="pulseMetric">Пульс: {{ lastTraining.pulse }}у/м</p>
            </div>
          </div>
          <div class="colorIndicator"></div>
          <img class="statsGraph" src="/assets/ec6e34c30518a88257c0d143e3b59ef6.png" alt="alt text" />
        </div>
      </article>
      <section class="rightColumn">
        <article class="addTrainingCard">
          <div class="addTrainingContent">
            <p class="addTrainingText">
              добавить<br/>тренировку
            </p>
            <img class="addTrainingIcon" src="/assets/89ca88becca1db089b9b2cacf4d7cd38.png" alt="alt text" />
          </div>
        </article>
        <article class="trainingLogCard">
          <p class="logTitle">
            журнал<br/>тренировок
          </p>
        </article>
      </section>

      <div class="wrapper2">
        <div class="flex_col">
          <img class="image15" src="/assets/15a4a024ce8a1adbb5084269305518c9.svg" alt="alt text" />
          <img class="image7" src="/assets/99b61546705c23a6304528e7b7332781.svg" alt="alt text" />
          <img class="image9" src="/assets/7f63fbbb7cc3a03652d0b3fe30352183.svg" alt="alt text" />
        </div>
      </div>

      <!-- Modal Window -->
      <div class="modal show" >
        <div class="modalContent">
          <span class="closeButton" @click="toggleModal">&times;</span>
          <h2>Детали встречи</h2>
          <p>Дата: 28 октября</p>
          <p>Время: 18:00</p>
          <p>Место: Спортзал "Здоровье"</p>
          <p>Тренер: Иван Иванов</p>
        </div>
      </div>

      <!-- Weight Goal Modal Window -->
      <div class="modal show">
        <div class="modalContent">
          <span class="closeButton">&times;</span>
          <h2>Цель по весу</h2>
          <label for="weight">Целевой вес (кг):</label>
          <input type="number" id="weight" v-model="weightGoal" />
          <label for="completionDate">Дата завершения:</label>
          <input type="date" id="completionDate" v-model="completionDate" />
          <button @click="saveWeightGoal">Сохранить</button>
        </div>
      </div>

      <!-- Modal for Last Training Details -->
      <div class="modal show">
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
      weightGoal: 50, // default weight goal
      completionDate: '', // default completion date
      lastTraining: {
        time: '18:00',
        type: 'Бег',
        distance: 5,
        kcal: 300,
        pulse: 120,
        averagePace: 6,
      },
    };
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.isModalOpen = false;
        this.isWeightGoalModalOpen = false;
        this.showLastTrainingModal = false;
      }
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    toggleWeightGoalModal() {
      this.isWeightGoalModalOpen = !this.isWeightGoalModalOpen;
    },
    toggleLastTrainingModal() {
      this.showLastTrainingModal = !this.showLastTrainingModal;
    },
    saveWeightGoal() {
      // Logic to save the weight goal and completion date
      console.log(`Weight Goal: ${this.weightGoal}, Completion Date: ${this.completionDate}`);
      this.toggleWeightGoalModal();
    },
  },
};
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
  .modalContent h2, .modalContent p {
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
    background-color: #4CAF50;
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
