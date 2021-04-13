<template>
    <div class="mainpage">
       <SignIn></SignIn>
    </div>
</template>

<script>
import SignIn from '@/components/SignIn'
export default {
    components: {
        SignIn
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
      min-height: 84vh;
    }
    
</style>
