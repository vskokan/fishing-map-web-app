<template>
    <div class="slider" @click="close">
        <!-- <div class="close"><i class="fas fa-times"  @click="close"></i></div> -->
        <div class="area"  >
            <div class="navigation"><i class="fas fa-chevron-left" ></i></div>
            <img class="current" :src="'http://localhost:3000/' + currentPhoto.link"  @click="openPhoto(currentPhoto)">
            <div class="navigation"><i class="fas fa-chevron-right" ></i></div>
        </div>
        <div class="list">
            <img v-for="photo in photos" :key="photo.id" :src="'http://localhost:3000/' + photo.link " >
        </div>
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
    props: ['photos', 'active'],
    data() {
            return {
                currentPhoto: {},
            }
    },
    methods: {
        ...mapMutations(['changeSliderView']),
        close(e) {
            // if (e.target.tagName !== 'IMG' || e.target.className !== 'fas fa-chevron-right' || e.target.className !== 'fas fa-chevron-left')
            // alert(e.target.className )
           if (e.target.className === 'area' || e.target.className === 'list' ) {
                
                this.changeSliderView()
            }
           
        },
        openPhoto(photo) {
            window.open('http://localhost:3000/' + photo.link, "_blank");
        }
    },
    created() {
        this.currentPhoto = this.active
    }
}
</script>

<style scoped>
    .slider {
        background-color: rgba(0, 0, 0, 0.877);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-around;
        position: fixed;
        /* right: -150px;
        width: 190vh;
        bottom: 175px; */
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;


        z-index: 4;
    }
    .area {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .close {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        
        /* position: fixed; */
        margin-right: 50px;
        bottom: 100px;
        font-size: 40px;
    }

    .navigation {
        margin: 0px 100px;
        display: flex;
        align-items: center;
        font-size: 40px;
    }

    .list {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .list img {
        height: 120px;
        width: 120px;
        border: transparent;
        color: #000;
        border-radius: 3px;
        margin-right: 10px;
        object-fit: cover;
    }

    .fas {
        color: #fff;
    }
</style>