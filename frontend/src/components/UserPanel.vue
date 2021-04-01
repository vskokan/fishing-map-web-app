<template>
    <div class="container">
        <div class="userPanel">
            <img class="avatar" :src="'http://localhost:3000/' + currentUser.avatar">
            <div class="username">{{currentUser.login}}</div>
            <div class="userPanelArrow"><i class="fas fa-chevron-down" :class="{'opened': isMenuOpened}" @click="toggleUserMenu"></i></div>
        </div>
        <ul class="dropdown"  v-if="isMenuOpened">
            <li @click="isMenuOpened = false"><router-link :to="'/user/' + currentUser.login" ><i class="fas fa-id-badge"></i>Мой профиль</router-link></li>
            <li><router-link to="/settings"><i class="fas fa-users-cog"></i>Настройки</router-link></li>
            <li v-if="currentUser.admin == true"><router-link to="/database"><i class="fas fa-tools"></i>Админка</router-link></li>
            <li @click="exit"><i class="fas fa-sign-out-alt"></i>Выход</li>
        </ul>
    </div>
    
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: mapGetters(['currentUser']),
    data() {
        return {
            isMenuOpened: false
        }
    },
    methods: {
        ...mapActions(['logout']),
        toggleUserMenu() {
            this.isMenuOpened = !this.isMenuOpened
        },
        exit() {
            this.logout()
        }
    }
}
</script>

<style scoped>

    
    .userPanel {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        font-family: 'Rubik', sans-serif;
        color: #000;
        font-weight: bold;
    }

    .avatar {
        width: 60px;
         clip-path: circle(25px at center);
    }

    .username {
        margin: 0px 5px;
    }

    .fa-chevron-down {
        color: #000;
        transition: 0.3s;
        font-size: 18px;
    }

    .fa-chevron-down:hover {
        cursor: pointer;
    }

    .opened {
        transform: rotate(180deg)
    }

    .dropdown {
        color: #000;
        background-color: #fff;
        position: absolute;
        z-index: 2;
        list-style: none;
        top: 75px;
        right: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 5px 10px;
        font-family: 'IBM Plex Sans', sans-serif;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }

    li {
        margin: 5px 10px;
        font-size: 22px;
        /* border: 3px solid var(--color-violet); */
        width: 100%;
        padding: 5px 0px;
        text-decoration: none;
        font-family: 'IBM Plex Sans', sans-serif;
            /* text-transform: uppercase; */
            color: #000;
            font-weight: 500;
    }

    li:hover {
        color: var(--color-violet);
        cursor: pointer;
    }

            a {
            text-decoration: none;
            /* text-transform: uppercase; */
            color: #000;
            font-family: 'IBM Plex Sans', sans-serif;
            /* font-weight: bold; */
            height: 100%;
        }

        a:active {
            text-decoration: none;
        }

        a:visited {
            text-decoration: none;
        }

        a:hover {
            text-decoration: none;
            color: var(--color-violet);
        }

        .dropdown .fas {
            margin-right: 5px;
        }
</style>