<template>
  <div class="company">
    <main>
      <div class="info">
        <div class="left">
          <div class="name">
            <i class="fas fa-briefcase"></i>
            <input
              type="text"
              id="name"
              v-model="newCompany.name"
              placeholder="Название компании"
            />
          </div>
          <div class="email">
            <i class="fas fa-envelope"></i>
            <input
              type="text"
              id="name"
              v-model="newCompany.email"
              placeholder="Адрес электронной почты"
            />
          </div>
          <div class="website">
            <i class="fas fa-globe"></i>
            <input
              type="text"
              id="name"
              v-model="newCompany.website"
              placeholder="Сайт или страничка в соцсетях"
            />
          </div>
        </div>
        <div class="description">
          <textarea
            v-model="newCompany.description"
            placeholder="Описание деятельности"
          >
          </textarea>
        </div>
      </div>
    </main>
    <div class="logo">
      <div class="upload">
        <label for="logo" class="custom-file-upload"
          >Выбрать логотип <i class="fas fa-file-upload"></i
        ></label>
        <input
          type="file"
          name="logo"
          id="logo"
          accept=".jpg, .jpeg, .png"
          ref="file"
          v-on:change="uploadImage()"
          required
        />
        <p>{{ isFileChosen ? this.newCompany.logo.name : "Файл не выбран" }}</p>
      </div>
      <div class="emptyPreview" v-if="!isFileChosen">
        <i class="fas fa-image"></i>
      </div>
      <img v-else :src="fileSrc" height="200" alt="Превью" />
    </div>
    <footer>
      <div class="contract-info">
        <div class="plan">
          <Multiselect
            v-if="plansAreLoaded"
            class="multiselect location"
            v-model="newCompany.contractPlan"
            :hide-selected="true"
            :options="allPlans"
            label="name"
            track-by="id"
            placeholder="Выберите тариф"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
          />
        </div>
        <div class="term">
          <div class="termInput">
            <i class="fas fa-minus" @click="decrement()"></i>
            {{ newCompany.contractTerm }}
            <i class="fas fa-plus" @click="increment()"></i> месяцев
          </div>
        </div>
        <div class="date">
          Дата заключения контракта
          <input type="date" v-model="newCompany.contractCreationDate" />
        </div>
      </div>
    </footer>
    <div class="actions">
      <i class="fas fa-plus" @click="create()"></i>
      <i class="fas fa-times" @click="endCompanyCreation()"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      newCompany: {
        name: "",
        logo: "",
        email: "",
        website: "",
        description: "",
        contractPlan: "",
        contractTerm: 1,
        contractCreationDate: "",
      },
      isFileChosen: false,
      fileSrc: "",
    };
  },
  computed: mapGetters(["plansAreLoaded", "allPlans"]),
  methods: {
    ...mapActions(["fetchPlans", "createCompany"]),
    ...mapMutations(["endCompanyCreation"]),
    increment() {
      this.newCompany.contractTerm++;
    },
    decrement() {
      if (this.newCompany.contractTerm > 1) {
        this.newCompany.contractTerm--;
      }
    },
    uploadImage() {
      this.isFileChosen = true;
      this.newCompany.logo = this.$refs.file.files[0];
      this.getPreviews();
    },
    getPreviews() {
      let fileReader = new FileReader();

      fileReader.addEventListener(
        "load",
        () => {
          this.fileSrc = fileReader.result;
        }
      );

      fileReader.readAsDataURL(this.$refs.file.files[0]);
    },
    create() {
      const data = new FormData()

      data.append('name', this.newCompany.name)
      data.append('logo', this.newCompany.logo)
      data.append('email', this.newCompany.email)
      data.append('description', this.newCompany.description)
      data.append('website', this.newCompany.website)
      data.append('contractPlan', this.newCompany.contractPlan.id)
      data.append('contractTerm', this.newCompany.contractTerm)
      data.append('contractCreationDate', this.newCompany.contractCreationDate)

      this.createCompany(data)
      this.endCompanyCreation()
      //console.log(this.newCompany)
    }
  },
  created() {
    this.fetchPlans();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  min-height: 10vh;
  padding: 20px;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
}

.left {
  display: flex;
  flex-direction: column;
  width: 16vw;
}

.description {
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  text-align: start;
  /* align-items: flex-start; */
}

.logo {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.emptyPreview {
  width: 300px;
  height: 200px;
  background-color: var(--color-lightgray);
  color: var(--color-darkgray);
  /* border: 2px dashed var(--color-darkgray); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

main {
  min-height: 20vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.info {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}

.contract-info {
  display: flex;
  flex-direction: row;
  width: 60vw;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;
}

.departments {
  width: 60vw;
  background-color: rgb(248, 248, 248);
  padding: 20px;
  margin: 20px 0px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
  margin: 20px 0px;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
}

.left .fas {
  font-size: 20px;
  margin-right: 10px;
}

.actions .fas {
  margin: 0px 5px;
  color: var(--color-darkgray);
}

.actions .fas:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.addDepartment {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-darkgray);
}

.addDepartment .fas {
  margin: 0px 5px;
}

.addDepartment:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.location {
  width: 17vw;
  color: #000;
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
  width: 40vw;
  resize: none;
  height: 12vh;
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
  width: 250px;
  font-family: "Rubik", sans-serif;
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

<style>
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: var(--color-violet);
  color: rgb(150, 0, 0);
  display: none;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: var(--color-yellow);
  display: none;
}

.multiselect__placeholder {
  color: var(--color-darkgray);
  font-family: "Inter", sans-serif;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
  color: #000;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__option {
  display: block;
  padding: 12px;
  /* color: var(--color-darkgray); */
  font-family: "Inter", sans-serif;
  color: #000;
  /* font-weight: 700; */
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option--selected {
  background: var(--color-violet);
  color: var(--color-yellow);
  /* font-weight: 700; */
}

.multiselect__single {
  font-family: "Inter", sans-serif;
  /* font-weight: 700; */
  color: #000;
}

.multiselect__option--highlight {
  background: var(--color-violet);
  outline: none;
  color: #fff;
}

.multiselect__placeholder {
  color: var(--color-darkgray);
  color: #000;
  font-family: "Inter", sans-serif;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__option {
  display: block;
  padding: 12px;
  color: var(--color-darkgray);
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: #000;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option--selected {
  background: var(--color-violet);
  color: var(--color-yellow);
  /* font-weight: 700; */
}

.multiselect__single {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: var(--color-darkgray);
  color: #000;
}

.multiselect__option--highlight {
  background: var(--color-violet);
  outline: none;
  color: #fff;
}
</style>
