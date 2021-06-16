<template>
  <div class="container">
    <div class="addCompany" @click="startCompanyCreation">
      <i class="fas fa-plus"></i>
      Добавить компанию
    </div>
    <NewCompany v-if="companyCreation" />
    <div class="companies" v-if="companiesAreLoaded">
      <Company
        v-for="company in allCompanies"
        :key="company.id"
        v-bind:company="company"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Company from "./Company";
import NewCompany from "./NewCompany";

export default {
  components: {
    Company,
    NewCompany,
  },
  computed: mapGetters([
    "allCompanies",
    "companiesAreLoaded",
    "companyCreation",
  ]),
  methods: {
    ...mapActions(["fetchCompanies"]),
    ...mapMutations(["startCompanyCreation"]),
  },
  created() {
    this.fetchCompanies();
  },
};
</script>

<style scoped>
.companies {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.addCompany {
  width: 100%;
  color: rgb(133, 133, 133);
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
}
</style>
