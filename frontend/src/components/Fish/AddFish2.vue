<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Добавить рибу</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="fish.name" required>
            </div>
            <div class="inputContainerFile" >
                <label for="photo" class="custom-file-upload">Выбрать фото <i class="fas fa-file-upload"></i></label>
                <input type="file" name="photo" id="photo" accept=".jpg, .jpeg, .png" ref="file" v-on:change="uploadImage()" required>   
                <p>{{isFileChosen? this.fish.image.name:'Файл не выбран'}}</p> 
            </div>
            <div class="inputContainer">
                <label for="description">Описание</label>
                <textarea name="description" id="description" v-model="fish.description"></textarea>
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
    data() {
        return {
            fish: {
                name: "",
                image: "",
                description: ""    
            },
            isFileChosen: false
        }
    },
    methods: {
        ...mapActions(["createFish", "fetchFishes"]),
        ...mapMutations(['insertFish', 'changeFormView']),
        send() {
            let formData = new FormData();
            formData.append('name', this.fish.name)
            formData.append('image', this.fish.image)
            formData.append('description', this.fish.description)
            this.createFish(formData)
                .then(this.fetchFishes())
            this.closeForm()
        },
        uploadImage() {
            this.isFileChosen = true
            this.fish.image = this.$refs.file.files[0];
        },
        closeForm() {
            this.fish.image = ''
            this.isFileChosen = false
            this.changeFormView()
        }
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
        font-family: 'Rubik', sans-serif;
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