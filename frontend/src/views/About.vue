<template>
  <div class="container">
    <div class="intro">
      <div class="content">
        <div class="logo">
          <img class="icon" src="@/assets/icons/marker.svg" />
          <div class="name">Go Fishing</div>
          <div class="desc">Отзывы на рыболовные места</div>
        </div>
        <button class="button-simple">На карту</button>
      </div>
    </div>
    <div class="reviews">
        <img class="reviewexample" src="@/assets/review.png" />
        <ul class="text">
            <li><i class="fas fa-fish"></i>Просматривайте отзывы рыбаков</li>
            <li><i class="fas fa-fish"></i>Добавляйте свои после регистрации</li>
            <li><i class="fas fa-fish"></i>Прикрепляйте фотографию вашего улова!</li>
            <li><i class="fas fa-fish"></i>Ищите определенные отзывы по разным критериям</li>
            <li><i class="fas fa-fish"></i>Получайте бонусы за добавление отзывов</li>
            </ul>
    </div>
    <div class="fishes">
        <div class="stats">
            <div class="text">Статистика для каждой рыбы</div>
            <img class="pies" src="@/assets/stats.png" />
            
        </div>
    </div>
    
    <div class="signup">
        <div class="button-simple">Зарегистрироваться!</div>
    </div>
  </div>
</template>

<script>

// import ReviewCard from 

// export default {
    
// }
</script>

<style scoped>
.intro {
  height: 70vh;
  background-image: url(./../assets/boats.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -380px;
}

.name {
            font-size: 80px;
        color: #000;
        font-family: 'Fishhook';
        letter-spacing: 1.5px;
        font-weight: bold;
        margin-top: 10px;
}

.icon {
    width: 200px;
}

.desc {
    font-family: 'IBM Plex Sans', sans-serif;
    color: #000;
    font-size: 30px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
}

.button-simple {
    margin-top: 20px;
}

.reviews {
    /* background-color: var(--color-violet); */
    /* background-color: white; */
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    
}

.reviews .text {
    color: rgb(0, 0, 0);
    /* color: white; */
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 32px;
    font-weight: 700;
    text-align: start;
    margin-left: 40px;
    list-style: none;
}

.text .fas {
    margin-right: 15px;
}

.text li {
    margin: 20px 0px;
}
 
.fishes {
    padding: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
      background-image: url(./../assets/fishes.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -450px;
}

.fishes .stats {
    background-color: white;
    padding: 5px;
    border-radius: 15px;

}

.pies {
    height: 400px;
}

.stats .text {
     font-family: 'IBM Plex Sans', sans-serif;
    color: #000;
    font-size: 45px;
    font-weight: 700;
    margin-top: 10px;
}

.signup {
      height: 40vh;
  background-image: url(./../assets/water.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px -420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reg {
    font-family: 'IBM Plex Sans', sans-serif;
    color: #000;
    font-size: 30px;
    text-transform: uppercase;
    background-color: var(--color-violet);
    padding: 20px;
    color: white;
}

.signup .button-simple {
    font-size: 40px;
}

/* .tomap {
    background-color: var(--color-violet);
    border-radius: 10px;
    font-size: 30px;
    color: white;
    padding: 10px;
} */



</style>
