<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Добавить отзыв</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="login">Пользователь</label>
                <select name="login" id="login" v-model="review.login">
                    <option v-for="user in allUsers" :key="user.login" :value="user.login">{{ user.login }}</option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="description">Описание</label>
                <textarea type="text" name="description" id="description" v-model="review.description" required />
            </div>
            <div class="inputContainer">
                <label for="baiting">Клёв</label>
                <input type="checkbox" name="baiting" id="baiting" v-model="review.isBaiting" required>
            </div>
            <div class="inputContainer">
                <label for="roadQuality">Качество проезда</label>
                <input type="checkbox" name="roadQuality" id="roadQuality" v-model="review.roadQuality" required>
            </div>
            <div class="inputContainer">
                <label for="fishingTime">Время рыбалки</label>
                <input type="text" name="fishingTime" id="fishingTime" v-model="review.fishingTime" required>
            </div>
            <div class="inputContainer">
                <label for="latitude">Широта</label>
                <input type="text" name="latitude" id="latitude" v-model="review.latitude" required>
            </div>
            <div class="inputContainer">
                <label for="longitude">Долгота</label>
                <input type="text" name="longitude" id="longitude" v-model="review.longitude" required>
            </div>
        </div>
        <div class="formButtons">
            <button class="button-simple" v-on:click="send">Ок</button>
            <button class="button-simple" v-on:click="closeForm">Отмена</button>
        </div>
    </div>
</template>

<script>

import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
    props: ['latitude', 'longitude'],
    data() {
        return {
            review: {
                login: '',
                date: '',
                description: '',
                isBaiting: '',
                roadQuality: '',
                fishingTime: '',
                longitude: '',
                latitude: ''
            }
        }
    },
    computed: mapGetters(['allUsers']),
    methods: {
        ...mapActions(["createReview", "fetchReviews", "fetchUsers"]),
        ...mapMutations(['insertReview', 'changeFormView']),
        send() {
            let formData = new FormData();

            formData.append('login', this.review.login)
            formData.append('description', this.review.description)
            formData.append('isBaiting', this.review.isBaiting)
            formData.append('roadQuality', this.review.roadQuality)
            formData.append('fishingTime', this.review.fishingTime)
            formData.append('latitude', this.review.latitude)
            formData.append('longitude', this.review.longitude)

 
            this.createReview(formData)
            .then(this.fetchReviews())
            this.closeForm()
        },
        closeForm() {
            this.changeFormView()
        }
    },
    mounted() {
        this.fetchUsers()
    },
    created() {
        this.review.latitude = this.latitude
        this.review.longitude = this.longitude
    }
}
</script>

<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        height: 500px;
        justify-items: center;
        align-items: center;
        background-color: #fff;
        /* border-radius: 5px; */
        padding-bottom: 20px;
        box-shadow: 0 0 60px rgba(14,42,71,.25);
    }


    .formHeader {
        width: 450px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .headerText {
        font-size: 34px;
        color: rgb(0, 0, 0);
        font-weight: 700;
        font-family: 'Inter', sans-serif;
    }

    #district {
        resize: none;
        height: 40px;
        width: 310px;
    }

    #name {
        width: 300px;
        height: 30px;
    }

    .formBody {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
    }

    .inputContainer {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .inputContainer label {
        font-weight: bold;
        align-self: center;
        color: rgb(91, 21, 148);
    }

    #name, #district {
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Rubik', sans-serif;
    }

</style>