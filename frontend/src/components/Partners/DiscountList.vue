<template>
  <div>
    <div class="header">Мои скидки</div>
    <div class="list" v-if="loaded">
      <Discount class="discount" v-for="discount in discounts" :key="discount.id" v-bind:discount="discount" >

      </Discount>
    </div>
  </div>
</template>

<script>
import UserData from "../../services/UserData";
import Discount from "./Discount"

export default {
  props: ["login"],
  components: { Discount },
  data() {
    return {
      discounts: [],
      loaded: false,
      showCode: false
    };
  },
  created() {
    UserData.getDiscounts(this.login).then((json) => {
      this.discounts = json.data;
      this.loaded = true;
    });
  },
};
</script>

<style scoped>
.list {
  background-color: var(--color-lightgray);
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}



.header {
    margin: 10px 0px;
    font-size: 46px;
    font-weight: 700;
    color: #000;
    text-align: start;
    margin-left: 20px;
    font-family: "Inter", sans-serif;
}
</style>
