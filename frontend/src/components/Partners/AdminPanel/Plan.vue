<template>
  <div class="container">
    <div class="plan" v-if="!editingPlan">
      <div class="info">
        <div class="name-and-price">
          <div class="name">
            {{ plan.name }}
          </div>
          <div class="price">
            {{ plan.price }} <span class="roubles">₽/мес</span>
          </div>
          <div class="discounts">
            <div v-if="plan.discountSupport" class="yes">
              <i class="fas fa-check"></i>Поддерживает генерацию скидок
            </div>
            <div v-else class="no">
              <i class="fas fa-times"></i>Не поддерживает генерацию скидок
            </div>
          </div>
        </div>
        <div class="description">
          {{ plan.description }}
        </div>
      </div>
      <div class="actions">
        <i class="fas fa-pen" @click="startPlanEditing"></i>
        <i class="fas fa-trash" @click="deletePlan"></i>
      </div>
    </div>
    <div class="plan-edited" v-if="editingPlan">
      <div class="info">
        <div class="name-and-price">
          <input class="name" v-model="editedPlan.name" />
          <div class="price">
            <input v-model="editedPlan.price" />
            <span class="roubles">₽/мес</span>
          </div>
          <div class="inputContainer">
            <input
              type="checkbox"
              v-model="plan.discountSupport"
              id="discount"
              v-show="false"
            />
            <label for="discount" class="checkbox-label">
              <div class="checkbox">
                <i
                  :class="{
                    'fas fa-check': plan.discountSupport,
                    'fas fa-times': !plan.discountSupport,
                  }"
                ></i>
              </div>
              Поддержка скидок</label
            >
          </div>
        </div>
        <div class="description">
          <textarea v-model="editedPlan.description"></textarea>
        </div>
      </div>
      <div class="actions">
        <i class="fas fa-times" @click="cancelPlanEditing"></i>
        <i class="fas fa-plus" @click="editPlan"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["plan"],
  data() {
    return {
      editedPlan: {
        name: "",
        price: "",
        description: "",
        discountSupport: '',
      },
      editingPlan: false,
    };
  },
  methods: {
    deletePlan() {
      this.$emit("delete", this.plan.id);
    },
    startPlanEditing() {
      this.editingPlan = true;
    },
    cancelPlanEditing() {
      this.editingPlan = false;
    },
    editPlan() {
      this.$emit("update", {
        id: this.plan.id,
        name: this.editedPlan.name,
        price: this.editedPlan.price,
        description: this.editedPlan.description,
        discountSupport: this.editedPlan.discountSupport
      });
      this.cancelPlanEditing();
    },
  },
  created() {
    this.editedPlan.name = this.plan.name;
    this.editedPlan.price = this.plan.price;
    this.editedPlan.description = this.plan.description;
    this.editedPlan.discountSupport = this.plan.discountSupport
  },
};
</script>

<style scoped>
.plan,
.plan-edited {
  display: flex;
  flex-direction: row;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 10vh;
  padding: 20px;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: row;
}
.name-and-price {
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  color: #000;
}

.description {
  width: 40vw;
  text-align: start;
  margin-left: 30px;
  color: #000;
  font-size: 18px;
  font-family: "Rubik", sans-serif;
}

.price {
  margin-top: 20px;
  color: var(--color-violet);
}

.actions {
  /* margin-right: 20px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  color: var(--color-darkgray);
}
.actions .fas {
  margin: 10px 0px;
}

input,
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

input:focus,
textarea:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

.plan-edited .name-and-price {
  align-items: flex-start;
}

.plan-edited .name {
  width: 18vw;
}

.plan-edited .price {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.price input {
  width: 5vw;
  margin-right: 10px;
}

.plan-edited textarea {
  width: 38vw;
  height: 12vh;
}

.discounts {
  margin-top: 20px;
  font-size: 16px;
}

.discounts .fas {
  margin-right: 5px;
}

.yes {
  color: var(--color-green);
}

.no {
  color: var(--color-red);
}

.checkbox {
    border: 1px solid var(--color-lightgray);
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin-right: 5px;
}

.checkbox .fa-check {
    color: var(--color-green);
}

.checkbox .fa-times {
    color: var(--color-red);
}

.checkbox-label {
    display: flex;
    flex-direction: row;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    text-transform: none;
    margin-top: 20px;
    font-weight: 500;
    letter-spacing: unset;
}
</style>
