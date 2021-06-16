<template>
<div class="discount">
     <div class="info" v-if="!showCode">
    <div class="logocontainer">
      <img class="logo" :src="'http://localhost:3000/' + discount.logo" />
    </div>
    <div class="value">
      {{ discount.value + "%" }}
    </div>
  </div>
  <img
    v-else
    class="qr"
    :src="'http://localhost:3000/' + discount.qr + '.png'"
  />
  <div class="switch" @click="showCode = !showCode">
    {{ showCode ? "Показать инфо" : "Показать код" }}
    <i class="fas fa-qrcode" v-if="!showCode"></i>
  </div>
</div>
</template>

<script>
export default {
    props: ['discount'],
    data() {
        return {
            showCode: false
        }
    }
}
</script>

<style scoped>
  .discount {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* background: url("./../../assets/triangle.png") bottom center repeat-x; */
    height: 16vw;
  width: 16vw;
  /* margin-top: 20px; */
  padding: 10px;
  border-radius: 15px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  /* font-family: "Baloo Chettan 2", cursive; */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
}

.logocontainer {
  height: 15vh;
  width: 16vw;
  display: flex;
  justify-content: center;
}

.logo {
  width: 80%;
  object-fit: contain;
}

.qr {
  width: 12vw;
  object-fit: contain;
}

.value {
    font-size: 60px;
    color: var(--color-violet)
}

.switch {
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
}

.switch:hover {
  color: var(--color-violet);
  cursor: pointer
}
</style>