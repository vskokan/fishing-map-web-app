<template>
  <div class="tableArea">
    <transition name="fade">
      <AddMethod class="addForm" v-if="showForm" />
      <MethodCard
        class="cardForm"
        v-if="showCard"
        v-bind:method="currentMethod"
      />
      <EditMethod
        class="editForm"
        v-if="showEditForm"
        v-bind:method="currentMethod"
      />
    </transition>

    <div class="tableContainer">
      <div class="header">
        <h2>Методы</h2>
        <button class="button-tableheader" @click="getForm">
          Добавить <i class="fas fa-plus"></i>
        </button>
      </div>
      <table class="table">


        <!-- <tbody name="fadee" is="transition-group"> -->
        <tr v-for="method in allMethods" :key="method.id" class="row">
          <td class="idCell">{{ method.id }}</td>
          <td class="nameCell">{{ method.name }}</td>
          <td class="descriptionCell">
            {{ method.description.substr(0, 50) + "..." }}
          </td>
          <td class="actionCell">
            <button class="view" @click="chooseMethod(method)">
              <i class="fas fa-info"></i>
            </button>
            <button class="edit" @click="chooseMethodToUpdate(method)">
              <i class="fas fa-pen"></i>
            </button>
            <button class="delete" @click="deleteFromTable(method.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <!-- </tbody> -->
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
import AddMethod from "@/components/Methods/AddMethod";
import MethodCard from "@/components/Methods/MethodCard";
import EditMethod from "@/components/Methods/EditMethod";

export default {
  components: { AddMethod, MethodCard, EditMethod },
  computed: mapGetters([
    "allMethods",
    "showForm",
    "showCard",
    "showEditForm",
    "getCurrentPage",
    "getMaxPage",
  ]),
  methods: {
    ...mapActions(["fetchMethods", "deleteMethod", "getMaxPageFromServer"]),
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
        this.deleteMethod(id);
      } else {
        alert("Закройте все окна перед удалением");
      }
    },
    chooseMethod(method) {
      if (!this.showCard) {
        this.currentMethod = method;
        this.changeCardView();
      }
      // this.changeCardView()
    },
    chooseMethodToUpdate(method) {
      if (!this.showEditForm) {
        this.currentMethod = method;
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
      //alert(this.getCurrentPage)
      this.decrementCurrentPage();
      this.fetchMethods();
    },
    nextPage() {
      // this.getMaxPageFromServer()
      // alert(this.getMaxPage)
      this.incrementCurrentPage();
      this.fetchMethods();
    },
  },
  mounted() {
    this.fetchMethods();
    // this.getMaxPageFromServer()
  },
  data() {
    return {
      currentMethod: "",
    };
  },
};
</script>

<style scoped>

@import './../../styles/adminpanel.css';


</style>