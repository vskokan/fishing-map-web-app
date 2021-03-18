<template>
  <div class="container">
      <FishCardBig v-bind:fish="$route.params.fish"/>
  </div>
</template>

<script>
import FishCardBig from '@/components/Fish/FishCardBig.vue'
export default {
    components: {
        FishCardBig
    }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: auto;
}
</style>