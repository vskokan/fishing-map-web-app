<template>
    <div class="tableArea">
        <transition name="fade">
            <AddFact class="addForm" v-if="showForm"/>
            <EditFact class="editForm" v-if="showEditForm" v-bind:fact="currentFact" />
        </transition>
        
        <div class="tableContainer">
            <div class="header">
                <h2>
                    Факты
                </h2>
                <button class="button-tableheader" @click="getForm">Добавить <i class="fas fa-plus"></i></button>
            </div>
            <table class="table">
                <thead>
                    <tr class="tableHeader">
                    <th>ID</th>
                    <th>Отзыв</th>
                    <th>Рыба</th>
                    <th>Приманка</th>
                    <th>Метод</th>
                    <th>Действия</th>
                </tr>
                </thead>
                    <tr v-for="fact in allFacts" :key="fact.id" class="row">
                        <td class="idCell">{{fact.id}}</td>
                        <td class="reviewCell">{{fact.review}}</td>
                        <td class="fishCell">{{fact.fishname}}</td>
                        <td class="baitCell">{{fact.baitname}}</td>
                        <td class="methodCell">{{fact.methodname}}</td>
                        <td class="actionCell">
                            <button class="edit" @click="chooseFactToUpdate(fact)"><i class="fas fa-pen"></i></button>
                            <button class="delete" @click="deleteFromTable(fact.id)"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
            </table>
           
        </div>
        <div class="navigationButtons">
            <button class="previous" @click="previousPage"><i class="fas fa-arrow-left"></i></button>
            <button class="next" @click="nextPage"><i class="fas fa-arrow-right"></i></button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddFact from '@/components/Reviews/AdminPanel/AddFact'
import EditFact from '@/components/Reviews/AdminPanel/EditFact'

export default {
    components: {AddFact, EditFact},
    computed: mapGetters(["allFacts", "showForm", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    
    methods: { 
        ...mapActions(["fetchFacts", "deleteFact", "getMaxPageFromServer"]),
        ...mapMutations(['changeFormView', 'changeEditFormView', 'incrementCurrentPage', 'decrementCurrentPage']),
        getForm() {
            this.changeFormView()
        },
        deleteFromTable(id) {
            if (!this.showCard) {
                this.deleteFact(id)
            } else {
                alert('Закройте все окна перед удалением')
            }
            
        },
        chooseFactToUpdate(fact) {
            if (!this.showEditForm) {
                this.currentFact = fact
                this.changeEditFormView()
            }
        },
        getEditForm() {
            if (!this.showEditForm) {
                this.changeEditFormView()
            }
        },
        previousPage() {
            this.decrementCurrentPage()
            this.fetchFacts();
        },
        nextPage() {
            this.incrementCurrentPage()
            this.fetchFacts()
        },
        
    },
    created() {
        this.fetchFacts()
    },
    data() {
        return {
            currentFact: ''
        }
    }
}

</script>

<style scoped>
    .tableContainer {
        /* height: 720px; */
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 0;
        
    }
    .tableArea {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* width: 80%; */
        height: 70vh;
        background-color: #fff;
        box-shadow: 0 0 60px rgba(14,42,71,.25);
        z-index: 0;
        
    }
    table {
        border-collapse: collapse;
        background-color: #fff;
        z-index: 0;
        
    }
    .tableHeader {
        background-color: rgb(101, 15, 172);
        color: #fff;
        height: 80px;
        font-size: 24px;
        font-weight: 700;
        z-index: 0;
    }

    td {
        padding: 5px;
        border-bottom: 1px solid rgb(236, 236, 236);
        height: 50px;
    }

    .navigationButtons {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 15px;
        background: transparent;
        border: transparent
        
    }

    .navigationButtons button {
        background: transparent;
        border: transparent;
        font-size: 20px
    }

    .navigationButtons button:hover {
        cursor: pointer;
    }

    .edit, .view, .delete {
        width: 30px;
        height: 30px;
        background: transparent;
        border: transparent
    }

    .edit:hover, .view:hover, .delete:hover {
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
        width: 300px;
    }

    .actionCell {
        width: 150px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .row:nth-child(even) {background: #fff}
    .row:nth-child(odd) {background: rgb(248, 248, 248)}


   .tableHeader {
        background-color: rgb(101, 15, 172);
        color: #fff;
        height: 80px;
        font-size: 24px;
        font-weight: 700;
        z-index: 0;
    }

   .addForm, .cardForm, .editForm {
       position: absolute;
       margin: auto;
       margin-top: 50px;
       z-index: 5;
   }

   .fade-enter-active, .fade-leave-active {
        transition: all 0.3s;
      }
      .fade-enter, .fade-leave-to  {
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
        background-color: rgb(101, 15, 172);
        color: #fff;
    }

    .header h2  {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 48px;
    }

    .fadee-enter-active, .fadee-leave-active {
    transition: opacity .5s;
    }
    .fadee-enter, .fadee-leave-to {
    opacity: 0;
    }

</style>