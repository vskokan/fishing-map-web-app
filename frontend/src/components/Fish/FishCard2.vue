<template>
  <div class="card">
    <h2 class="name">{{ fish.name }}</h2>
    <img class="image" :src="'http://localhost:3000/' + fish.img_src" />
    <p class="description">{{ fish.description }}</p>
    <div class="formButtons">
      <button class="button-simple" v-on:click="closeForm">Закрыть</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["fish"],
  methods: {
    ...mapMutations(["changeCardView"]),
    closeForm() {
      this.changeCardView();
    },
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
  min-height: 250px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px;
}

.name {
  margin-top: 20px;
}

.description {
  margin: 20px 10px;
}

.image {
  /* width: 300px;
  height: 200px; */
  max-width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* img {
  width: 100%;
} */
</style>