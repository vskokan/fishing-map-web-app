<template>
  <div class="fishCard" v-if="isFishLoaded">
    <div class="header">
      {{ currentFish.baseInfo.name }}
    </div>
    <div class="info">
      <div class="image">
        <img :src="'http://localhost:3000/' + currentFish.baseInfo.img_src" />
        <!-- {{ currentFish.baseInfo.img_src }} -->
      </div>
      <div class="description">
        {{ currentFish.baseInfo.description }}
      </div>
    </div>
    <!-- {{currentFish.stats.baits.labels}} -->
    <div class="stats">
      <PieChart v-if="isFishLoaded" :fish="currentFish.stats.baits" />
    <PieChart v-if="isFishLoaded" :fish="currentFish.stats.methods" />
    </div>
    
    <!-- <PieChart :data="chartdata" :options="options"/> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import PieChart from "./Pie.vue";

export default {
  props: ["fish"],
  components: { PieChart },
  // data() {
  //   return {
  //     chartdata: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: "Data One",
  //           backgroundColor: "#f87979",
  //           data: [],
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //     },
  //   };
  // },
  computed: mapGetters(["currentFish", "isFishLoaded"]),
  methods: {
    ...mapActions(["fetchFish"]),
  },
  created() {
   // alert(this.fish);
    this.fetchFish(this.fish);
    //this.chartdata.labels = this.currentFish.stats.baits.labels
     //this.chartdata.datasets.data = this.currentFish.stats.baits.percents
    // alert('ekfjkf')
    // alert(this.chartdata.labels)
  },
  // mounted() {
    
    
  // }
};
</script>


<style scoped>
  .header {
    font-size: 45px;
    font-weight: 600;
    letter-spacing: 1.5px;
    font-family: 'IBM Plex Sans', sans-serif;
    text-transform: uppercase;
    color: #000;
  }
  .fishCard {
    background-color: #fff;
    width: 70%;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    justify-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .image {
    margin: 10px 0px;
  }

  .stats {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    color: #000;
  }

  .description {
    text-align: left;
    font-size: 24px;
    margin: 20px 0px;
    font-family: 'Rubik', sans-serif;
     color: #000;
  }
</style>