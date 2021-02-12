<template>
    <div class="container">
        <form class="passwordChangeForm">
            <div class="formHeader">
                <div class="headerText">Изменение пароля {{user.login}}</div>
            </div>
            <div class="inputContainer">
                <label for="oldPassword">
                    Введите старый пароль
                </label>
                <input type="text" name="oldPassword" id="oldPassword" v-model="userToUpdate.oldPassword" required>
            </div>
            <div class="inputContainer">
                <label for="newPassword">
                    Введите новый пароль
                </label>
                <input type="text" name="newPassword" id="newPassword"  v-model="userToUpdate.newPassword" required>
            </div>
        </form>
        <div class="formButtons">
            <button class="button-simple" v-on:click="send">Ок</button>
            <button class="button-simple" v-on:click="closeForm">Отмена</button>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapMutations } from "vuex";
//import { mapGetters } from "vuex";

export default {
    props: ['user'],
    data() {
        return {
            userToUpdate: {
                login: "",
                oldPassword: "",
                newPassword: ""
            }
        }
    },
    //computed: mapGetters(["allUsers", "showForm", "showCard", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    methods: { 
        ...mapActions(["updateUserPassword_AdminPanel"]),
        ...mapMutations(['changePasswordFormView']),
        closeForm() {
            this.changePasswordFormView()
        },
        send() {
            const login = this.user.login
            const oldPassword = this.userToUpdate.oldPassword
            const newPassword = this.userToUpdate.newPassword

            alert(oldPassword, newPassword)

            let formData = new FormData()

            
            formData.append('oldPassword', oldPassword)
            formData.append('newPassword', newPassword)

            const data = {
                login: login,
                formData: formData
            }

            console.log(data)
            this.updateUserPassword_AdminPanel(data)
                // .then(res => {
                //     const data = res.status
                //     alert(data)
                // })
        },
        mounted() {
            this.userToUpdate.login = this.user.login
        }
    }
    
}
</script>

<style scoped>
    
    .container {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 500px;
        height: 250px;
        justify-items: center;
        align-items: center;
        background-color: rgb(255, 255, 255);
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
        font-size: 20px;
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

    #oldPassword, #newPassword {
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Inter', sans-serif;
    }

    .formButtons {
        background-color: #fff;
        padding-bottom: 10px;
    }

</style>