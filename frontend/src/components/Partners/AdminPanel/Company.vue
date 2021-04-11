<template>
  <div class="company-container">
    <div class="company">
      <main>
        <div class="info">
          <div class="left">
            <img class="logo" :src="'http://localhost:3000/' + company.logo" />
            <div class="name">
              {{ company.name }}
            </div>
            <div class="email">
                <i class="fas fa-envelope"></i>
              {{ company.email }}
            </div>
            <div class="website">
                <i class="fas fa-globe"></i>
              {{ company.website }}
            </div>
            <div class="departmentsAmount">
                <i class="fas fa-store-alt"></i>
              Тут будет количество филиалов
            </div>
          </div>
          <div class="description">
            {{ company.description }}
          </div>
          <div class="actions">
            <i class="fas fa-pen"></i>
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </main>
      <footer>
        <div class="contract-info">
          <div class="plan">
            {{ company.contract_plan || "Тут будет тариф" }}
          </div>
          <div class="term">
            {{ company.contract_term || "Тут будет срок контракта" }}
          </div>
          <div class="date">
            {{
              company.contract_creation_date ||
                "Тут будет дата заключения контракта"
            }}
          </div>
          <div class="status">
            {{ company.contract_status || "Тут будет статус контракта" }}
          </div>
        </div>
      </footer>
      <div class="departments" v-if="departmentsAreLoaded">
        {{
          departments.length == 0 || departments == undefined
            ? "Нет филиалов :("
            : ""
        }}
        <Department
          v-for="department in departments"
          :key="department.id"
          v-bind:department="department"
        />
      </div>
      <div class="addDepartment">
        <i class="fas fa-plus"></i><div>Добавить филиал</div>
      </div>
    </div>
    <div class="company-edit"></div>
  </div>
</template>

<script>
import CompanyData from "../../../services/CompanyData";
import Department from "./Department";

export default {
  props: ["company"],
  components: {
    Department,
  },
  data() {
    return {
      departments: [],
      departmentsAreLoaded: false,
    };
  },
  created() {
    CompanyData.getDepartments(this.company.id).then((json) => {
      this.departments = json.data;
      this.departmentsAreLoaded = true;
    });
  },
};
</script>

<style scoped>
.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 10vh;
  padding: 20px;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
  
}

.info {
  display: flex;
  flex-direction: row;
}

.left {
  display: flex;
  flex-direction: column;
  width: 20vw;
}

.description {
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  text-align: start;
  /* align-items: flex-start; */
}

.logo {
  height: 20vh;

  object-fit: contain;
}

main {
  min-height: 30vh;
}

.contract-info {
  display: flex;
  flex-direction: row;
  width: 60vw;
  justify-content: space-between;
  margin: 30px 0px;
}

.departments {
    width: 60vw;
  background-color: rgb(248, 248, 248);
  padding: 20px;
  margin: 20px 0px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
    margin: 20px 0px;
    font-size: 26px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
}

.actions .fas {
    margin: 0px 5px;
    color: var(--color-darkgray)
}

.actions .fas:hover {
    cursor: pointer;
    color: var(--color-violet)
}

.addDepartment {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--color-darkgray)
}

.addDepartment .fas {
    margin: 0px 5px;
    
}

.addDepartment:hover {
    cursor: pointer;
    color: var(--color-violet)
}
</style>
