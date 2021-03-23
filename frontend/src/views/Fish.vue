<template>
  <div class="container">
      <FishCardBig v-bind:fish="$route.params.id"/>
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
  padding: 40px 0px;
  /* height: auto; */
  /* min-height: 88vh; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin: 40px 0px; */
  /* margin: auto; */
}

</style>