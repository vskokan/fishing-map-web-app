<template>
    <div class="card">
        <!-- <h2 class="name">{{review.id}}</h2> -->
        <div class="reviewHeader">
            <div class="userInfo">
                <img class="avatar" :src="'http://localhost:3000/' + review.avatar">
                <div class="login">{{review.login}} <div class="userRating"> <i class="fas fa-trophy"></i>{{review.userrating}}</div></div>
                
            </div>
            <div class="reviewInfo">
                <p class="date"><i class="fas fa-calendar-alt"></i>{{review.date}}</p>
                <p class="reviewRating"><i class="fas fa-minus"></i>{{review.raiting}}<i class="fas fa-plus"></i></p>
            </div>
        </div>
        
        
        
       
        
        <p class="description">{{review.description}}</p>

        <div class="info">
            <div class="road"><i class="fas fa-car"></i>{{review.road}}</div>
            <div class="baiting"><i :class="{ 'fas fa-fish': review.baiting, 'fas fa-thumbs-down': !review.baiting}" ></i>{{review.baiting}}</div>
            <div class="time"><i class="fas fa-clock"></i>{{review.time}}</div>
        </div>
   
        <!-- <p class="description">{{review.latitude}}</p>
        <p class="description">{{review.longitude}}</p> -->
        <!-- <p v-for="fact in allFacts" :key="fact.id">{{fact.fish + ' ' + fact.bait + ' ' + fact.method}}</p> -->
        <Facts v-bind:review="review.id" />
        <ReviewPhotos v-bind:review="review.id" />
       
        <div class="formButtons">
            <button class="button-simple close" v-on:click="closeForm">Закрыть</button>
        </div>
    </div>
</template>

<script>

import { mapActions} from 'vuex'
// import { mapGetters} from 'vuex'
import { mapMutations } from "vuex";

import Facts from '@/components/Reviews/Facts.vue'
import ReviewPhotos from '@/components/Reviews/ReviewPhotos.vue'


export default {
    props: ['review'],
    components: {
        Facts,
        ReviewPhotos,
    },

    // computed: mapGetters(['allFacts']),
    methods: {
        ...mapMutations(['changeCardView']),
        ...mapActions(['findFactsByReview']),
        closeForm() {
            this.changeCardView()
        }
    },
    created() {
        
    }
}
</script>

<style scoped>
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