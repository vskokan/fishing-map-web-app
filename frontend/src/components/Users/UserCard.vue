<template>
    <div class="card">
        <h2 class="login">{{user.login}}</h2>
        <p class="email">Мыло: {{user.email}}</p>
        <p class="password">Пароль: Секрет!</p>
        <p class="admin">Статус:{{(user.admin)?"Администратор":"Обычный пользователь"}}</p>
        <p class="name">Имя: {{user.name}}</p>
        <img class="avatar" :src="'http://localhost:3000/'+user.avatar">
        <p class="place">Локация: {{user.location}}</p>
        <p class="raiting">Рейтинг: {{user.raiting}}</p>
        <p class="raiting">Забанен: {{user.ban}}</p>
        <div class="formButtons">
            <button class="button-simple" v-on:click="closeForm">Закрыть</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['user'],
    methods: {
        ...mapMutations(['changeCardView']),
        closeForm() {
            this.changeCardView()
        }
    }
}
</script>

<style scoped>
    .card {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        width: 450px;
        color: #000;
        min-height: 250px;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding-bottom: 20px;
        box-shadow: 0 0 60px rgba(14,42,71,.25);
    }

    /* .name {
        margin-top: 10px;
    }

    .description {
        margin: 10px;
    } */

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

</style>