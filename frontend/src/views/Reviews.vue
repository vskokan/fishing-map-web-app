<template>
    <div class="mainpage">
       <ReviewCard v-bind:review="this.review"></ReviewCard>
    </div>
</template>

<script>
import ReviewCard from '@/components/ReviewCard'
export default {
    components: {
        ReviewCard
    },
    data() {
    return {
      review: {
      },
      loading: true,
      filter: 'all'
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/full/1')
      .then(response => response.json())
      .then(json => {
          
            this.review = json
            this.loading = false
         
      })
  }   
}
</script>

<style scoped>

    .mainpage {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    div {
      min-height: calc(100vh - 180px)
    }
    
</style>