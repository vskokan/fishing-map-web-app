<template>
    <div class="form"> 
        <ChangePassword class="changePasswordForm" v-if="showChangePasswordForm" v-bind:user="user" />
        <div class="formHeader">
            <div class="headerText">Редактировать пользователя {{user.login}}</div>
        </div>
        <div class="formBody">
            <div class="mainSettings">
                <p class="settingsHeader">
                    Основные настройки
                </p>
                <div class="settings">
                    <div class="fieldSettings">
                        <div class="inputContainer">
                            <label for="name">Логин</label>
                            <input type="text" name="name" id="login" v-model="userToUdpate.login" required>
                        </div>
                        <div class="inputContainer">
                            <label for="name">Почта</label>
                            <input type="text" name="name" id="email" v-model="userToUdpate.email" required>
                        </div>
                        <!-- <div class="inputContainer">
                            <label for="name">Пароль</label>
                            <input type="text" name="name" id="password" v-model="userToUdpate.password" required>
                        </div> -->
                        <div class="inputContainer">
                            <label for="description">Имя</label>
                            <input name="description" id="name" v-model="userToUdpate.name">
                        </div>
                        <div class="inputContainer">
                            <label for="district">Локация</label>
                            <select name="district" id="place" v-model="userToUdpate.place">
                                <option v-for="place in allPlaces" :key="place.id" :value="place.id">{{place.name}}</option>
                            </select>
                        </div>
                        <button class="passwordSettingsButton" v-on:click="getChangePasswordForm">
                            Смена пароля <i class="fas fa-lock"></i>
                        </button>
                    </div>
                    <div class="avatarSettings">
                        <div class="inputContainer">
                            <img class="avatar" :src="'http://localhost:3000/' + user.avatar">
                        </div>
                        <div class="inputContainerFile" >
                            <label for="photo" class="custom-file-upload">Выбрать фото <i class="fas fa-file-upload"></i></label>
                            <input type="file" name="photo" id="photo" accept=".jpg, .jpeg, .png" ref="file" v-on:change="uploadImage()" required>   
                            <p>{{isFileChosen? this.userToUdpate.avatar.name:'Новый файл не выбран'}}</p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="additionalSettings">
                <p class="settingsHeader">
                    Дополнительные настройки
                </p>
                <div class="fieldSettings">
                    <div class="inputContainer">
                        <label for="description">Администратор</label>
                        <input type="checkbox" name="description" id="admin" v-model="userToUdpate.admin">
                    </div>
                    <div class="inputContainer">
                        <label for="description">Рейтинг</label>
                        <input type="text" name="description" id="raiting" v-model="userToUdpate.raiting">
                    </div>
                </div>                
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
import ChangePassword from "@/components/Users/ChangePassword"
export default {
    props: ['user'],
    components: { ChangePassword },
    data() {
        return {
            userToUdpate: {
                login: "",
                email: "",
                //password: "",
                avatar: "",
                name: "",
                place: "",
                admin: "",
                raiting: ""
            },
            isFileChosen: false
        }
    },
    computed: mapGetters(['allPlaces', 'showChangePasswordForm']),
    methods: {
        ...mapActions(["updateUser", "fetchPlacesNoPagination"]),
        ...mapMutations(['changeEditFormView', 'changePasswordFormView']),
        getChangePasswordForm() {
            this.changePasswordFormView()
        },
        send() {
            const oldLogin = this.user.login
            //console.log(id)
            const login = this.userToUdpate.login
            const email = this.userToUdpate.email
            //const password = this.userToUdpate.password
            const name = this.userToUdpate.name
            const avatar = this.userToUdpate.avatar
            const place = this.userToUdpate.place
            const admin = this.userToUdpate.admin
            const raiting = this.userToUdpate.raiting
            //alert(name)
            let formData = new FormData();
            // formData.append('id', id)
            formData.append('login', login)
            formData.append('email', email)
            //formData.append('password', password)
            formData.append('name', name)
            formData.append('avatar', avatar)
            formData.append('place', place)
            formData.append('admin', admin)
            formData.append('raiting', raiting)

            const data = {
                login: oldLogin,
                formData: formData
            }

            this.updateUser(data)
            //.then(this.fetchUsers())
            this.closeForm()
        },
        closeForm() {
            this.isFileChosen = false
            this.changeEditFormView()
        },
        uploadImage() {
            this.isFileChosen = true
            this.userToUdpate.avatar = this.$refs.file.files[0];
        }
    },
    mounted() {
        this.userToUdpate.login = this.user.login
        this.userToUdpate.email = this.user.email
        //this.userToUdpate.password = this.user.password
        this.userToUdpate.name = this.user.name
        this.userToUdpate.place = this.user.location
        this.userToUdpate.admin = this.user.admin
        this.userToUdpate.avatar = this.user.avatar
        this.userToUdpate.raiting = this.user.raiting
    },
    created() {
        this.fetchPlacesNoPagination()
    }
}
</script>


<style scoped>
    
    .form {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 900px;
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

    .settings {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .avatarSettings {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
    }

    .passwordSettingsButton {
        height: 40px;
        padding: 10px;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /* font-weight: bold; */
        font-family: 'Inter', sans-serif;
        border: transparent;
        color: #fff;
        background-color: rgb(91, 21, 148);
        margin-left: 30px;
    }

    .passwordSettingsButton:hover {
        cursor: pointer;
    }

    .fa-lock {
        margin-left: 10px;
    }

    .additionalSettings .fieldSettings {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    #admin {
        margin-left: 40px;
    }

    #raiting {
        width: 100px;
    }

    #place {
        resize: none;
        height: 40px;
        width: 310px;
    }

    #name, #login, #password, #email,  #place {
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
        width: 90px;
        align-self: center;
        color: rgb(91, 21, 148);
    }

    #name, #login, #password, #email, #place, #raiting {
        border-radius: 3px;
        border: none;
        box-shadow: none;
        background-color: #ada5b323;
        padding: 5px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Inter', sans-serif;
    }

    .avatar {
        width: 200px;
        height: 200px;
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
        width: 100%;
        cursor: pointer;
        height: 40px;
        font-size: 20px;
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

    .changePasswordForm {
       position: absolute;
       margin: auto;
       margin-top: 150px;
       z-index: 5;
   }

</style>