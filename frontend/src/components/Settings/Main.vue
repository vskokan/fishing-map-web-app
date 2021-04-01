<template>
    <div class="mainSettings">
       <header>
           Основные настройки {{ user.login }}
        </header>
        <div class="area">
            <div class="textFields">
                <div>Изменение имени</div>
               <div>Измененние адреса электронной почты</div> 
               <div>Измененние города проживания</div>
            </div>
            <div class="imgField">
                <div>Изменение аватарки</div>
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
    }
}
</script>

<style scoped>
    .mainSettings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 70%;
        height: 100%;
        margin-right: 40px;
    }

    .area {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
</style>