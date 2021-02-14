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
        <button class="button-simple" @click="getForm">
          Добавить <i class="fas fa-plus"></i>
        </button>
      </div>
      <table class="table">
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
      this.changeFormView()
    },
    deleteFromTable(id) {
      if (!this.showCard) {
        this.deleteFish(id)
      } else {
        alert("Закройте все окна перед удалением")
      }
    },
    chooseFish(fish) {
      if (!this.showCard) {
        this.currentFish = fish
        this.changeCardView()
      }
    },
    chooseFishToUpdate(fish) {
      if (!this.showEditForm) {
        this.currentFish = fish;
        this.changeEditFormView();
      }
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
      this.decrementCurrentPage();
      this.fetchFishes();
    },
    nextPage() {
      this.incrementCurrentPage();
      this.fetchFishes();
    },
  },
  mounted() {
    this.fetchFishes();
  },
  data() {
    return {
      currentFish: "",
    };
  },
};
</script>

<style scoped>
  @import './../../styles/adminpanel.css';

</style>
