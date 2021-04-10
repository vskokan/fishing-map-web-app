<template>
  <div class="passwordSettings">
    <div class="area">
      <div class="inputContainer">
        <label for="name">Введите текущий пароль</label>
        <input type="text" v-model="password.current" />
      </div>
      <div class="inputContainer">
        <label for="name">Введите новый пароль</label>
        <input type="text" v-model="password.new" @input="validatePassword" />
      </div>
      <div class="validationError">{{ validationMessage.safety }}</div>
      <div class="inputContainer">
        <label for="name">Повторите новый пароль</label>
        <input
          type="password"
          v-model="password.repeated"
          @input="checkPasswordMatch"
        />
      </div>
      <div class="validationError">{{ validationMessage.match }}</div>
      <div class="description">
        Новый пароль должен быть не менее 8 символов в длину, состоять из
        латинских букв, иметь как минимум одну цифру, спецсимвол и заглавную
        букву
      </div>
    </div>
    <div
      class="response"
      :class="{
        'response fail': serverResponse == 'Введен неправильный текущий пароль',
        'response success': serverResponse == 'Пароль успешно обновлен',
      }"
    >
      {{ serverResponse }}
    </div>
    <button class="button-simple" @click="send">Применить</button>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
//import { mapActions } from 'vuex'
import UserData from "../../services/UserData";

export default {
  props: ["user"],
  data() {
    return {
      password: {
        current: "",
        new: "",
        repeated: "",
      },
      validationMessage: {
        safety: "",
        match: "",
      },
      serverResponse: "",
    };
  },
  methods: {
    validatePassword() {
      const re = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      );
      if (this.password.current == this.password.new) {
        this.validationMessage.safety =
          "Старый и новый пароли не должны совпадать";
      } else if (this.password.new.match(re) !== null) {
        this.validationMessage.safety = "";
      } else {
        this.validationMessage.safety = "Слабый пароль";
      }
    },
    checkPasswordMatch() {
      if (this.password.new === this.password.repeated) {
        this.validationMessage.match = "";
      } else {
        this.validationMessage.match = "Новые пароли не совпадают";
      }
    },
    send() {
      if (
        this.validationMessage.safety == "" &&
        this.validationMessage.match == ""
      ) {
        const data = new FormData();
        data.append("oldPassword", this.password.current);
        data.append("newPassword", this.password.new);

        UserData.updatePassword(this.user.login, data).then((json) => {
          if (json.data.message == "wrong password") {
            this.serverResponse = "Введен неправильный текущий пароль";
          }

          if (json.data.message == "password updated") {
            this.serverResponse = "Пароль успешно обновлен";
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.passwordSettings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: #000;
  width: 65vw;
  padding: 20px;
  height: 100%;
}

.area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60vw;
}

input {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

input:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

.inputContainer {
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
}

.description {
  width: 40vw;
  text-align: start;
  margin-top: 20px;
}

.validationError {
  height: 3vh;
  text-align: start;
  color: rgb(192, 67, 67);
}

.fail {
   color: rgb(192, 67, 67);
}

.success {
    color: rgb(20, 145, 87);
}
</style>
