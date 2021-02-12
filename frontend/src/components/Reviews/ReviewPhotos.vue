<template>
    <div class="container" v-if="allPhotos.length !== 0" >
        <div class="list">
            <img class="photo" v-for="photo in allPhotos" :key="photo.id" :src="'http://localhost:3000/' + photo.src" @click="choosePhoto(photo)">
        </div>
        <Slider v-bind:photos="allPhotos" :active="currentPhoto" v-if="showSlider"/>
        
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Slider from '@/components/Reviews/Slider.vue'

export default {
    props: ['review'],
    components: { Slider },
    data() {
        return {
            currentPhoto: {},
        }
    },
    computed: mapGetters(['allPhotos', "showSlider"]),
    watch: {
        review: function (newVal) {
            this.getReviewPhotos(newVal)
        }
    },
    methods: {
        ...mapActions(['getReviewPhotos']),
        ...mapMutations(['changeSliderView']),
        choosePhoto(photo) {
            this.currentPhoto = photo
            this.changeSliderView()
        },
        
    },
    created() {
        this.getReviewPhotos(this.review)
    },
    // updated() {
    //     this.findFactsByReview(this.review)
    // }
}
</script>

<style scoped>

.container {
  height: 120px;
  /* width: 600px; */
  /* background-color: var(--color-lightgray); */
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
}

.photo {
  height: 120px;
  width: 120px;
  border: transparent;
  color: #000;
  border-radius: 3px;
  margin-right: 10px;
  object-fit: cover;
}

</style>