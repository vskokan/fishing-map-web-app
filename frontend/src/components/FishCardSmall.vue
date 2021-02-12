<template>
<div>
    <div class="card" v-click-outside="hide" @click="toggle">
        <h1 class="header">{{fish.name}}</h1>
        <div class="image">
            <img :src="fish.photo" alt="сюда картинку">
        </div>
    </div>
    <FishCard  v-show="opened" v-bind:fish="thisfish"></FishCard>
    </div>
</template>

<script>

    import ClickOutside from 'vue-click-outside'
    import FishCard from '@/components/FishCard'

    export default {
          data () {
            return {
            opened: false,
            thisfish: this.fish
            }
        },
        props: {
            fish: {
                type: Object,
                required: true
            },
            index: Number
        },
        methods: {
            toggle () {
                    this.opened = true
                    },

            hide () {
                this.opened = false
                }
        },
        mounted () {
            this.popupItem = this.$el // prevent click outside event with popupItem.
        },
        directives: { // do not forget this section
            ClickOutside
        },
        components: {
            FishCard
        }
    }

</script>

<style scoped>
    
    .card {
        width: 360px;
        height: 250px;
        background-color:  #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 0px 0px 20px 0px;
        color: #000;  
        font-family: 'Inter', sans-serif;
        /* box-shadow: 0 0 10px rgba(14,42,71,.25);    */
        border-radius: 15px;
    }

    .card:hover {
        /* box-shadow: 0 0 10px rgba(14,42,71,.85); */
        cursor: pointer;  
    }

    .image {
        width: 300px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-items: center;
    }

    img {
        width: 100%;
    }

    .header {
        padding: 10px;
    }

</style>