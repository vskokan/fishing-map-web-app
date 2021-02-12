<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Редактировать факт #{{ fact.id }}</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="review">Код отзыва</label>
                <select name="review" id="review" v-model="factToUpdate.review">
                    <option v-for="review in allReviews" :key="review.id" :value="review.id">{{ review.id + ' : ' + review.login }}</option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="fish">Код рыбы</label>
                <select name="fish" id="fish" v-model="factToUpdate.fish">
                    <option v-for="fish in allFishes" :key="fish.id" :value="fish.id">{{ fish.name }}</option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="bait">Код наживки</label>
                <select name="method" id="method" v-model="factToUpdate.bait">
                    <option v-for="bait in allBaits" :key="bait.id" :value="bait.id">{{ bait.name }}</option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="method">Код метода</label>
                <select name="method" id="method" v-model="factToUpdate.method">
                    <option v-for="method in allMethods" :key="method.id" :value="method.id">{{ method.name }}</option>
                </select>
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
    props: ['fact'],
    data() {
        return {
            factToUpdate: {
                id: "",
                review: "",
                fish: "", 
                method: "",
                bait: "",  
            }
        }
    },
    computed: mapGetters(['allReviews', 'allFishes', 'allBaits', 'allMethods']),
    methods: {
        ...mapActions(["updateFact", "fetchFacts", "fetchReviewsNoPagination", 'fetchFishesNoPagination', 'fetchBaitsNoPagination', 'fetchMethodsNoPagination']),
        ...mapMutations(['changeEditFormView']),
        send() {
            let formData = new FormData();

            formData.append('review', this.factToUpdate.review)
            formData.append('fish', this.factToUpdate.fish)
            formData.append('bait', this.factToUpdate.bait)
            formData.append('method', this.factToUpdate.method)

            let factToUpdate = {
                id: this.fact.id,
                formData: formData
            }

            this.updateFact(factToUpdate)
                .then(this.fetchFacts())
            this.closeForm()
        },
        closeForm() {
            this.changeEditFormView()
        }
    },
    created() {
        this.fetchReviewsNoPagination()
        this.fetchFishesNoPagination()
        this.fetchBaitsNoPagination()
        this.fetchMethodsNoPagination()

        this.factToUpdate.review = this.fact.review
        this.factToUpdate.fish = this.fact.fish
        this.factToUpdate.bait = this.fact.bait
        this.factToUpdate.method = this.fact.method

        //alert(this.fact.fish)
    }
}
</script>


<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        height: 400px;
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

    select {
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Rubik', sans-serif;
        width: 200px;
    }

</style>