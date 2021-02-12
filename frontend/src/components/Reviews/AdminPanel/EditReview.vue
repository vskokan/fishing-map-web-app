<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Редактировать отзыв #{{ review.id }} пользователя {{ review.login }}</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="description">Описание</label>
                <textarea type="text" name="description" id="description" v-model="reviewToUpdate.description" required />
            </div>
            <div class="inputContainer">
                <label for="baiting">Клёв</label>
                <input type="checkbox" name="baiting" id="baiting" v-model="reviewToUpdate.isBaiting" required>
            </div>
            <div class="inputContainer">
                <label for="roadQuality">Качество проезда</label>
                <input type="checkbox" name="roadQuality" id="roadQuality" v-model="reviewToUpdate.roadQuality" required>
            </div>
            <div class="inputContainer">
                <label for="fishingTime">Время рыбалки</label>
                <input type="text" name="fishingTime" id="fishingTime" v-model="reviewToUpdate.fishingTime" required>
            </div>
            <div class="inputContainer">
                <label for="latitude">Широта</label>
                <input type="text" name="latitude" id="latitude" v-model="reviewToUpdate.latitude" required>
            </div>
            <div class="inputContainer">
                <label for="longitude">Долгота</label>
                <input type="text" name="longitude" id="longitude" v-model="reviewToUpdate.longitude" required>
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
//import { mapGetters } from "vuex";

export default {
    props: ['review'],
    data() {
        return {
            reviewToUpdate: {
                id: "",
                login: "",
                description: "",
                isBaiting: "",
                roadQuality: "",
                fishingTime: "",
                raiting: "",
                latitude: "",
                longitude: ""
            }
        }
    },
    //computed: mapGetters(['allDistricts']),
    methods: {
        ...mapActions(["updateReview", "fetchReviews"]),
        ...mapMutations(['changeEditFormView']),
        send() {
            const id = this.review.id
            const login = this.review.login

            const description = this.reviewToUpdate.description
            const isBaiting = this.reviewToUpdate.isBaiting
            const roadQuality = this.reviewToUpdate.roadQuality
            const fishingTime = this.reviewToUpdate.fishingTime
            const raiting = this.reviewToUpdate.raiting
            const latitude = this.reviewToUpdate.latitude
            const longitude = this.reviewToUpdate.longitude


            // alert(id)
            //alert(district)
            let formData = new FormData();
            // formData.append('id', id)
            formData.append('login', login)
            formData.append('description', description)
            formData.append('isBaiting', isBaiting)
            formData.append('roadQuality', roadQuality)
            formData.append('fishingTime', fishingTime)
            formData.append('raiting', raiting)
            formData.append('latitude', latitude)
            formData.append('longitude', longitude)

            let reviewToUpdate = {
                id: id,
                formData: formData
            }
            this.updateReview(reviewToUpdate)
                .then(this.fetchReviews())
            this.closeForm()
        },
        closeForm() {
            this.changeEditFormView()
        }
    },
    created() {
        this.reviewToUpdate.description = this.review.description
        this.reviewToUpdate.isBaiting = this.review.isbaiting
        this.reviewToUpdate.roadQuality = this.review.roadquality
        this.reviewToUpdate.raiting = this.review.raiting
        this.reviewToUpdate.fishingTime = this.review.fishingtime
        this.reviewToUpdate.latitude = this.review.latitude
        this.reviewToUpdate.longitude = this.review.longitude

        console.log(this.reviewToUpdate)
        //this.fetchDistrictsNoPagination()
    }
}
</script>


<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        height: 600px;
        justify-items: center;
        align-items: center;
        background-color: #fff;
        padding-bottom: 20px;
        box-shadow: 0 0 60px rgba(14,42,71,.25);
    }


    .formHeader {
        width: 450px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .headerText {
        font-size: 28px;
        color: rgb(0, 0, 0);
        font-weight: 700;
        font-family: 'Inter', sans-serif;
    }

    #description {
        resize: none;
        height: 150px;
        width: 300px;
    }

    #district {
        resize: none;
        height: 40px;
        width: 310px;
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Rubik', sans-serif;
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

    #name, #description {
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Inter', sans-serif;
    }

</style>