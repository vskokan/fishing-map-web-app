<template>
    <div class="tableArea">
        <transition name="fade">
            <AddUser class="addForm" v-if="showForm"/>
            <UserCard class="cardForm" v-if="showCard" v-bind:user="currentUser" />
            <EditUser class="editForm" v-if="showEditForm" v-bind:user="currentUser" />
        </transition>
        
        <div class="tableContainer">
            <div class="header">
                <h2>
                    Пользователи
                </h2>
                <button class="button-tableheader" @click="getForm">Добавить <i class="fas fa-plus"></i></button>
            </div>
            <table class="table">
                <thead>
                    <tr class="tableHeader">
                        <th>Логин</th>
                        <th>Мыло</th>
                        <th>Админ?</th>
                        <th>Имя</th>
                        <th>Нас.пункт</th>
                        <th>Аватар</th>
                        <th>Рейтинг</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                
                <!-- <tbody name="fadee" is="transition-group"> -->
                    <tr v-for="user in allUsers" :key="user.login" class="row">
                        <td class="loginCell">{{user.login}}</td>
                        <td class="emailCell">{{user.email}}</td>
                        <td class="adminCell">{{user.admin}}</td>
                        <td class="nameCell">{{user.name}}</td>
                        <td class="placeCell">{{user.location}}</td>
                        <td class="avatarCell"><img class="avatar" :src="'http://localhost:3000/' + user.avatar"></td>
                        <td class="raitingCell">{{user.raiting}}</td>
                    <td class="actionCell">
                        <button class="view" @click="chooseUser(user)"><i class="fas fa-info"></i></button>
                        <button class="edit" @click="chooseUserToUpdate(user)"><i class="fas fa-pen"></i></button>
                        <button class="delete" @click="deleteFromTable(user.login)"><i class="fas fa-trash-alt"></i></button>
                    </td>
                    </tr>
                <!-- </tbody> -->
                
            </table>
           
        </div>
        <div class="navigationButtons">
            <button class="previous" @click="previousPage"><i class="fas fa-arrow-left"></i></button>
            <button class="next" @click="nextPage"><i class="fas fa-arrow-right"></i></button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddUser from '@/components/Users/AddUser'
import UserCard from '@/components/Users/UserCard'
import EditUser from '@/components/Users/EditUser'

export default {
    components: {AddUser, UserCard, EditUser},
    computed: mapGetters(["allUsers", "showForm", "showCard", "showEditForm", "getCurrentPage", "getMaxPage"]), 
    methods: { 
        ...mapActions(["fetchUsers", "deleteUser", "getMaxPageFromServer"]),
        ...mapMutations(['changeFormView', 'changeCardView', 'changeEditFormView', 'incrementCurrentPage', 'decrementCurrentPage']),
        getForm() {
            this.changeFormView()
        },
        deleteFromTable(login) {
            if (!this.showCard) {
                this.deleteUser(login)
            } else {
                alert('Закройте все окна перед удалением')
            }
            
        },
        chooseUser(user) {
            if (!this.showCard) {
                this.currentUser = user
                this.changeCardView()
            }
        },
        chooseUserToUpdate(user) {
            if (!this.showEditForm) {
                this.currentUser = user
                this.changeEditFormView()
            }
        },
        getCard() {
            alert(this.showCard)
            if (!this.showCard) {
                this.changeCardView()
            }
        },
        getEditForm() {
            if (!this.showEditForm) {
                this.changeEditFormView()
            }
        },
        previousPage() {
            this.decrementCurrentPage()
            this.fetchUsers();
        },
        nextPage() {
            this.incrementCurrentPage()
            this.fetchUsers()
        }
    },
    mounted() {
        
        this.fetchUsers()
    },
    data() {
        return {
            currentUser: ''
        }
    }
}

</script>

<style scoped>

@import './../../styles/adminpanel.css';

.avatar {
    width: 50px;
}

</style>