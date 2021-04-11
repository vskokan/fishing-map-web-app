<template>
  <div class="container">
    <div class="plan">
      <div class="info">
        <div class="name-and-price">
          <div class="name">
            {{ plan.name }}
          </div>
          <div class="price">
            {{ plan.price }} <span class="roubles">₽/мес</span>
          </div>
          <div class="discounts">
            <div v-if="plan.discountSupport" class="yes">
              <i class="fas fa-check"></i>Поддерживает генерацию скидок
            </div>
            <div v-else class="no">
              <i class="fas fa-times"></i>Не поддерживает генерацию скидок
            </div>
          </div>
        </div>
        <div class="description">
          {{ plan.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["plan"],
};
</script>

<style scoped>
.plan {
  display: flex;
  flex-direction: column;
  width: 20vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 10vh;
  padding: 20px;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.name-and-price {
  width: 18vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  color: #000;
  height: 20vh;
}

.description {
  width: 18vw;
  text-align: start;
  margin-left: 30px;
  color: #000;
  font-size: 18px;
  font-family: "Rubik", sans-serif;
}

.price {
  margin-top: 20px;
  color: var(--color-violet);
}

.discounts {
  margin-top: 20px;
  font-size: 16px;
}

.discounts .fas {
  margin-right: 5px;
}

.yes {
  color: var(--color-green);
}

.no {
  color: var(--color-red);
}
</style>