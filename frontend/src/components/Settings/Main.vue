<template>
    <div class="mainSettings">
       <header>
           Основные настройки {{ user.login }}
        </header>
        <div class="area">
            <div class="textFields">
                <div>
                    <label for="name">Имя</label>
                    <input type="text" v-model="newUserData.name">
                </div>
                <div>
                    <label for="name">Адрес электронной почты</label>
                    <input type="text" v-model="newUserData.email">
                </div>
                <div>
                    <label for="name">Место проживания</label>
                    <input type="text" v-model="newUserData.location">
                </div>
            </div>
            <div class="imgField">
                <div>Изменение аватарки</div>
                <img :src="'http://localhost:3000/' + user.avatar">
            </div>
        </div>
        <button class="button-simple">Применить</button>
    </div>
</template>

<script>

//import { mapGetters } from 'vuex'
//import { mapActions } from 'vuex'

export default {
    props: ['user'],
    methods: {
        //...mapActions([''])
    },
    data() {
        return {
            newUserData: {
            name: this.user.name,
            email: this.user.email,
            location: this.user.location
         }   
        }
    }
}
</script>

<style scoped>
    .mainSettings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 65vw;
        height: 100%;
        margin-right: 40px;
    }

    .area {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }

    input {
          margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  font-family: "Inter", sans-serif;
  font-size: 16px;
    }
</style>