<template>
    <div class="container">
        <div class="data">
            <div class="user-agent">
                <i :class="{
                    'fab fa-windows' : session.userAgent.includes('Windows'),
                    'fab fa-linux' : session.userAgent.includes('Linux'),
                    'fab fa-android' : session.userAgent.includes('Android'),
                }"></i>
                {{session.userAgent}}
            </div>
            <div class="ip">
                <i class="fas fa-globe"></i>
                {{session.ip}}
            </div>
        </div>
       <div class="signOut" @click="deleteSession">
           Выйти
           <i class="fas fa-sign-out-alt"></i>
           </div> 
    </div>
</template>

<script>
export default {
    props: ['session'],
    methods: {
        deleteSession() {
            this.$emit('delete', {id: this.session.id})
        }
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .data {
        width: 40vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }



    .container {
        padding: 30px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  width: 55vw;
  
    }

    .user-agent {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: start;
        align-items: center;
        width: 35vw;
    }

    .user-agent i {
         margin: 0px 10px;
    }

    .fas {
        margin: 0px 5px;
    }

    .ip {
        margin-left: 10px;
        width: 10vw;
    }

    /* .signOut {
        color: #000;
    } */

    .signOut:hover {
        cursor: pointer;
        color: var(--color-violet);
    }
</style>