<template>
  <div class="card" @click="openFishPage(fish.id)">
    <div class="imgcontainer">
      <img class="image" :src="'http://localhost:3000/' + fish.img_src" />
    </div>
    
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
        this.$router.push({ path: `fish/${fish}` })
    }
  },
};
</script>

<style scoped>
.card {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 23vw;
  color: #000;
  height: 35vh;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.card:hover {
  cursor: pointer;
}

.image {
  height: 250px;
  width: 20vw;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  object-fit: fill;
  border-radius: 5px;

}

.imgcontainer {
  
}

.name {
  margin-top: 10px;
  font-size: 34px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  font-family: "IPM Plex Sans", sans-serif;
}
</style>