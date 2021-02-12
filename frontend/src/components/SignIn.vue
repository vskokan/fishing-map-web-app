<template>
    <div class="container">
        <div class="form">
            <div class="header"><h2>Вход</h2></div>
            <div class="input">
                <i class="fas fa-user icon"></i>
                <input class="input-field" type="text" name="login" v-model="user.login" required>
                <div class="placeholder">Логин</div>
            </div>
            <div class="input">
                <i class="fas fa-lock icon"></i>
                <input class="input-field" type="password" name="password" v-model="user.password" required>
                <div class="placeholder">Пароль</div>
            </div>
            <div class="status" v-if="serverResponse !== undefined || serverResponse !== 200">{{ serverResponse }}</div>
            <div class="buttons">
                <button class="button-simple" @click="send">Войти</button>
                
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                user: {
                    login: '',
                    password: ''
                }
            }
        },
        computed: mapGetters(['serverResponse']),
        methods: {
            ...mapActions(['login']),
            send() {
                let formData = new FormData()

                formData.append('login', this.user.login)
                formData.append('password', this.user.password)
                formData.append('userAgent', window.navigator.userAgent)

                // const data = {
                //     login: this.user.login,
                //     password: this.user.password,
                //     userAgent:  window.navigator.userAgent
                // }

                this.login(formData)
                // this.$router.push('map');
            }
        }
        
    }
</script>

<style scoped>

    .header {
        width: 450px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        /* background: linear-gradient(to right, var(--color-yellow),var(--color-violet)); */
        /* background-color: var(--color-violet); */
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        font-size: 34px;
        color: rgb(41, 41, 41);
    }

    .icon {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            position: relative;
            top: 0px;
    }

    .fas {
        font-size: 16px;
        color: #000;
    }

    .container {
        background-color: #fff;
        width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 0px 0px 20px 0px;
        /* box-shadow: 0 0 60px rgba(14, 42, 71, 0.25); */
        /* box-shadow: 0 0 60px rgba(14,42,71,.25); */
        border-radius: 15px;
        z-index: 0;
    }

    .form {
        margin: 0px 0px 20px 0px;
    }

    .input {
        padding-top: 30px;
        position: relative;
        height: 60px;
        
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 40px;
        
    } 

    .input-field {
        border: none;
        border-bottom: 1px solid lightgray;
        background: transparent;
        z-index: 1;
        width: 250px;
        font-size: 26px;
        font-family: 'Rubik', sans-serif;
        outline: none;
    }

    .input-field:required {
        border: none;
        box-shadow: none;
        border-bottom: 1px solid lightgray;
    }

    .placeholder {
        font-size: 18px;
        color: lightgray;
        position: relative;
        top: -35px;
        padding-left: 118px;
        z-index: -1;
        text-align: left;
        transition: font-size 0.01s ease-in-out 0.01s;
        transition: color 0.5s ease-in-out 0.01s;
 
    }

    .input-field:focus + .placeholder, .input-field:valid + .placeholder {
        color: var(--color-violet);
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        animation: movePlaceholder 0.2s ease-in forwards;
        border: transparent;
        outline: none;
    }

    .input-field:not(:focus) + .placeholder {
        color: var(--color-lightgray);
    }

    @keyframes movePlaceholder {
        to {
            transform: translateY(-30px);
        }
    }

    .status {
        margin-top: 10px;
        color: rgb(209, 87, 87)
    }

</style>