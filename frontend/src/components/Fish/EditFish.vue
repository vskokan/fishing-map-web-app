<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Редактировать рибу #{{fish.id + ' ' + fish.name}}</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="fishToUdpate.name" required>
            </div>
            <div class="inputContainer">
                <img class="image" :src="'http://localhost:3000/'+fish.img_src">
            </div>
            <div class="inputContainerFile" >
                <label for="photo" class="custom-file-upload">Выбрать фото <i class="fas fa-file-upload"></i></label>
                <input type="file" name="photo" id="photo" accept=".jpg, .jpeg, .png" ref="file" v-on:change="uploadImage()" required>   
                <p>{{isFileChosen? this.fishToUdpate.image.name:'Новый файл не выбран'}}</p> 
            </div>
            <div class="inputContainer">
                <label for="description">Описание</label>
                <textarea name="description" id="description" v-model="fishToUdpate.description"></textarea>
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
    props: ['fish'],
    data() {
        return {
            fishToUdpate: {
                id: "",
                name: "",
                description: ""
            },
            isFileChosen: false
        }
    },
    methods: {
        ...mapActions(["updateFish", "fetchFishes"]),
        ...mapMutations(['changeEditFormView']),
        send() {
            const id = this.fish.id
            console.log(id)
            const name = this.fishToUdpate.name
            const image = this.fishToUdpate.image
            const description = this.fishToUdpate.description
            alert(name)
            let formData = new FormData();
            // formData.append('id', id)
            formData.append('name', name)
            formData.append('image', image)
            formData.append('description', description)

            const data = {
                id: id,
                formData: formData
            }

            this.updateFish(data)
            .then(this.fetchFishes())
            this.closeForm()
        },
        closeForm() {
            this.isFileChosen = false
            this.changeEditFormView()
        },
        uploadImage() {
            this.isFileChosen = true
            this.fishToUdpate.image = this.$refs.file.files[0];
        }
    },
    mounted() {
        this.fishToUdpate.name = this.fish.name
        this.fishToUdpate.description = this.fish.description
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
        justify-content: center;
        margin-bottom: 20px;
    }

    .inputContainer label {
        font-weight: bold;
        margin-right: 10px;
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

    .image {
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    img {
        width: 100%;
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 50%;
        cursor: pointer;
        height: 40px;
        font-size: 22px;
        border: none;
        background-color:  rgb(101, 15, 172);
        color: rgb(255, 255, 255);
        margin: 10px 0px 0px 10px;
        margin: auto;
    }
    .inputContainerFile {
        margin-bottom: 20px;
        justify-self: center;
    }

    .fa-file-upload {
        margin-left: 10px;
    }

    .custom-file-upload:hover {
        cursor: pointer;
    }

</style>