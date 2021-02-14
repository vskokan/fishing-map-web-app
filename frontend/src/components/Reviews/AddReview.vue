<template>
  <div class="reviewCard">
    <div class="reviewHeader">Шаг {{ step }} из 3</div>
    <div class="stepPart" v-if="step == 1">
      <div class="formPart">
        <div class="partHeader">
          Здесь клюёт?
        </div>
        <Multiselect
            class="multiselect optional"
            v-model="review.baiting"
            :options="options.baiting"
            label="description"
            track-by="id"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Укажите качество клёва"
            :preselect-first="false"
          />
      </div>
      <div class="formPart">
        <div class="partHeader">
          Добавьте информацию об улове
          <i
            class="fas fa-question-circle"
            @mouseover="help"
            @mouseleave="help"
          ></i>
        </div>
        <p class="description" v-show="showTip">
          Сначала выберите метод ловли и используемую наживку, а затем рыбу,
          пойманную на эту комбинацию. Если вы использовали несколько наживок
          и/или ловили рыбу разными способами, можно добавить несколько
          комбинаций. Даже если Вы ничего не поймали, предусмотрен и такой
          вариант!
        </p>
        <div class="factsTable">
          <div class="iconRow">
            <div>
              <img
                class="icon methods"
                src="../../assets/icons/review/rod2.svg"
              />
            </div>
            <div>
              <img
                class="icon baits"
                src="../../assets/icons/review/bait.svg"
              />
            </div>
            <div>
              <img
                class="icon fishes"
                src="../../assets/icons/review/bucket2.svg"
              />
            </div>
          </div>
          <div class="factsContainer">

          
          <div class="factRow" v-for="(fact, index) in facts" :key="index">
            <div>
              <Multiselect
                class="multiselect methods"
                v-model="fact.method"
                :options="allMethods"
                :multiple="false"
                :close-on-select="true"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Выберите способ"
                label="name"
                track-by="id"
                :preselect-first="false"
              />
            </div>
            <div>
              <Multiselect
                class="multiselect baits"
                v-model="fact.bait"
                :options="allBaits"
                :multiple="false"
                :close-on-select="true"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Выберите приманку"
                label="name"
                track-by="id"
                :preselect-first="false"
              />
            </div>
            <div>
              <Multiselect
                class="multiselect fishes"
                v-model="fact.fishes"
                :options="allFishes"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Выберите рыбу или начните вводить название"
                label="name"
                track-by="id"
                :preselect-first="false"
                :taggable="false"
                @tag="addTag"
              />
            </div>
            <div>
              <button
                class="iconButton delete"
                :class="{ 'iconButton delete disabled': facts.length == 1 }"
                :disabled="facts.length == 1"
                @click="deleteFact(index)"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          </div>
        </div>

        <button class="iconButton add" @click="addFact">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="stepPart step2" v-if="step == 2">
      <div class="formPart">
        <div class="partHeader">
          <!-- <i class="fas fa-feather-alt"></i> -->
          <div>Добавьте описание</div>
        </div>
        <textarea
          class="reviewDescription"
          v-model="review.description"
          v-focus
          placeholder="Расскажите, как прошла ваша рыбалка!"
        ></textarea>
      </div>
      <div class="formPart">
        <div class="partHeader">
          Опционально
        </div>
        <p>
          Укажите время рыбалки и доступность проезда, чтобы помочь другим
          пользователям
        </p>
        <div class="optionalSelect">
          <i class="fas fa-clock"></i>
          <Multiselect
            class="multiselect optional"
            v-model="review.time"
            :options="options.time"
            label="description"
            track-by="id"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Выберите время рыбалки"
            :preselect-first="false"
          />
        </div>
        <div class="optionalSelect">
          <i class="fas fa-car"></i>
          <Multiselect
            class="multiselect optional"
            v-model="review.road"
            :options="options.road"
            label="description"
            track-by="id"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Укажите качество дороги"
            :preselect-first="false"
          />
        </div>
      </div>
    </div>
    <div class="stepPart" v-if="step == 3">
      <div class="partHeader">
        Вы можете прикрепить к отзыву до 5 фотографий
      </div>
      <div class="fileInput">
        <label
          >Выбранные изображения:
          <input
            type="file"
            id="file"
            ref="files"
            name="images"
            accept=".jpg, .jpeg, .png"
            multiple
            :disabled="review.files.length > 5"
            v-on:change="uploadFiles()"
          />
        </label>
        <!-- <img v-bind:src="preview" v-show="showPreview" /> -->
      </div>
      <div class="large-12 medium-12 small-12 cell">
        <div class="previewContainer" v-show="this.review.files.length > 0">
          <!-- <div v-if="this.review.files.length == 0">Изображения не выбраны</div> -->
          <div
            v-for="(file, key) in review.files"
            v-bind:key="key"
            class="large-4 medium-4 small-6 cell file-listing"
          >
            <!-- {{ file.name }} -->
            <div class="previewElem">
              <img class="preview" v-bind:ref="'image' + parseInt(key)" />
              <div class="deleteOnPreview" @click="deleteImage(key)">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="large-12 medium-12 small-12 cell clear">
          <button class="uploadButton" v-on:click="addFiles()">
            Добавить фото<i class="fas fa-images"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="progressContainer"></div>
    <div class="reviewButtons">
      <div class="stepButtons stepOne" v-if="step == 1">
        <button class="navButton" 
        :disabled="hasEmptyFacts(facts) == true" 
        :class="{ 'navButton disabled': hasEmptyFacts(facts) == true }"
        @click="next()">Далее</button>
      </div>
      <div class="stepButtons stepTwo" v-if="step == 2">
        <button class="navButton" @click="back()">Назад</button>
        <button class="navButton" @click="next()">Далее</button>
      </div>
      <div class="stepButtons" v-if="step == 3">
        <button class="navButton" @click="back()">Назад</button>
        <button class="navButton" @click="send()">Опубликовать</button>
      </div>
      <button class="cancel" v-on:click="closeForm">Отмена</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  props: ['latitude', 'longitude'],
  data() {
    return {
      step: 1,
      showTip: false,
      //preview: "",
      //showPreview: false,
      review: {
        login: '',
        baiting: '',
        description: '',
        files: [],
        road: '',
        time: ''
      },
      facts: [
        {
          method: "",
          bait: "",
          fishes: [],
        },
      ],
      // fact: {
      //     method: "",
      //     bait: "",
      //     fishes: []
      // },
    };
  },
  computed: mapGetters(["allFishes", "allBaits", "allMethods", "options", "currentUser"]),
  methods: {
    ...mapActions([
      "fetchFishesNoPagination",
      "fetchBaitsNoPagination",
      "fetchMethodsNoPagination",
      "fetchReviewsNoPagination",
      "getOptions",
      "createFullReview"
    ]),
    ...mapMutations(["changeFormView", ]),
    hasEmptyFacts(facts) {
        let hasEmpty = false
        facts.forEach(fact => {
            if (fact.method == '' || fact.bait == '' || fact.fishes.length == 0 || this.review.baiting == '') {
                hasEmpty = true
                return
            }
        })
        console.log(this.facts)
        return hasEmpty
    },
    next() {
    //   const data = {
    //     facts: this.facts,
    //   };
    //   console.log(data);
    
      if (this.step < 3 ) this.step++;
      if (this.step == 3) this.getPreviews();
    },
    back() {
      if (this.step > 1) this.step--;
    },
    help() {
      this.showTip = !this.showTip;
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    addFact() {
      const fact = {
        localId: this.facts.length + 1,
        method: "",
        bait: "",
        fishes: [],
      };
      this.facts.push(fact);
      //alert(JSON.stringify(this.facts));
    },
    deleteFact(index) {
      this.facts.splice(index, 1);
    },
    uploadFiles() {
      let uploadedFiles = this.$refs.files.files;
      if (
        this.review.files.length > 5 ||
        this.$refs.files.files.length > 5 ||
        this.review.files.length + this.$refs.files.files.length > 5
      ) {
        alert("Превышен лимит!!!");
      } else {
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.review.files.push(uploadedFiles[i]);
        }
        console.log(this.review.files);
        this.getPreviews();
      }
    },
    getPreviews() {
      for (let i = 0; i < this.review.files.length; i++) {
        let fileReader = new FileReader();

        fileReader.addEventListener(
          "load",
          function() {
            this.$refs["image" + parseInt(i)][0].src = fileReader.result;
          }.bind(this),
          false
        );

        fileReader.readAsDataURL(this.review.files[i]);
      }
    },
    addFiles() {
      this.$refs.files.click();
    },
    deleteImage(key) {
      console.log(this.review.files);
      console.log("Должен быть удален файл с индексом ", key);
      this.review.files.splice(key, 1);
      console.log(this.review.files);
      this.getPreviews();
    },
    closeForm() {
            this.changeFormView()
    },
    send() {
        // const review = {
        //     login: this.currentUser.login,
        //     isBaiting: this.review.isBaiting,
        //     facts:this.facts,
        //     description: this.review.description,
        //     roadquality: this.review.roadquality,
        //     fishingtime: this.review.fishingtime,
        //     files: this.review.files
        // }
        let formData = new FormData()

        formData.append('login', this.currentUser.login)
        formData.append('baiting', this.review.baiting.id)
        formData.append('facts', JSON.stringify(this.facts))
        formData.append('description',this.review.description)
        formData.append('road',this.review.road.id)
        formData.append('time',this.review.time.id)
        formData.append('latitude', this.review.latitude)
        formData.append('longitude',this.review.longitude)
        // formData.append('images', this.review.files)

        for( let i = 0; i < this.review.files.length; i++ ){
          let file = this.review.files[i];
        //   formData.append('files[' + i + ']', file);
        formData.append('images', file);
        }
        
        this.createFullReview(formData)
        //.then(this.fetchReviewsNoPagination())
        this.closeForm()
    }
  },
  directives: {
    focus: {
      // определение директивы
      inserted: function(el) {
        el.focus();
      },
    },
  },
  created() {
    this.fetchFishesNoPagination();
    this.fetchBaitsNoPagination();
    this.fetchMethodsNoPagination();
    this.getOptions()
    this.review.latitude = this.latitude
    this.review.longitude = this.longitude
  },
  mounted() {
    alert(this.allBaits)
    this.getPreviews();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.reviewCard {
  width: 1100px;
  /* min-height: 600px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px;
  /* border-radius: 5px; */
  padding: 10px;
  /* box-shadow: 0 0 60px rgba(14, 42, 71, 0.25); */
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
  /* border-radius: 3px;  */
  /* --color-violet: rgb(91, 21, 148);
  --color-yellow: rgb(255, 230, 0); */
  /* --color-darkgray: rgb(56, 56, 56); */
  /* --color-darkgray: rgb(0, 0, 0);
  --color-lightgray: rgb(194, 194, 194); */
}

.stepPart {
  /* border: 1px solid rgb(245, 245, 245); */
  padding: 5px;
}

.reviewHeader {
  color: #000;
  font-size: 36px;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
}

.formPart {
  /* border: 1px solid rgb(245, 245, 245); */
  padding: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.partHeader {
  color: var(--color-darkgray);
  font-size: 24px;
  padding: 10px;
  padding-bottom: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  font-family: "IBM PLex Sans", sans-serif;
}

.radiobuttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.radioBlock {
  /* border: 1px solid #000; */

  width: 80px;
  height: 30px;
  /* box-shadow: 0px 2px #000; */
  /* box-shadow: 0 0 5px rgba(14, 42, 71, 0.25); */
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
  border-radius: 3px;
  border: 3px solid var(--color-violet);
  margin-left: 10px;
  margin-right: 10px;
}

.radioBlock label {
  /* display:inline-block; */
  width: 100%;
  height: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radioBlock label:hover {
  cursor: pointer;
}

.radioBlock:hover {
  background-color: var(--color-violet);
  color: #fff;
}

.selected {
  /* border: 1px solid var(--color-violet); */
  background-color: var(--color-violet);
  color: #fff;
}

.description {
  width: 400px;
  text-align: justify;
  font-size: 16px;

  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 40px rgba(14, 42, 71, 0.25);
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */

  position: absolute;
  right: 200px;
  top: 450px;
  /* margin: auto; */
  /* margin-top: 50px; */
  z-index: 2;
}

.icon {
  height: 30px;
  width: 30px;
  /* margin-right: 10px; */
}

.fa-question-circle {
  margin-left: 5px;
  font-size: 18px;
}

.fa-question-circle:hover {
  cursor: pointer;
}
.fishes {
  width: 500px;
}

.baits,
.methods {
  width: 230px;
  margin-right: 10px;
}

.optional {
    width: 350px;
}

.optionalSelect {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.fa-clock, .fa-car {
    margin-right: 10px;
    color: #000;
    font-size: 20px;
}

.reviewDescription,
.reviewDescription:focus {
  width: 450px;
  height: 250px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 10px;
  resize: none;
  font-size: 20px;
  border: none;
  border-radius: 3px;
  /* border: 2px solid var(--color-violet); */
  outline: none;
  font-family: "Inter", sans-serif;
  background-color: #ebe7ee23;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Rubik", sans-serif;
  box-shadow: rgba(200, 200, 204, 0.15) 0px 30px 60px -10px inset, rgba(0, 0, 0, 0.2) 0px 18px 36px -30px inset;
  /* background-color: rgb(245, 244, 244); */
}

.disabled {
  color: rgb(204, 204, 204);
}

.disabled:hover {
  color: rgb(204, 204, 204);
  cursor: auto;
}
table {
  width: 100%;
}
.factRow,
.iconRow {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.factRow {
  align-content: flex-start;
  margin-bottom: 5px;
}

.delete {
  position: relative;
  top: 10px;
}

.previewContainer {
  height: 120px;
  /* width: 600px; */
  /* background-color: var(--color-lightgray); */
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
}

.preview {
  height: 120px;
  width: 120px;
  border: transparent;
  color: #000;
  border-radius: 3px;
  margin-right: 10px;
  object-fit: cover;
}

input[type="file"] {
  display: none;
}

.fileInput label {
  display: none;
}

.deleteOnPreview {
  position: relative;
  bottom: 115px;
  left: 90px;
  background-color: #fff;
  width: 20px;
  border: 3px solid var(--color-violet);
  color: #000;
  border-radius: 5px;
}

.deleteOnPreview:hover {
  cursor: pointer;
}

.uploadButton {
  /* background-color: var(--color-violet); */
  padding: 10px;
  border-radius: 10px;
  border: 3px solid var(--color-violet);
  color: #000;
  font-family: "Rubik", sans-serif;
  /* font-weight: 700; */
  border: none;
  background-color: var(--color-violet);
  color: rgb(255, 255, 255);
}

.uploadButton:hover {
  background-color: var(--color-violet);
  color: #fff;
}

.fa-images {
  margin-left: 10px;
}

.step2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.step2 p {
  width: 500px;
  font-family: "Inter", sans-serif;
  color: #000;
}

.cancel {
  margin: 10px 0px;
}



</style>

<style>
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 5px 26px 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  background: var(--color-violet);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: 16px;
}

.multiselect__tag-icon:after {
  content: "\D7";
  color: var(--color-yellow);
  font-size: 16px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: var(--color-violet);
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: var(--color-violet);
}

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

.delete {
  font-size: 16px;
  color: var(--color-violet);
  margin-left: 5px;
  border: none;
  background-color: transparent;
}

.add {
  color: var(--color-violet);
  font-size: 16px;
  margin-top: 15px;
  border: none;
  background-color: transparent;
}

.delete:hover,
.add:hover {
  cursor: pointer;
}

.stepOne {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.stepTwo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button {
  border: none;
  background-color: transparent;

  font-size: 20px;
}

button:hover {
  cursor: pointer;
}

.navButton {
  color: var(--color-violet);
  margin: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
}

.multiselect__placeholder {
  color: var(--color-darkgray);
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
  font-weight: 700;
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
  font-weight: 700;
}

.multiselect__single {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  color: var(--color-darkgray);
}

.multiselect__option--highlight {
  background: var(--color-violet);
  outline: none;
  color: #fff;
}
</style>
