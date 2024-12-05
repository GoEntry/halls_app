
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
            <p class="weightTarget">50 кг</p>
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
              <p class="distanceMetric">Расстояние:</p>
              <p class="caloriesMetric">Ккалл:</p>
              <p class="pulseMetric">Пульс:</p>
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
    </main>
  </div>

</template>

<style scoped lang="scss">
  @import 'Halls.scss';
</style>

