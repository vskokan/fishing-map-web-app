<template>
    <div class="loader">
        <img src="../assets/loader/loader.svg" height="100px" width="100px">
    </div>
</template>

<style scoped>

.loader {
    height: 100px;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
}

img {
    animation: swimmimg 1s linear infinite;
}

@keyframes swimmimg {
    0% {
      
     transform: rotate(0deg);
      transform: translate(0px, 0px);
    }
   
    
    25% {
      /* transform: rotate(360deg); */
      transform: translate(0px, -60px);
    }
    50% {
      /* transform: rotate(360deg); */
      transform: translate(0px, -30px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

</style>