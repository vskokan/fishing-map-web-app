<template>
    <div class="tables">
            <ul class="nav">
                <li class="menuitem"><router-link to="/database/fishes">Рыба</router-link></li>
                <li class="menuitem"><router-link to="/database/methods">Методы</router-link></li>
                <li class="menuitem"><router-link to="/database/baits">Приманки</router-link></li>
                <li class="menuitem"><router-link to="/database/users">Пользователи</router-link></li>
                <li class="menuitem"><router-link to="/database/reviews">Отзывы</router-link></li>
                <!-- <li class="menuitem"><router-link to="/database/facts">Факты</router-link></li> -->
                <li class="menuitem"><router-link to="/database/cities">Нас.пункты</router-link></li>
                <li class="menuitem"><router-link to="/database/plans">Тарифы</router-link></li>
                <li class="menuitem"><router-link to="/database/partners">Партнеры</router-link></li>
                <!-- <li class="menuitem"><router-link to="/database/departments">Филиалы</router-link></li> -->
                <li class="menuitem"><router-link to="/database/discounts">Скидки</router-link></li>
            </ul>
        </div>
</template>

<style scoped>
    .tables {
         padding: 20px;
         background-color:  #fff;
    /* border-radius: 15px; */
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* width: 10vw; */
    }
    .router-link-active {
        color: rgb(255, 255, 255);
        background: var(--color-violet);
        
        
    }

    .router-link-active:hover {
        color: rgb(255, 255, 255);
    }

    .menu {
        background-color:  #fff;
        
    }

    .nav {
        font-family: 'Inter', sans-serif;
        
        /* border-top: 1px solid #f5f5f5; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        list-style: none;
        margin: 0; 
        padding-left: 0; 
        background-color:  #fff;
        /* padding-right: 20px; */
        /* height: 87vh; */
    }

    .menuitem {
        margin-top: 10px;
        width: 100%;
        text-align: center;
        
    }

    a {
        text-decoration: none;
        text-transform: uppercase;
        color: #6b7478;
        padding: 10px;
        font-weight: 700;
        font-size: 20px;
        display: block;
        /* width: 100%; */
        transition: .2s ease-in-out;
        border-radius: 15px;
        
    }



    a:active {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
    }

    a:hover {
        
        
        text-decoration: none;
        color: #000;
    }
    
</style>