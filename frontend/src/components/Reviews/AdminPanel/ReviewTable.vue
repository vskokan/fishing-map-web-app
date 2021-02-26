<template>
    <div class="tableArea">
        <transition name="fade">
            <AddReview class="addForm" v-if="showForm"/>
            <ReviewCard class="cardForm" v-if="showCard" v-bind:review="currentReview" />
            <EditReview class="editForm" v-if="showEditForm" v-bind:review="currentReview" />
        </transition>
        
        <div class="tableContainer">
            <div class="header">
                <h2>
                    Отзывы
                </h2>
                <!-- <button class="button-tableheader" @click="getForm">Добавить <i class="fas fa-plus"></i></button> -->
            </div>
            <table class="table">
                <!-- <thead> -->
                <tr class="tableHeader">
                    <th>id</th>
                    <th>Логин</th>
                    <th>Дата</th>
                    <th>Описание</th>
                    <th>Дорога</th>
                    <th>Клёв</th>
                    <th>Время</th>

                    <th>Действия</th>
                </tr>
                <!-- </thead> -->
                    <tr v-for="review in allReviews" :key="review.id" class="row">
                        <td class="idCell">{{review.id}}</td>
                        <td class="loginCell">{{review.login}}</td>
                        <td class="dateCell">{{review.date}}</td>
                        <td class="descriptionCell">{{review.description.substr(0, 50) + "..."}}</td>
                        <td class="roadCell">{{review.roadDescription}}</td>
                        <td class="baitingCell">{{review.baitingDescription}}</td>
                        <td class="timeCell">{{review.timeDescription}}</td>
 
                        <td class="actionCell">
                            <button class="view" @click="chooseReview(review)"><i class="fas fa-info"></i></button>
                            <!-- <button class="edit" @click="chooseReviewToUpdate(review)"><i class="fas fa-pen"></i></button> -->
                            <button class="delete" @click="deleteFromTable(review.id)"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
            </table>
           
        </div>
        <!-- <div class="navigationButtons">
            <button class="previous" @click="previousPage"><i class="fas fa-arrow-left"></i></button>
            <button class="next" @click="nextPage"><i class="fas fa-arrow-right"></i></button>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddReview from '@/components/Reviews/AdminPanel/AddReview'
import ReviewCard from '@/components/Reviews/AdminPanel/ReviewCard'
import EditReview from '@/components/Reviews/AdminPanel/EditReview'

export default {
    components: {AddReview, ReviewCard, EditReview},
    computed: mapGetters(["allReviews", "showForm", "showCard", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    methods: { 
        ...mapActions(["fetchReviews", "deleteReview", "getReviewMaxPageFromServer"]),
        ...mapMutations(['changeFormView', 'changeCardView', 'changeEditFormView', 'incrementCurrentPage', 'decrementCurrentPage']),
        getForm() {
            // alert(this.showForm)
            this.changeFormView()
            // alert(this.showForm)
        },
        deleteFromTable(id) {
            // alert(id)
            if (!this.showCard) {
                this.deleteReview(id)
            } else {
                alert('Закройте все окна перед удалением')
            }
            
        },
        chooseReview(review) {
            
            if (!this.showCard) {
                this.currentReview = review
                this.changeCardView()
            }
            // this.changeCardView()
        },
        chooseReviewToUpdate(review) {
            
            if (!this.showEditForm) {
                this.currentReview = review
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
            // alert(this.getCurrentPage)
            this.decrementCurrentPage()
            this.fetchReviews();
        },
        nextPage() {
            // this.getMaxPageFromServer()
            // alert(this.getMaxPage)
            this.incrementCurrentPage()
            this.fetchReviews()
        }
    },
    mounted() {
        
        this.fetchReviews()
        // this.getMaxPageFromServer()
    },
    data() {
        return {
            currentReview: ''
        }
    }
}

</script>

<style scoped>
@import './../../../styles/adminpanel.css';

.tableHeader {
   color: #000;
  
}

.table {
    /* margin-top: 20px; */
}

.tableArea {
    min-height:70vh;
    height: auto;
    width: 80vw;
}

.row {
    color: #000;
}

.actionCell {
    width: 60px;
}

.tableArea {
    padding: 10px 0px;
}

</style>