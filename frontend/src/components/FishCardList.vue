<template>
    <div class="main">
        <div class="list">
            <FishCardSmall v-for="fish of fishes"
                :fish="fish"
                :key="fish.id"
                class="item"
            ></FishCardSmall>
        </div>
    </div>
</template>

<script>

import FishCardSmall from '@/components/FishCardSmall'

 export default {
        props: ['fishes'],
        components: {
            FishCardSmall 
        }
    }

</script>

<style scoped>

    .main {
        display: flex;
        flex-direction: column;
        height: 680px;
        overflow-y: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        
    }

    .item {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

</style>