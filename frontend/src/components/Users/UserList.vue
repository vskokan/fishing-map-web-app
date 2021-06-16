<template>
  <div class="container">
    <div class="search">
      <i class="fas fa-search"></i
      ><input
        type="text"
        class="query"
        v-model="query"
        placeholder="Найти по логину или эл.почте"
      />
    </div>
    <div class="lists" v-if="allUsers !== undefined">
      <div class="label" v-if="admins.length > 0">Администраторы</div>
      <div class="admins" v-if="admins.length > 0">
        <User v-for="user in admins" :key="user.login" v-bind:user="user" />
        <div class="notfound" v-if="admins.length == 0">Не найдено :(</div>
      </div>
      <div class="label" v-if="banned.length > 0">Забаненные</div>
      <div class="banned" v-if="banned.length > 0">
        <User v-for="user in banned" :key="user.login" v-bind:user="user" />
        <div class="notfound" v-if="banned.length == 0">Не найдено :(</div>
      </div>
      <div class="label" v-if="others.length > 0">Остальные пользователи</div>
      <div class="all" v-if="others.length > 0">
        <User v-for="user in others" :key="user.login" v-bind:user="user" />
        <div class="notfound" v-if="others.length == 0">Не найдено :(</div>
      </div>
      <div class="notfound" v-if="userFilter.length == 0">Не найдено :(</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import User from "./User";

export default {
  components: { User },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
  computed: {
    ...mapGetters(["allUsers"]),
    admins: function() {
      return this.userFilter.filter((user) => {
        if (user.admin) {
          return user;
        }
      });
    },
    banned: function() {
      return this.userFilter.filter((user) => {
        if (user.ban) {
          return user;
        }
      });
    },
    others: function() {
      return this.userFilter.filter((user) => {
        if (!user.ban && !user.admin) {
          return user;
        }
      });
    },
    userFilter: function() {
      let query = this.query;
      return this.allUsers.filter((user) => {
        if (
          query !== "" &&
          (user.login.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()))
        ) {
          return user;
        } else if (query === "") {
          return user;
        }
      });
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admins,
.banned,
.all {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 15px;
  background-color: rgba(118, 71, 206, 0.5);
  /* background-color: var(--color-violet); */
}

.admins,
.banned {
  margin-bottom: 20px;
}

.lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 5vh;
  padding: 20px;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
}

.label {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 36px;
  width: 100%;
  font-weight: 700;
  color: #000;
  text-align: start;
  margin-left: 20px;
  font-family: "Inter", sans-serif;
}

.search {
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  font-size: 20px;
  margin: 20px;
  align-self: start;
}

.query {
  width: 20vw;
  margin-left: 5px;
  border: none;
  outline: none;
  font-size: 20px;
}

.notfound {
  width: 65vw;
  /* background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px; */
  /* height: 5vh; */
  padding: 20px;
}
</style>
