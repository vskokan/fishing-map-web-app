<template>
  <div class="area">
    <CompanyList></CompanyList>
  </div>
</template>

<script>
import CompanyList from "@/components/Partners/AdminPanel/CompanyList";

export default {
  components: { CompanyList },

};
</script>

<style scoped>
  .area {
    width: 100%;
    padding: 40px;
  }
</style>