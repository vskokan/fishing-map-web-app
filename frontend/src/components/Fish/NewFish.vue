<template>
  <div class="fish">
    <div class="info">
      <div class="fileuploading">
        <div class="empty" v-if="!isFileUploaded">
          <i class="fas fa-fish"></i>
        </div>
        <img class="photo" v-else :src="fileSrc" height="200" alt="Превью" />
        <div class="upload">
          <label for="photo" class="custom-file-upload">Загрузить фото</label>
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
            {{ isFileUploaded ? fish.image.name : "Файл не выбран" }}
          </p>
        </div>
      </div>
      <div class="text">
        <input
          type="text"
          class="name"
          v-model="fish.name"
          placeholder="Название рыбы"
        />
        <textarea
          class="description"
          v-model="fish.description"
          placeholder="Описание"
        >
        </textarea>
      </div>
    </div>
    <div class="actions">
      <div class="cancel" @click="close">
        <i class="fas fa-times"></i>Отмена
      </div>
      <div class="update" @click="create">
        <i class="fas fa-plus"></i>Добавить
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fish: {
        name: "",
        description: "",
        image: "",
      },
      isFileUploaded: false,
      fileSrc: "",
    };
  },
  methods: {
    ...mapActions(["createFish"]),
    close() {
      this.$emit("closed");
    },
    uploadImage() {
      this.isFileUploaded = true;
      this.fish.image = this.$refs.file.files[0];
      this.getPreviews();
    },
    getPreviews() {
      let fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.fileSrc = fileReader.result;
      });

      fileReader.readAsDataURL(this.$refs.file.files[0]);
    },
    create() {
      const formData = new FormData();
      formData.append("name", this.fish.name);
      formData.append("image", this.fish.image);
      formData.append("description", this.fish.description);
      this.createFish(formData).then(this.close());
    },
  },
};
</script>

<style scoped>
.fish {
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

.name {
  margin-bottom: 5px;
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


.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15vw;
  margin-top: 15px;
}

.actions .fas {
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
