<template>
    <div class="tableArea">
        <transition name="fade">
            <AddPlace class="addForm" v-if="showForm"/>
            <PlaceCard class="cardForm" v-if="showCard" v-bind:place="currentPlace" />
            <EditPlace class="editForm" v-if="showEditForm" v-bind:place="currentPlace" />
        </transition>
        
        <div class="tableContainer">
            <div class="header">
                <h2>
                    Населенные пункты
                </h2>
                <button class="button-tableheader" @click="getForm">Добавить <i class="fas fa-plus"></i></button>
            </div>
            <table class="table">
                <thead>
                    <tr class="tableHeader">
                    <th>ID</th><th>Название</th><th>Район</th><th>Действия</th>
                </tr>
                </thead>
                
                <!-- <tbody name="fadee" is="transition-group"> -->
                    <tr v-for="place in allPlaces" :key="place.id" class="row"><td class="idCell">{{place.id}}</td><td class="nameCell">{{place.name}}</td><td class="descriptionCell">{{place.region}}</td>
                    <td class="actionCell">
                        <button class="view" @click="choosePlace(place)"><i class="fas fa-info"></i></button>
                        <button class="edit" @click="choosePlaceToUpdate(place)"><i class="fas fa-pen"></i></button>
                        <button class="delete" @click="deleteFromTable(place.id)"><i class="fas fa-trash-alt"></i></button>
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
import AddPlace from '@/components/Places/AddPlace'
import PlaceCard from '@/components/Places/PlaceCard'
import EditPlace from '@/components/Places/EditPlace'

export default {
    components: {AddPlace, PlaceCard, EditPlace},
    computed: mapGetters(["allPlaces", "showForm", "showCard", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    
    methods: { 
        ...mapActions(["fetchPlaces", "deletePlace", "getMaxPageFromServer"]),
        ...mapMutations(['changeFormView', 'changeCardView', 'changeEditFormView', 'incrementCurrentPage', 'decrementCurrentPage']),
        getForm() {
            this.changeFormView()
        },
        deleteFromTable(id) {
            if (!this.showCard) {
                this.deletePlace(id)
            } else {
                alert('Закройте все окна перед удалением')
            }
            
        },
        choosePlace(place) {
            if (!this.showCard) {
                this.currentPlace = place
                this.changeCardView()
            }
        },
        choosePlaceToUpdate(place) {
            if (!this.showEditForm) {
                this.currentPlace = place
                this.changeEditFormView()
            }
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
            this.decrementCurrentPage()
            this.fetchPlaces();
        },
        nextPage() {
            this.incrementCurrentPage()
            this.fetchPlaces()
        },
        
    },
    mounted() {
        
        this.fetchPlaces()
    },
    data() {
        return {
            currentPlace: ''
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