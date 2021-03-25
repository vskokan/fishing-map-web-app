<template>
  <div class="partnersPage">
    <div class="intro">
        Тут будет что-то написано про сотрудничество
    </div>
    <div class="partners">
        <div>Наши партнеры</div>
    </div>
    <div class="prices">
        <div>Тарифы на размещение</div>
        <div class="priceCard"></div>
      </div>
    <div class="cooperation">
      <div>Сотрудничество</div>
      
      <div class="form">
        <div class="inputContainer">
          <input placeholder="Адрес электронной почты" type="mail" />
        </div>
        <div class="inputContainer">
          <input placeholder="ФИО" type="text" />
        </div>
        <div class="inputContainer">
          <textarea
            placeholder="Расскажите кратко о деятельности вашей компании"
          >
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from '../components/Header.vue'
// export default {
//     components: {
//         Header
//     }
// }
</script>

<style scoped>
/* .mainpage {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    } */

.partnersPage {
      min-height: calc(100vh - 180px)
    }

.intro {
    background-color: #fff;
    height: 100px;
}

.partners {
   background-color: var(--color-violet);
    height: 500px; 
}

.prices {
    height: 300px;
}

.cooperation {
    height: 500px;
    background-color: var(--color-yellow);
}
</style>