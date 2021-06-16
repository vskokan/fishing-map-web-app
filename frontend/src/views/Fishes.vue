<template>
    <div class="container">
        <div class="cardList">
            <div class="cards">
                <FishCardSmall class="fishCard" v-for="fish in allFishes" :key="fish.id" v-bind:fish="fish" v-show="fish.id !== 5" />
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
        ...mapActions(['fetchFishes'])
    },
    created() {
        this.fetchFishes()
    }

}
</script>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0px;
    }
    .cards {
        width: 99vw;
        display: flex;
        flex-direction: row;
        /* margin: 0px 0px 0px 5px; */
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .fishCard{
        margin: 16px;
    }

</style>