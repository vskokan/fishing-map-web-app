<template>
  <div class="card" @click="openFishPage(fish.id)">
    <img class="image" :src="'http://localhost:3000/' + fish.img_src" />
    <div class="name">
      {{ fish.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["fish"],
  methods: {
    openFishPage(fish) {
        console.log(fish)
    //тут будет обработчик открытия страницы рыбы
    }
  },
};
</script>

<style scoped>
.card {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 450px;
  color: #000;
  height: 300px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.image {
  max-width: 70%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
}

.name {
  margin-top: 10px;
  font-size: 34px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  font-family: "IPM Plex Sans", sans-serif;
}
</style>