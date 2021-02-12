<template>
    <div class="newcard">
        <h1 class="header">{{fish.name}}</h1>
        <div class="image"><img :src="fish.photo" alt="тут будет картинка"></div>
        <div class="expanded">
            <p class="description">{{fish.description}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            fish: {
                type: Object,
                required: true
            },
            index: Number
        }
    }

</script>

<style scoped>

    .icon {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .newcard {
        width: 300px;
        background-color:  #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 20px;  
        /* box-shadow: 0 0 25px rgba(14,42,71,.25);    */
        border-radius: 5px;
        position: absolute;
        top: 220px;
        right: calc(50vw - 150px);
    }

    .image {
        width: 300px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        border: 1px solid;
    }

    img {
        width: 100%;
    }

    .header {
        padding: 10px;
    }

    .expanded {
        width: 300px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
    }

    .description {
        margin-top: 10px;
        width: 300px;
        /* box-shadow: inset 0 0 2px rgba(14,42,71,.15); */
        background-color: #fafafa8a;
        text-align: left;
        padding: 10px;
        margin-bottom: 5px;
        font-family: 'Rubik', sans-serif;
        border-radius: 5px;
    }

    .properties {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .property {
        margin-top: 5px;
        font-weight: bold;
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
    }

</style>