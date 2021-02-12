<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Добавить населенный пункт</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="place.name" required>
            </div>
            <div class="inputContainer">
                <label for="region">Район</label>
                <!-- <input type="text" name="region" id="region" v-model="fish.region" required> -->
                <select name="region" id="region" v-model="place.region">
                    <option v-for="region in allRegions" :key="region.id" :value="region.id">{{region.name}}</option>
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
// import placeData from "../../services/placeData";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            place: {
                name: "",
                region: ""
            }
        }
    },
    computed: mapGetters(['allRegions']),
    methods: {
        ...mapActions(["createPlace", "fetchPlaces", "fetchRegionsNoPagination"]),
        ...mapMutations(['insertPlace', 'changeFormView']),
        send() {
            let formData = new FormData();
            formData.append('name', this.place.name)
            formData.append('region', this.place.region)

            alert(this.place.name)
            alert(this.place.region)
            this.createPlace(formData)
            .then(this.fetchPlaces())
            this.closeForm()
        },
        closeForm() {
            this.changeFormView()
        }
    },
    mounted() {
        this.fetchRegionsNoPagination()
    }
}
</script>

<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        height: 420px;
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
        /* border-top-left-radius: 5px;
        border-top-right-radius: 5px; */
        /* background: rgb(101, 15, 172); */
        
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

    #region {
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

    #name, #region {
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