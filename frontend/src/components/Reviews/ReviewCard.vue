<template>
    <div class="card">
        <!-- <h2 class="name">{{review.id}}</h2> -->
         <!-- <MyLoader class="load" v-if="isReviewLoading" />
        <div v-if="isReviewLoading">
            Ждем ответ с сервера
        </div> -->
        <div v-if="!isReviewLoading">
            <div class="reviewHeader">
            <div class="userInfo">
                 <!-- <router-link :to="'/user/' + review.login" >{{review.login}}</router-link> -->
                <!-- <img class="avatar" :src="'http://localhost:3000/' + review.avatar"> -->
                <div class="login"><router-link :to="'/user/' + currentReview.baseInfo.login" >{{currentReview.baseInfo.login}}</router-link> <div class="userRating"> <i class="fas fa-trophy"></i>{{review.userrating}}</div></div>
                
            </div>
            <div class="reviewInfo">
                <p class="date"><i class="fas fa-calendar-alt"></i>{{currentReview.baseInfo.date}}</p>
                <p class="reviewRating"><i class="fas fa-minus"></i>{{currentReview.rating}}<i class="fas fa-plus"></i></p>
            </div>
        </div>
        
        
        
        
        <p class="description">{{currentReview.baseInfo.description}}</p>

        <div class="info">
            <div class="road"><i class="fas fa-car"></i>{{currentReview.baseInfo.roadDescription}}</div>
            <div class="baiting"><i :class="{ 'fas fa-fish': currentReview.baseInfo.baitingDescription, 'fas fa-thumbs-down': !currentReview.baseInfo.baitingDescription}" ></i>{{currentReview.baseInfo.baitingDescription}}</div>
            <div class="time"><i class="fas fa-clock"></i>{{currentReview.baseInfo.timeDescription}}</div>
        </div>
   
        <Facts v-bind:review="currentReview" />
        <ReviewPhotos v-bind:review="currentReview" />
        </div>
        
       
        <div class="formButtons">
            <button class="button-simple close" v-on:click="closeForm">Закрыть</button>
        </div>
    </div>
</template>

<script>

import { mapActions} from 'vuex'
import { mapGetters} from 'vuex'
import { mapMutations } from "vuex";

import Facts from '@/components/Reviews/Facts.vue'
import ReviewPhotos from '@/components/Reviews/ReviewPhotos.vue'
//import MyLoader from '@/components/MyLoader.vue'

export default {
    props: ['review'],
    components: {
        Facts,
        ReviewPhotos,
        //MyLoader,
    },
    computed: mapGetters(['currentReview', 'isReviewLoading']),
    // data() {
    //     return {
    //         currentReview: review
    //     }
    // },
        watch: {
        review: function (newVal) {
            // alert(newVal.id)
            this.getOne(newVal.id)
        }
    },
    // computed: mapGetters(['allFacts']),
    methods: {
        ...mapMutations(['changeCardView']),
        ...mapActions(['findFactsByReview', 'getOne']),
        closeForm() {
            this.changeCardView()
        }
    },
    created() {
        this.getOne(this.review.id)
    }
}
</script>

<style scoped>
    load {
        height: 350px;
        width: 700px;
        position: relative;
        top: 10px;
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 700px;
        color: #000;
        min-height: 250px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        padding-bottom: 20px;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px;
        font-style: normal;
        /* box-shadow: 0 0 60px rgba(14,42,71,.25); */
    }

    .name {
        margin-top: 10px;
        font-family: 'Inter', sans-serif;

    }

    .description {
        margin: 10px;
        margin-bottom: 20px;
          font-family: "Rubik", sans-serif;
          font-size: 20px;
          width: 500px;
        text-align: left;
                margin-left: 30px;

          

    }

    .info {
        display: flex;
        flex-direction: row;
        width: 550px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
        font-family: 'Inter', sans-serif;

    }

    .fas {
        margin-right: 5px;
    }

    .avatar {
        width: 90px;
        height: 90px;
        clip-path: circle(45px at center);
        margin-right: 5px;
        object-fit: cover;
    }

    .userInfo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        margin-left: 20px;
    }

    .reviewInfo {
        margin-top: 20px;
        margin-right: 20px;
    }

    .reviewHeader {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .login {
        font-size: 32px;
        margin-left: 5px;
    font-family: 'Baloo Chettan 2', cursive;        
    /* font-weight: bold; */
    }

    .userRating {
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        margin-left: 5px;
        /* font-size: 32px; */
    }

    .fa-plus, .fa-munis {
        margin-left: 5px
    }

    .button-simple {
        margin-top: 25px;
    }

    .reviewRating {
        font-size: 18px;
        margin-top: 5px;
    }


</style>