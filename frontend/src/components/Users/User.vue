<template>
  <div class="user">
    <div class="info">
      <img class="avatar" :src="'http://localhost:3000/' + user.avatar" />
      <div class="text">
        <div class="login">
          <i class="fas fa-user"></i>{{ user.login }} ({{ user.name }})
        </div>
        <div class="email"><i class="fas fa-at"></i>{{ user.email }}</div>
      </div>
    </div>
    <div class="reviewsAmount">
      <i class="fas fa-map-marker-alt"></i>{{ user.count }}
    </div>
    <div class="actions">
      <div class="ban" v-if="!user.ban" @click="banOrUnban">
        <img class="banan" src="../../assets/icons/banana.svg" />
        Бан
      </div>
      <div class="unban" v-else @click="banOrUnban">
        <i class="fas fa-times"></i>Разбан
      </div>
      <div class="admin">
        <div class="setAdmin" v-if="!user.admin">
         <i class="fas fa-user-cog"></i>Сделать админом
        </div>
        <div class="unsetAdmin" v-else>
           <i class="fas fa-times"></i>Убрать из админов
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ["user"],
methods: {
    ...mapActions(['changeBanStatus']),
    banOrUnban() {
        const formData = new FormData()
        formData.append('ban', !this.user.ban)

        this.changeBanStatus({login: this.user.login, formData: formData})
    }
}
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  height: 5vh;
  padding: 20px;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
}

.info {
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}
.avatar {
  width: 80px;
  clip-path: circle(35px at center);
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.fas {
  margin-right: 5px;
}

.banan {
  height: 20px;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.ban,
.unban {
  background-color: var(--color-violet);
  padding: 10px;
  border-radius: 8px;
  width: 140px;
  color: white;
}

.unban {
  background-color: var(--color-violet);
  /* padding: 5px; */
  border-radius: 8px;
  width: 140px;
  color: white;
}

.setAdmin,
.unsetAdmin {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-violet);
  padding: 10px;
  border-radius: 8px;
  width: 230px;
  color: white;
}

.actions .fas {
    color: rgb(255, 193, 7);
    font-size: 20px;
}
</style>
