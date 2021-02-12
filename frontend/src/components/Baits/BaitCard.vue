<template>
    <div class="card">
        <h2 class="name">{{bait.name}}</h2>
        <p class="description">{{bait.description}}</p>
        <div class="formButtons">
            <button class="button-simple" v-on:click="closeForm">Закрыть</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['bait'],
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

</style>