<template>
    <div class="companyCard">
        <div class="imageContainer">
            <img :src="'http://localhost:3000/' + company.logo"  class="logo" />
        </div>
        
        <div class="name">{{ company.name }}</div>
        <div class="website">
            <i class="fas fa-globe"></i>
            <a :href="'//'+ company.website">{{ company.website }}</a>
        </div>
        <div class="locations">
            <i class="fas fa-map-marker-alt"></i>
           <div>Тест, Тест, Тест</div> 
        </div>
        <div class="description">{{ company.description }}</div>
        <div class="discounts" v-if="company.gives_discounts"><i class="fas fa-percent"></i>Участвует в бонусной программе</div>
    </div>
</template>

<script>

export default {
    props: ['company']
}
</script>

<style scoped>
        .companyCard {
        background-color: rgb(255, 255, 255);
        width: 25%;
        padding: 20px;
        border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    /* margin-bottom: 20px; */
    }

    .logo {
        height: 15vh;
        width: auto;
    }

    .name {
    margin: 20px 0px;
    font-size: 45px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: 'IBM Plex Sans', sans-serif;
    text-transform: uppercase;
    color: #000;
    height: 60px;
    }

    .website {
        font-size: 20px;
        font-family: 'Rubik', sans-serif;
    }

    .fa-globe, .fa-percent {
        margin-right: 5px;
    }

    .fa-map-marker-alt {
        color:  var(--color-violet);
    }

    .locations {
        margin-top: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 20px;
    }

    .description {
        margin: 20px 0px;
        padding: 10px;
        font-size: 22px;
        font-family: 'Rubik', sans-serif;
        height: 150px;
    }

    .fa-percent {
        color: rgb(29, 173, 72);
    }

    .discounts {
        font-family: 'Rubik', sans-serif;
    }
</style>