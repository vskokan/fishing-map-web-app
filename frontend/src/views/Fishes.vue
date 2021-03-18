<template>
    <div class="container">
        <div class="header">
            Заголовок
        </div>
        <div class="search">
            Тут будет панель поиска по названию
        </div>
        <div class="cardList">
            <div class="cards">
                <FishCardSmall class="fishCard" v-for="fish in allFishes" :key="fish.id" v-bind:fish="fish" />
            </div>
            
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import FishCardSmall from '@/components/Fish/FishCardSmall.vue'

export default {
    components: {
        FishCardSmall
    },
    computed: mapGetters(['allFishes'])
    ,
    methods: {
        ...mapActions(['fetchFishesNoPagination'])
    },
    created() {
        this.fetchFishesNoPagination()
    }

}
</script>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .cards {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }

    .fishCard{
        margin: 5px;
    }

</style>