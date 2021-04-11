<template>
  <div class="partnersPage">

    <div class="partners">
      <i class="fas fa-briefcase"></i>
      <div class="header">Наши партнеры</div>
      <div class="companyCards" v-if="companiesAreLoaded">
        <CompanyCard
          v-for="company in allCompanies"
          :key="company.id"
          v-bind:company="company"
        />
      </div>
    </div>
        <div class="intro">
      <div class="text">
        Мы стремимся поддерживать малый бизнес, а так же против навязчивой
        рекламы на сайте. Поэтому мы сотрудничаем с организациями и размещаем их
        на карте, а так же генерируем скидочные купоны для создания интереса
        пользователей. Полученные деньги идут на поддержание сайта в
        работоспособном состоянии.
      </div>
    </div>
    <div class="prices">
      <i class="fas fa-ruble-sign"></i>
      <div class="header">Тарифы на размещение</div>
      <div class="priceCards" >
        <Price
          v-for="price in this.prices"
          :key="price.index"
          v-bind:data="price"
        />
        <PlanList />
      </div>
    </div>
    <div class="cooperation">
      <i class="fas fa-envelope-open-text"></i>
      <div class="header">Сотрудничество</div>

      <div class="form">
        <div class="description">
          Свяжитесь с нами для более подробного обсуждения условий!
        </div>
        <div class="inputContainer">
          <label for="mail">Адрес электронной почты</label>
          <input placeholder="Адрес электронной почты" type="mail" id="mail" v-model="message.email" />
        </div>
        <div class="inputContainer">
          <label for="name">ФИО</label>
          <input placeholder="ФИО" type="text" id="name" v-model="message.name" />
        </div>
        <div class="inputContainer">
          <label for="description">Сопроводительный текст</label>
          <textarea
            placeholder="Расскажите кратко о деятельности вашей компании"
            id="description"
            v-model="message.description"
          >
          </textarea>
        </div>
        <button class="button-simple" @click="sendPartnershipRequest">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import Price from "../components/Partners/Price.vue"
import PlanList from '../components/Partners/PlanList'
import CompanyCard from "../components/Partners/CompanyCard.vue"
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import CompanyData from './../services/CompanyData'

export default {
  components: {
    Price,
    CompanyCard,
    PlanList
  },
  computed: mapGetters(['allCompanies', 'companiesAreLoaded']),
  methods: {
    ...mapActions(['fetchCompanies']),
    sendPartnershipRequest() {
      const message = new FormData()
      message.append('email', this.message.email)
      message.append('name', this.message.name)
      message.append('description', this.message.description)

      CompanyData.sendMail(message)
      .then((json) => {
        if (json.data.message == 'sent') {
          this.mailStatus = 'Ваше сообщение успешно отправлено'
        } else {
          this.mailStatus = 'Какая-то ошибка'
        }

        this.message.name = ''
        this.message.email = ''
        this.message.description = ''
      })


    }
  },
  created() {
    this.fetchCompanies()
  },
  data() {
    return {
      prices: [
        {
          name: "Для интернет-магазинов",
          description: "Без размещения точек на карте, но с рекламой на сайте",
          priceWithoutDiscount: 500,
          priceWithDiscount: 1000,
        },
        {
          name: "Для организаций сопуствующих товаров и услуг",
          description:
            "С указанием отделений на карте. Тариф доступен для следующих направлений: продажа товаров для рыбалки и туризма, рыболовные базы, места платной рыбалки, автосервисы, заправки",
          priceWithoutDiscount: 1000,
          priceWithDiscount: 1500,
        },
        {
          name: "Для организаций, не связанных с рыбалкой",
          description:
            "С указанием отделений на карте. Для направлений, не удовлетворяющих условию предыдущего тарифа",
          priceWithoutDiscount: 2000,
          priceWithDiscount: 2500,
        },
      ],
      message: {
        email: '',
        name: '',
        description: ''
      },
      mailStatus: ''
    };
  },
};
</script>

<style scoped>
/* .mainpage {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    } */
.header {
  font-size: 45px;
  font-weight: 600;
  letter-spacing: 5px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  margin: 0px 0px 20px 0px;
}
.fas {
  font-size: 45px;
}
.partnersPage {
  min-height: calc(100vh - 180px);
}

.intro {
  background-color: #fff;
  padding: 30px;
  height: 400px;
  background-image: url(./../assets/fishing.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -550px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text {
  font-family: "IBM Plex Sans", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: 500;
  width: 50%;
}

.partners {
  background-color: #fff;
  /* background-color: var(--color-violet); */
/* background: rgb(198,187,209); */
/* background: linear-gradient(0deg, rgba(198,187,209,0.16288522244835435) 0%, var(--color-violet) 100%, rgba(255,255,248,0.5270308807116597) 100%); */
  /* height: 500px; */
  padding: 30px;
}

.partners .header,
.partners .fas {
  color: rgb(0, 0, 0);
}

.prices {
  padding: 30px;
  /* height: 300px; */
}

.prices .header,
.prices .fas {
  color: #000;
}

.priceCards {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0px 0px 20px 0px;
}

.companyCards {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px 0px 20px 0px;
  gap: 10px;
}

CompanyCard {
  margin-bottom: 20px;
}

.cooperation {
  padding: 30px;
  background-color: var(--color-yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(./../assets/fishing3.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -300px;
}

.cooperation .description,
.cooperation label {
  /* font-weight: 600; */
  font-family: "Rubik", sans-serif;
}

.cooperation .header,
.cooperation .fas {
  color: rgb(255, 255, 255);
}

.form {
  background-color: rgb(255, 255, 255);
  width: 35%;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  /* background-color: rgb(122, 115, 105); */
  width: 90%;
}

.inputContainer input,
textarea {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

.inputContainer input:focus,
textarea:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

textarea {
  resize: none;
  height: 200px;
}
</style>
