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
                        <!-- <td class="descriptionCell">{{user.password}}</td> -->
                        <td class="adminCell">{{user.admin}}</td>
                        <td class="nameCell">{{user.name}}</td>
                        <td class="placeCell">{{user.location}}</td>
                        <td class="avatarCell">{{user.avatar}}</td>
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
    .tableContainer {
        /* height: 720px; */
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 0;
        
    }
    .tableArea {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* width: 80%; */
        height: 70vh;
        background-color: #fff;
        box-shadow: 0 0 60px rgba(14,42,71,.25);
        z-index: 0;
        
    }
    table {
        border-collapse: collapse;
        background-color: #fff;
        z-index: 0;
        
    }
    .tableHeader {
        background-color: rgb(101, 15, 172);
        color: #fff;
        height: 80px;
        font-size: 24px;
        font-weight: 700;
        z-index: 0;
    }

    td {
        padding: 5px;
        border-bottom: 1px solid rgb(236, 236, 236);
        height: 50px;
    }

    .navigationButtons {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 15px;
        background: transparent;
        border: transparent
        
    }

    .navigationButtons button {
        background: transparent;
        border: transparent;
        font-size: 20px
    }

    .navigationButtons button:hover {
        cursor: pointer;
    }

    .edit, .view, .delete {
        width: 30px;
        height: 30px;
        background: transparent;
        border: transparent
    }

    .edit:hover, .view:hover, .delete:hover {
        cursor: pointer;
    }

    .idCell {
        width: 50px;
    }
    .descriptionCell {
        width: 500px;
    }

    .nameCell {
        width: 300px;
    }

    .imageCell {
        width: 300px;
    }

    .actionCell {
        width: 150px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .row:nth-child(even) {background: #fff}
    .row:nth-child(odd) {background: rgb(248, 248, 248)}


   .tableHeader {
        background-color: rgb(101, 15, 172);
        color: #fff;
        height: 80px;
        font-size: 24px;
        font-weight: 700;
        z-index: 0;
    }

   .addForm, .cardForm, .editForm {
       position: absolute;
       margin: auto;
       margin-top: 50px;
       z-index: 5;
   }

   .fade-enter-active, .fade-leave-active {
        transition: all 0.3s;
      }
      .fade-enter, .fade-leave-to  {
        opacity: 0;
      }

    .tableImage {
        width: 40px;
        margin-right: 10px;
        color: #fff;
    }

    .header {
        display: flex;
        padding-top: 5px;
        padding-right: 10px;
        padding-left: 10px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(101, 15, 172);
        color: #fff;
    }

    .header h2  {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 48px;
    }

    .fadee-enter-active, .fadee-leave-active {
    transition: opacity .5s;
    }
    .fadee-enter, .fadee-leave-to {
    opacity: 0;
    }

</style>