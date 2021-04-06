<template>
    <div class="main">
        <TablesList></TablesList>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import TablesList from "@/components/Tables/TablesList"

export default {
    components: { TablesList }
}
</script>

<style scoped>

    .main {
        min-height: 84vh;
        display: flex;
        flex-direction: row;
    }
    
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
  
</style>