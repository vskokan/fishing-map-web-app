<template>
    <div class="mainpage">
       <SignUp></SignUp>
    </div>
</template>

<script>
import SignUp from '@/components/SignUp'
export default {
    components: {
        SignUp
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
       min-height: 84vh;
    }
    
</style>