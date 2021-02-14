<template>
  <div class="form">
    <div class="formHeader">
      <div class="headerText">Редактировать {{ fish.name }}</div>
    </div>
    <div class="formBody">
      <div class="inputContainer">
        <!-- <label for="name">Название</label> -->
        <input
          type="text"
          name="name"
          id="name"
          v-model="fishToUdpate.name"
          placeholder="Название"
          required
        />
      </div>
      <div class="inputContainer">
        <img class="image" :src="'http://localhost:3000/' + fish.img_src" />
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
        <p>
          {{
            isFileChosen ? this.fishToUdpate.image.name : "Новый файл не выбран"
          }}
        </p>
      </div>
      <div class="inputContainer">
        <!-- <label for="description">Описание</label> -->
        <textarea
          name="description"
          id="description"
          placeholder="Описание"
          v-model="fishToUdpate.description"
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
  props: ["fish"],
  data() {
    return {
      fishToUdpate: {
        id: "",
        name: "",
        description: "",
      },
      isFileChosen: false,
    };
  },
  methods: {
    ...mapActions(["updateFish", "fetchFishes"]),
    ...mapMutations(["changeEditFormView"]),
    send() {
      const id = this.fish.id;
      console.log(id);
      const name = this.fishToUdpate.name;
      const image = this.fishToUdpate.image;
      const description = this.fishToUdpate.description;
      alert(name);
      let formData = new FormData();
      // formData.append('id', id)
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);

      const data = {
        id: id,
        formData: formData,
      };

      this.updateFish(data).then(this.fetchFishes());
      this.closeForm();
    },
    closeForm() {
      this.isFileChosen = false;
      this.changeEditFormView();
    },
    uploadImage() {
      this.isFileChosen = true;
      this.fishToUdpate.image = this.$refs.file.files[0];
    },
  },
  mounted() {
    this.fishToUdpate.name = this.fish.name;
    this.fishToUdpate.description = this.fish.description;
  },
};
</script>


<style scoped>
.form {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 600px;
  /* height: 600px; */
  justify-items: center;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  padding-bottom: 20px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px;
}

.formHeader {
  width: 450px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerText {
  font-size: 34px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  font-family: "IBM Plex Sans", sans-serif;
}

#description {
  resize: none;
  height: 150px;
  width: 500px;
}

#name {
  width: 450px;
  height: 30px;
}

.formBody {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
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
  margin-right: 10px;
  align-self: center;
  color: rgb(91, 21, 148);
}

#name,
#description {
  border-radius: 5px;
  border: none;
  background-color: #ebe7ee23;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Rubik", sans-serif;
  box-shadow: rgba(200, 200, 204, 0.15) 0px 30px 60px -10px inset,
    rgba(0, 0, 0, 0.2) 0px 18px 36px -30px inset;
}

.image {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

img {
  width: 100%;
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
  cursor: pointer;
  height: 40px;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  background-color: var(--color-violet);
  color: rgb(255, 255, 255);
  margin: 10px 0px 0px 10px;
  margin: auto;
  font-family: 'Rubik', sans-serif;
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