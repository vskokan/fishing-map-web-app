<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Редактировать населенный пункт #{{place.id + ' ' + place.name}}</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="placeToUdpate.name" required>
            </div>
            <div class="inputContainer">
                <label for="name">Район</label>
                <!-- <input type="text" name="name" id="name" v-model="placeToUdpate.region" required> -->
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

import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
    props: ['place'],
    data() {
        return {
            placeToUdpate: {
                id: "",
                name: "",
                region: ""
            }
        }
    },
    computed: mapGetters(['allRegions']),
    methods: {
        ...mapActions(["updatePlace", "fetchPlaces", "fetchRegionsNoPagination"]),
        ...mapMutations(['changeEditFormView']),
        send() {
            const id = this.place.id
            const name = this.placeToUdpate.name
            const region = this.place.region
            // alert(id)
            alert(region)
            let formData = new FormData();
            // formData.append('id', id)
            formData.append('name', name)
            formData.append('region', region)
            let placeToUdpate = {
                id: id,
                formData: formData
            }
            this.updatePlace(placeToUdpate)
                .then(this.fetchPlaces())
            this.closeForm()
        },
        closeForm() {
            this.changeEditFormView()
        }
    },
    mounted() {
        this.placeToUdpate.name = this.place.name
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
        height: 350px;
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

    #region {
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