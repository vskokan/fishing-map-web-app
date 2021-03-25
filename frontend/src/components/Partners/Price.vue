<template>
    <div class="priceCard">
        <header>
            {{ data.name }}
        </header>
        <p class="description">
            {{ data.description }}
        </p>
        <div class="prices">
            <div class="row">
                <div class="label">
                    Без предоставления скидок
                </div>
                <div class="pricePerMonth">
                    <span class="digits">{{ data.priceWithoutDiscount }}₽</span> в месяц
                </div>
            </div>
                        <div class="row">
                <div class="label">
                    Со скидками
                </div>
                <div class="pricePerMonth">
                     <span class="digits">{{ data.priceWithDiscount }}₽</span> в месяц
                </div>
            </div>
        </div>
        <div class="yearPrice">
            <p class="description">
                Скидка 20% за годовой тариф!
            </p>
            <div class="price">
                От  <span class="digits">{{ data.priceWithoutDiscount * 12 * 0.8 }}₽</span> в год
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['data']
}
</script>


<style scoped>
    .priceCard {
        background-color: rgb(255, 255, 255);
        width: 25%;
        padding: 20px;
        border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    }

    header {
         font-size: 25px;
    font-weight: 600;
    letter-spacing: 1.5px;
    font-family: 'IBM Plex Sans', sans-serif;
    text-transform: uppercase;
    color: #000;
    height: 90px;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 30px 20px;
         font-family: 'Rubik', sans-serif;
    }

    .pricePerMonth {
        /* margin-right: 20px; */
        text-align: center;
    }

    .description {
        margin: 20px 0px;
         font-family: 'Rubik', sans-serif;
         height: 50px;
    }

    .digits {
        font-size: 25px;
        font-weight: 600;
        color: var(--color-violet);
    }

    .yearPrice {
         font-family: 'Rubik', sans-serif;
    }
    .yearPrice .digits {
        font-size: 30px;
        margin: 0px 10px
    }
</style>