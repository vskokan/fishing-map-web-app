<template>
    <div class="mainpage">
       <!-- <SignUp></SignUp> -->
    <AddReview />
    </div>
</template>

<script>
// import SignUp from '@/components/SignUp'
import AddReview from '@/components/Reviews/AddReview'
export default {
    components: {
        //SignUp
         AddReview
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

    .mainpage {
      min-height: calc(100vh - 180px)
    }
</style>

