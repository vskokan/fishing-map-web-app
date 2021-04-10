<template>
  <div class="plan">
    <div class="info">
      <div class="name-and-price">
        <div class="name">
          {{ plan.name }}
        </div>
        <div class="price">
          {{ plan.price }} <span class="roubles">₽/мес</span>
        </div>
      </div>
      <div class="description">
        {{ plan.description }}
      </div>
    </div>
    <div class="actions">
      <i class="fas fa-pen"></i>
      <i class="fas fa-trash"></i>
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
  flex-direction: row;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 10vh;
  padding: 20px;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: row;
}
.name-and-price {
  width: 20vw;
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
}

.description {
  width: 40vw;
  text-align: start;
  margin-left: 30px;
  color: #000;
  font-size: 18px;
  font-family: 'Rubik', sans-serif;
}

.price {
  margin-top: 20px;
  color: var(--color-violet)
}

.actions {
  /* margin-right: 20px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  color: var(--color-darkgray);
}
.actions .fas {
    margin: 10px 0px;
}
</style>
