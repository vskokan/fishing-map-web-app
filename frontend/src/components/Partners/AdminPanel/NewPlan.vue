<template>
  <div class="plan-new">
    <div class="inputs">
      <div class="left">
        <div class="inputContainer">
          <input class="name" type="text" placeholder="Название" v-model="plan.name" />
        </div>
        <div class="inputContainer">
          <input class="price" type="text" v-model="plan.price" />
          <label for="price">₽/мес</label>
        </div>
      </div>
      <div class="inputContainer">
        <textarea placeholder="Введите описание" v-model="plan.description" />
      </div>
    </div>
    <div class="buttons">
      <i class="fas fa-times" @click="endPlanCreation"></i>
      <i class="fas fa-plus" @click="createPlan"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      plan: {
        name: "",
        description: "",
        price: 0,
      },
    };
  },
  methods: {
    ...mapMutations(["endPlanCreation"]),
    endCreation() {
      this.endPlanCreation();
    },
    createPlan() {
        this.$emit('created', this.plan)
        this.endPlanCreation()
    }
  },
};
</script>

<style scoped>
.plan-new {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  width: 65vw;
  padding: 20px;
  border-radius: 15px;
  color: #000;
  font-family: "Inter", sans-serif;
}

.inputs {
    display: flex;
    flex-direction: row;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 20vw;
    margin-right: 20px;
}

.inputContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.inputContainer input,
textarea {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

textarea {
    width: 40vw;
    resize: none;
    height: 8vh;
}

.inputContainer input:focus,
textarea:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

.name {
    width: 18vw;
}

.price {
    width: 5vw;
    margin-right: 10px;
}

.buttons {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 5vw;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    gap: 10px;
    color: var(--color-lightgray);
}



</style>