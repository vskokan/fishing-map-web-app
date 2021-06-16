<template>
  <div class="fish" v-if="!editing">
    <div class="info">
      <img class="photo" :src="'http://localhost:3000/' + fish.img_src" />
      <div class="text">
        <div class="header">
          <div class="name">
            {{ fish.name }}
          </div>
          <div class="buttons">
            <i class="fas fa-pen" @click="editing = !editing"></i>
            <i class="fas fa-trash" @click="remove"></i>
          </div>
        </div>

        <div
          :class="{
            'description-expanded': expanded,
            'description-hidden': !expanded,
          }"
        >
          {{ fish.description }}
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="expand" v-if="!expanded" @click="changeSize">
        Развернуть <i class="fas fa-chevron-down"></i>
      </div>
      <div class="hide" v-else @click="changeSize">
        Свернуть <i class="fas fa-chevron-up"></i>
      </div>
    </div>
  </div>
  <div class="editedFish" v-else>
    <div class="info">
      <div class="fileuploading">
        <div class="empty" v-if="!isFileUploaded">
          <img
            :src="'http://localhost:3000/' + this.fish.img_src"
            height="200"
            alt="Превью"
            class="photo"
          />
        </div>
        <div class="newPreview" v-else>
          <img :src="fileSrc" height="200" alt="Превью" class="photo" />
          <div class="cancelPhotoEditing" @click="clearPreview()">Отмена</div>
        </div>
        <div class="upload">
          <label for="photo" class="custom-file-upload">Изменить фото</label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept=".jpg, .jpeg, .png"
            ref="file"
            v-on:change="uploadImage()"
            required
          />
          <p class="fileName">
            {{ isFileUploaded ? fish.img_src.name : "Файл не выбран" }}
          </p>
        </div>
      </div>
      <div class="text">
        <input
          type="text"
          class="name"
          v-model="editedFish.name"
          placeholder="Название рыбы"
        />
        <textarea
          class="description"
          v-model="editedFish.description"
          placeholder="Описание"
        >
        </textarea>
      </div>
    </div>
    <div class="actions">
      <div class="cancel" @click="editing = !editing">
        <i class="fas fa-times"></i>Отмена
      </div>
      <div class="update" @click="update">
        <i class="fas fa-redo-alt"></i>Обновить
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["fish"],
  data() {
    return {
      expanded: false,
      editing: false,
      editedFish: {
        name: this.fish.name,
        description: this.fish.description,
        image: this.fish.img_src,
      },
      isFileUploaded: false,
      fileSrc: "",
    };
  },
  methods: {
    ...mapActions(["deleteFish", "updateFish"]),
    changeSize() {
      this.expanded = !this.expanded;
    },
    remove() {
      this.deleteFish(this.fish.id);
    },
    uploadImage() {
      this.isFileUploaded = true;
      this.editedFish.image = this.$refs.file.files[0];
      this.getPreviews();
    },
    getPreviews() {
      let fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.fileSrc = fileReader.result;
      });

      fileReader.readAsDataURL(this.$refs.file.files[0]);
    },
    clearPreview() {
      this.fileSrc = "";
      this.editedFish.image = this.fish.img_src;
      this.isFileUploaded = false;
    },
    update() {
      let formData = new FormData();

      formData.append("name", this.editedFish.name);
      formData.append("image", this.editedFish.image);
      formData.append("description", this.editedFish.description);

      const data = {
        id: this.fish.id,
        formData: formData,
      };

      this.updateFish(data).then((this.editing = !this.editing));
    },
  },
};
</script>

<style scoped>
.fish,
.editedFish {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 15vh;
  padding: 20px;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.photo {
  width: 10vw;
  height: 15vh;
  object-fit: cover;
  border-radius: 5px;
}

.text {
  width: 53vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.name {
  font-size: 28px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  font-family: "IPM Plex Sans", sans-serif;
}

.description-hidden {
  margin-top: 5px;
  max-height: 10vw;
  width: 50vw;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

.description-expanded {
  text-align: start;
  margin-top: 5px;
  width: 50vw;
}

.hide:hover,
.expand:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.buttons {
  display: flex;
  flex-direction: row;
}

.buttons .fas {
  margin: 0px 5px;
  color: var(--color-darkgray);
}

.buttons .fas:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.hide,
.expand {
  margin-top: 5px;
  justify-self: center;
  color: var(--color-darkgray);
}

input,
textarea {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

textarea {
  width: 48vw;
  resize: none;
  height: 25vh;
}

input:focus,
textarea:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 180px;
  font-family: "Rubik", sans-serif;
  border-radius: 10px;
  cursor: pointer;
  height: 35px;
  font-size: 20px;
  border: none;
  background-color: var(--color-violet);
  color: rgb(255, 255, 255);
  margin: 10px 0px 0px 10px;
  margin: auto;
  margin-top: 20px;
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

.fileName {
  font-size: 18px;
  margin-top: 5px;
  max-width: 10vw;
  text-overflow: ellipsis;
  overflow: hidden;
}

.empty {
  width: 10vw;
  height: 15vh;
  border-radius: 5px;
  background-color: var(--color-lightgray);
  color: var(--color-darkgray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

.cancelPhotoEditing {
  font-size: 18px;
}

.cancelPhotoEditing:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.editedFish .actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15vw;
  margin-top: 15px;
}

.editedFish .actions .fas {
  margin-right: 5px;
}

.cancel {
  font-size: 18px;
  background-color: var(--color-red);
  width: 6vw;
  color: white;
  padding: 5px;
  border-radius: 7px;
}

.cancel:hover {
  cursor: pointer;
  background-color: rgb(139, 58, 58);
}

.update {
  font-size: 18px;
  background-color: var(--color-green);
  width: 6vw;
  color: white;
  padding: 5px;
  border-radius: 7px;
}

.update:hover {
  cursor: pointer;
  background-color: rgb(37, 100, 74);
}
</style>
