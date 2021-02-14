<template>
  <div class="form">
    <div class="formHeader">
      <div class="headerText">Добавить рибу</div>
    </div>
    <div class="formBody">
      <div class="inputContainer">
        <!-- <label for="name">Название</label> -->
        <input type="text" name="name" id="name" v-model="fish.name" placeholder="Название" required />
      </div>
      <div class="inputContainerFile">
        <label for="photo" class="custom-file-upload"
          >Выбрать фото <i class="fas fa-file-upload"></i
        ></label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept=".jpg, .jpeg, .png"
          ref="file"
          v-on:change="uploadImage()"
          required
        />
        <p>{{ isFileChosen ? this.fish.image.name : "Файл не выбран" }}</p>
      </div>
      <div class="inputContainer">
        <!-- <label for="description">Описание</label> -->
        <textarea
          name="description"
          id="description"
          v-model="fish.description"
          placeholder="Описание"
        ></textarea>
      </div>
    </div>
    <div class="formButtons">
      <button class="button-simple" v-on:click="send">Ок</button>
      <button class="button-simple" v-on:click="closeForm">Отмена</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      fish: {
        name: "",
        image: "",
        description: "",
      },
      isFileChosen: false,
    };
  },
  methods: {
    ...mapActions(["createFish", "fetchFishes"]),
    ...mapMutations(["insertFish", "changeFormView"]),
    send() {
      let formData = new FormData();
      formData.append("name", this.fish.name);
      formData.append("image", this.fish.image);
      formData.append("description", this.fish.description);
      this.createFish(formData).then(this.fetchFishes());
      this.closeForm();
    },
    uploadImage() {
      this.isFileChosen = true;
      this.fish.image = this.$refs.file.files[0];
    },
    closeForm() {
      this.fish.image = "";
      this.isFileChosen = false;
      this.changeFormView();
    },
  },
};
</script>

<style scoped>
.form {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 600px;
  /* height: 500px; */
  justify-items: center;
  align-items: center;
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px;
}

.formHeader {
  width: 450px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerText {
  font-size: 34px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  font-family: 'IPM Plex Sans', sans-serif;
}

#description {
  resize: none;
  height: 150px;
  width: 500px;
}

#name {
  width: 400px;
  height: 30px;
}

.formBody {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.inputContainer {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}

.inputContainer label {
  font-weight: bold;
  align-self: center;
  color: rgb(91, 21, 148);
}

#name,
#description {
  border-radius: 5px;
  border: none;
  box-shadow: none;
  background-color: #ebe7ee23;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Rubik", sans-serif;
  box-shadow: rgba(200, 200, 204, 0.15) 0px 30px 60px -10px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -30px inset;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 40%;
  font-family: 'Rubik', sans-serif;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  font-size: 22px;
  border: none;
  background-color: var(--color-violet);
  color: rgb(255, 255, 255);
  margin: 10px 0px 0px 10px;
  margin: auto;
}
.inputContainerFile {
  margin-bottom: 20px;
  justify-self: center;
}

.fa-file-upload {
  margin-left: 10px;
}

.custom-file-upload:hover {
  cursor: pointer;
}
</style>