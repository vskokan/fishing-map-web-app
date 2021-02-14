<template>
  <div class="tableArea">
    <transition name="fade">
      <AddFish2 class="addForm" v-if="showForm" />
      <FishCard2 class="cardForm" v-if="showCard" v-bind:fish="currentFish" />
      <EditFish
        class="editForm"
        v-if="showEditForm"
        v-bind:fish="currentFish"
      />
    </transition>

    <div class="tableContainer">
      <div class="header">
        <h2>Рыба</h2>
        <button class="button-tableheader" @click="getForm">
          Добавить <i class="fas fa-plus"></i>
        </button>
      </div>
      <table class="table">
        <thead>
          <!-- <tr class="tableHeader">
                    <th>ID</th><th>Название</th><th>Изображение</th><th>Описание</th><th>Действия</th>
                </tr> -->
        </thead>
        <tr v-for="fish in allFishes" :key="fish.id" class="row">
          <td class="idCell">{{ fish.id }}</td>
          <td class="nameCell">{{ fish.name }}</td>
          <td class="imageCell">
            <a :href="'http://localhost:3000/' + fish.img_src">
              <i class="fas fa-file-image"></i>
            </a>
          </td>
          <td class="descriptionCell">
            {{ fish.description.substr(0, 50) + "..." }}
          </td>
          <td class="actionCell">
            <button class="view" @click="chooseFish(fish)">
              <i class="fas fa-info"></i>
            </button>
            <button class="edit" @click="chooseFishToUpdate(fish)">
              <i class="fas fa-pen"></i>
            </button>
            <button class="delete" @click="deleteFromTable(fish.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="navigationButtons">
      <button class="previous" @click="previousPage">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="next" @click="nextPage">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddFish2 from "@/components/Fish/AddFish2";
import FishCard2 from "@/components/Fish/FishCard2";
import EditFish from "@/components/Fish/EditFish";

export default {
  components: { AddFish2, FishCard2, EditFish },
  computed: mapGetters([
    "allFishes",
    "showForm",
    "showCard",
    "showEditForm",
    "getCurrentPage",
    "getMaxPage",
  ]),
  methods: {
    ...mapActions(["fetchFishes", "deleteFish", "getFishMaxPageFromServer"]),
    ...mapMutations([
      "changeFormView",
      "changeCardView",
      "changeEditFormView",
      "incrementCurrentPage",
      "decrementCurrentPage",
    ]),
    getForm() {
      // alert(this.showForm)
      this.changeFormView();
      // alert(this.showForm)
    },
    deleteFromTable(id) {
      // alert(id)
      if (!this.showCard) {
        this.deleteFish(id);
      } else {
        alert("Закройте все окна перед удалением");
      }
    },
    chooseFish(fish) {
      if (!this.showCard) {
        this.currentFish = fish;
        this.changeCardView();
      }
      // this.changeCardView()
    },
    chooseFishToUpdate(fish) {
      if (!this.showEditForm) {
        this.currentFish = fish;
        this.changeEditFormView();
      }
      // this.changeCardView()
    },
    getCard() {
      alert(this.showCard);
      if (!this.showCard) {
        this.changeCardView();
      }
    },
    getEditForm() {
      if (!this.showEditForm) {
        this.changeEditFormView();
      }
    },
    previousPage() {
      // alert(this.getCurrentPage)
      this.decrementCurrentPage();
      this.fetchFishes();
    },
    nextPage() {
      // this.getMaxPageFromServer()
      // alert(this.getMaxPage)
      this.incrementCurrentPage();
      this.fetchFishes();
    },
  },
  mounted() {
    this.fetchFishes();
    // this.getMaxPageFromServer()
  },
  data() {
    return {
      currentFish: "",
    };
  },
};
</script>

<style scoped>
.tableContainer {
  /* height: 720px; */
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 0;

  /* position: relative; */
}
.tableArea {
  padding: 10px;
  border-radius: 15px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 80%; */
  height: 70vh;
  background-color: #fff;
  /* box-shadow: 0 0 60px rgba(14,42,71,.25); */
  z-index: 0;
}
table {
  border-collapse: collapse;
  /* width: 1200px; */
  background-color: #fff;
  z-index: 0;
}
.tableHeader {
  /* background-color: rgb(101, 15, 172); */
  color: rgb(17, 16, 16);
  height: 80px;
  font-size: 24px;
  font-weight: 700;
  z-index: 0;
}

th {
  color: #000;
}

td {
  padding: 5px;
  border-bottom: 1px solid rgb(236, 236, 236);
  height: 50px;
}

.navigationButtons {
  /* background-color: #fff; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 15px;
  background: transparent;
  border: transparent;
}

.navigationButtons button {
  background: transparent;
  border: transparent;
  font-size: 20px;
}

.navigationButtons button:hover {
  cursor: pointer;
}

.edit,
.view,
.delete {
  width: 30px;
  height: 30px;
  background: transparent;
  border: transparent;
}

.edit:hover,
.view:hover,
.delete:hover {
  cursor: pointer;
}

.idCell {
  width: 50px;
}
.descriptionCell {
  width: 500px;
}

.nameCell {
  width: 300px;
}

.imageCell {
  width: 60px;
}

.actionCell {
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.row:nth-child(even) {
  background: #fff;
}
.row:nth-child(odd) {
  background: rgb(248, 248, 248);
}
/* tr:nth-child(1)  {
        background: rgb(101, 15, 172); 
        color: #fff; 
    } */

.tableHeader {
  /* background-color: rgb(101, 15, 172); */
  color: #fff;
  height: 80px;
  font-size: 24px;
  font-weight: 700;
  z-index: 0;
}

.addForm,
.cardForm,
.editForm {
  position: absolute;
  margin: auto;
  margin-top: 50px;
  z-index: 5;
}

.editForm {
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.tableImage {
  width: 40px;
  margin-right: 10px;
  color: #fff;
}

.header {
  display: flex;
  padding-top: 5px;
  padding-right: 10px;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  /* background-color: rgb(101, 15, 172); */
  color: rgb(15, 13, 13);
}

.header h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 48px;
}

.fadee-enter-active,
.fadee-leave-active {
  transition: opacity 0.5s;
}
.fadee-enter, .fadee-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
