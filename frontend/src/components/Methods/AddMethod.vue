<template>
    <div class="form"> 
        <div class="formHeader">
            <div class="headerText">Добавить метод ловли</div>
        </div>
        <div class="formBody">
            <div class="inputContainer">
                <label for="name">Название</label>
                <input type="text" name="name" id="name" v-model="method.name" required>
            </div>
            <div class="inputContainer">
                <label for="description">Описание</label>
                <!-- <input type="text" name="description" id="description" v-model="fish.description" required> -->
                <textarea name="description" id="description" v-model="method.description"></textarea>
            </div>
        </div>
        <div class="formButtons">
            <button class="button-simple" v-on:click="send">Ок</button>
            <button class="button-simple" v-on:click="closeForm">Отмена</button>
        </div>
    </div>
</template>

<script>
// import methodData from "../../services/methodData";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            method: {
                name: "",
                description: ""
            }
        }
    },
    methods: {
        ...mapActions(["createMethod", "fetchMethods"]),
        ...mapMutations(['insertMethod', 'changeFormView']),
        send() {
            //alert(this.fish.name)
            let formData = new FormData();
            formData.append('name', this.method.name)
            formData.append('description', this.method.description)
            this.createMethod(formData)
            .then(this.fetchMethods())
            this.closeForm()
            // methodData.create(formData)
            //     .then(response => {
            //     this.method.name = response.data;
            //     console.log(response.data);
            //     //this.submitted = true;
            //     })
            //     .catch(e => {
            //     console.log(e);
            //     });
            //alert(formData.get('image'))
        },
        closeForm() {
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

</style>