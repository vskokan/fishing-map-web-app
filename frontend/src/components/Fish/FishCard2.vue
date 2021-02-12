<template>
    <div class="card">
        <h2 class="name">{{fish.name}}</h2>
        <img class="image" :src="'http://localhost:3000/'+fish.img_src">
        <p class="description">{{fish.description}}</p>
        <div class="formButtons">
            <button class="button-simple" v-on:click="closeForm">Закрыть</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['fish'],
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

    .name {
        margin-top: 10px;
    }

    .description {
        margin: 10px;
    }

        .image {
        width: 400px;
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