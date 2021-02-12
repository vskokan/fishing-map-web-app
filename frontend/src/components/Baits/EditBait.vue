<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Редактировать приманку #{{bait.id + ' ' + bait.name}}</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="baitToUdpate.name" required>
            </div>
            <div class="inputContainer">
                <label for="description">Описание</label>
                <textarea name="description" id="description" v-model="baitToUdpate.description"></textarea>
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

export default {
    props: ['bait'],
    data() {
        return {
            baitToUdpate: {
                id: "",
                name: "",
                description: ""
            }
        }
    },
    methods: {
        ...mapActions(["updateBait", "fetchBaits"]),
        ...mapMutations(['changeEditFormView']),
        send() {
            const id = this.bait.id
            console.log(id)
            const name = this.baitToUdpate.name
            const description = this.baitToUdpate.description
            alert(name)
            let formData = new FormData();
            formData.append('id', id)
            formData.append('name', name)
            formData.append('description', description)
            this.updateBait(formData)
            .then(this.fetchBaits())
            this.closeForm()
        },
        closeForm() {
            this.changeEditFormView()
        }
    },
    mounted() {
        this.baitToUdpate.name = this.bait.name
        this.baitToUdpate.description = this.bait.description
    }
}
</script>


<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        height: 450px;
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