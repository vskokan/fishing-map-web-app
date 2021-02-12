<template>
    <div class="tableArea">
        <transition name="fade">
            <AddMethod class="addForm" v-if="showForm"/>
            <MethodCard class="cardForm" v-if="showCard" v-bind:method="currentMethod" />
            <EditMethod class="editForm" v-if="showEditForm" v-bind:method="currentMethod" />
        </transition>
        
        <div class="tableContainer">
            <div class="header">
                <h2>
                    Методы
                </h2>
                <button class="button-tableheader" @click="getForm">Добавить <i class="fas fa-plus"></i></button>
            </div>
            <table class="table">
                <thead>
                    <tr class="tableHeader">
                    <th>ID</th><th>Название</th><th>Описание</th><th>Действия</th>
                </tr>
                </thead>
                
                <!-- <tbody name="fadee" is="transition-group"> -->
                    <tr v-for="method in allMethods" :key="method.id" class="row"><td class="idCell">{{method.id}}</td><td class="nameCell">{{method.name}}</td><td class="descriptionCell">{{method.description.substr(0, 50) + '...'}}</td>
                    <td class="actionCell">
                        <button class="view" @click="chooseMethod(method)"><i class="fas fa-info"></i></button>
                        <button class="edit" @click="chooseMethodToUpdate(method)"><i class="fas fa-pen"></i></button>
                        <button class="delete" @click="deleteFromTable(method.id)"><i class="fas fa-trash-alt"></i></button>
                    </td>
                    </tr>
                <!-- </tbody> -->
                
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
import AddMethod from '@/components/Methods/AddMethod'
import MethodCard from '@/components/Methods/MethodCard'
import EditMethod from '@/components/Methods/EditMethod'

export default {
    components: {AddMethod, MethodCard, EditMethod},
    computed: mapGetters(["allMethods", "showForm", "showCard", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    methods: { 
        ...mapActions(["fetchMethods", "deleteMethod", "getMaxPageFromServer"]),
        ...mapMutations(['changeFormView', 'changeCardView', 'changeEditFormView', 'incrementCurrentPage', 'decrementCurrentPage']),
        getForm() {
            // alert(this.showForm)
            this.changeFormView()
            // alert(this.showForm)
        },
        deleteFromTable(id) {
            // alert(id)
            if (!this.showCard) {
                this.deleteMethod(id)
            } else {
                alert('Закройте все окна перед удалением')
            }
            
        },
        chooseMethod(method) {
            
            if (!this.showCard) {
                this.currentMethod = method
                this.changeCardView()
            }
            // this.changeCardView()
        },
        chooseMethodToUpdate(method) {
            
            if (!this.showEditForm) {
                this.currentMethod = method
                this.changeEditFormView()
            }
            // this.changeCardView()
        },
        getCard() {
            alert(this.showCard)
            if (!this.showCard) {
                this.changeCardView()
            }
            
        },
        getEditForm() {
            if (!this.showEditForm) {
                this.changeEditFormView()
            }
        },
        previousPage() {
            //alert(this.getCurrentPage)
            this.decrementCurrentPage()
            this.fetchMethods();
        },
        nextPage() {
            // this.getMaxPageFromServer()
            // alert(this.getMaxPage)
            this.incrementCurrentPage()
            this.fetchMethods()
        }
    },
    mounted() {
        
        this.fetchMethods()
        // this.getMaxPageFromServer()
    },
    data() {
        return {
            currentMethod: ''
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
        /* position: relative; */
        
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
        /* width: 1200px; */
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
        /* background-color: #fff; */
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
        /* tr:nth-child(1)  {
        background: rgb(101, 15, 172); 
        color: #fff; 
    } */

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
    .fadee-enter, .fadee-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }

</style>