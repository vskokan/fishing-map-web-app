<template>
    <div class="sessions">
       <!-- Сессии {{ user.login }} -->
       <Session  v-for="session in currentSessions" :key="session.id" v-bind:session="session" @delete="deleteSession"/>
       
        <div class="exit-all" @click="deleteAllSessions">Выйти со всех устройств</div>
       
    </div>
</template>

<script>

import SessionData from '@/services/SessionData.js'
import Session from '@/components/Settings/Session'
import { mapActions } from 'vuex'

export default {
    props: ['user'],
    data() {
        return {
            currentSessions: []
        }
    },
    components: {
        Session
    },
    methods: {
        ...mapActions(['logout']),
        fetchSessions() {
            SessionData.getSessions(this.user.login)
            .then((json) => {
                this.currentSessions = json.data
            })
        },
        deleteSession(data) {
            SessionData.deleteSessions(this.user.login, data.id)
            .then((json) => {
                if (json.data) {
                    alert('need logout')
                    this.logout()
                } else {
                     this.fetchSessions()
                }
               
            })
        },
        deleteAllSessions() {
            SessionData.deleteSessions(this.user.login)
            .then(() => {
                this.logout()
            })
        }
    },
    created() {
        this.fetchSessions()
    }
}
</script>

<style scoped>
    .sessions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 65vw;
        gap: 20px;
        background-color: rgb(243, 243, 243);
   padding: 20px;
   border-radius: 15px;
   color: #000;
   font-family: 'Inter', sans-serif;
    }

    .exit-all {
        /* width: 55vw; */
        font-size: 24px;
        margin-top: 10px;
    }

    .exit-all:hover {
        color: var(--color-violet);
        cursor: pointer;
    }
    
</style>