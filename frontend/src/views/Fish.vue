<template>
    <div class="mainpage">
       <MyLoader class="loader" v-if="loading"></MyLoader>
       <FishCardList v-bind:fishes="fishes"></FishCardList>
    </div>
</template>

<script>

import FishCardList from '@/components/FishCardList'
import MyLoader from '@/components/MyLoader'

export default {
  // name: 'Fish',
  data() {
    return {
      fishes: [ {id: 1, name: "Карась", photo: "https://trekhrechie.ru/images/article_image/karas.png"},
                {id: 2, name: "Окунь", photo: "https://reka-kem.ru/images/fotogal/fish_PNG25164.png"},
                {id: 3, name: "Налим", photo: "https://i043.radikal.ru/1104/62/05fc9b1758ac.png"},
                {id: 4, name: "Щука", photo: "https://lh3.googleusercontent.com/proxy/p3VNFe42CEWmQJ4kT7yaRx74UjzOmA_6UrctLtGiCFARDP9zjnGmvHgjIK-4x0GlY3aa9D0YTR-iuS60pUpYCCd7UZ8HABsOouI5ZR8tzvmcnWA1izRtypLa"},
                {id: 5, name: "Красноперка", photo: "https://fishingkuban.ru/uploads/posts/2011-05/1304404564_1030.png"},
                {id: 6, name: "Ротан", photo: "https://gdekluet.ru/site/files/site_classifier_fish/32/66/rotan.png"},
                {id: 7, name: "Ерш", photo: "https://proshkolu.ru/content/media/pic/std/1000000/465000/464919-735e50d79dc7d67e.png"},
                {id: 8, name: "Сом", photo: "https://s010.radikal.ru/i314/1104/9c/6d1c7b95d5c6.png"},
                {id: 9, name: "Язь", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/yaz_big.png"},
                {id: 10, name: "Пескарь", photo: "http://www.lendex.ru/RealFish/peskar.png"},
                {id: 11, name: "Карп", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/carpe_commune_poisson.png"},
                {id: 12, name: "Лещ", photo: "https://turbocarp.ru/assets/images/fish/leshh.png"},
                {id: 13, name: "Судак", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/sudak_big.png"},
                {id: 14, name: "Плотва", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/plotva_big.png"},
                {id: 15, name: "Линь", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/lin_ikonk_big-1.png"},
                {id: 16, name: "Сазан", photo: "https://fishstocking.ru/wp-content/uploads/2020/02/sazan_big.png"}
              ]
    }
  },
  name: 'App',
  // data() {
  //   return {
  //     fishes: [
  //     ],
  //     loading: true,
  //     filter: 'all'
  //   }
  // },
  // mounted() {
  //   fetch('http://localhost:3000/api/fish/')
  //     .then(response => response.json())
  //     .then(json => {
  //         setTimeout(() => {
  //           this.fishes = json
  //           this.loading = false
  //         }, 2000)
  //     })
  // },
  components: {
    FishCardList, MyLoader
  }
}

</script>

<style scoped>

  .mainpage {
      /* min-height: calc(100vh - 180px); */
      display: flex;
      flex-direction: column;
      justify-content: center;
  }

  .loader {
    height: 64px;
    position: absolute;
    align-self: center;
  }

  .cards {
    display: flex;
    flex-direction: row;
    margin: 15px;
  }

  .carditem {
    margin: 15px;
  }

</style>