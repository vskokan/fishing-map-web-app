<template>
    <div class="mainpage">
       <!-- <SignUp></SignUp> -->
    <MapFilters />
    </div>
</template>

<script>
// import SignUp from '@/components/SignUp'
import MapFilters from '@/components/Reviews/MapFilters'
export default {
    components: {
        //SignUp
         MapFilters
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