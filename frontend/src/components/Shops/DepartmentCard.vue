<template>
    <div class="departmentCard">
        <div class="logoContainer">
            <img class="logo" :src="'http://localhost:3000/' + department.logo">
        </div>
        <div class="name">
            {{ department.companyName}}
        </div>
        <div class="website"> 
            <i class="fas fa-globe"></i>
            <a :href="'//'+ department.website">{{ department.website }}</a> </div>
        <div class="adress"> <i class="fas fa-map-marker-alt"></i>{{ department.adress}}</div>
        <div class="description"> {{ department.description}} </div>

              <button class="button-simple close" v-on:click="closeForm">
        Закрыть
      </button>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['department'],
     methods: {
    ...mapMutations(["changeDepartmentCardView"]),
    closeForm() {
      this.changeDepartmentCardView();
    },
    }
}

</script>

<style scoped>

.departmentCard {
    background-color: rgb(255, 255, 255);
        width: 20vw;
        padding: 20px;
        border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #000;
}
.logo {
        height: 10vh;
        width: auto;
    }

    .name {
    margin: 20px 0px;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: 'IBM Plex Sans', sans-serif;
    text-transform: uppercase;
    color: #000;
    margin: 10px 0px;
    }

    .website, .adress  {
        margin: 5px 0px;
        font-family: 'Rubik', sans-serif;
    }

    .fas {
        margin-right: 5px;

    }

    .description {
        margin: 20px 0px;
        font-family: 'Rubik', sans-serif;
        text-align: left;
    }

   


</style>