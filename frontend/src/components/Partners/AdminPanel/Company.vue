<template>
  <div class="company-container">
    <div class="company" v-if="!isEditing">
      <main>
        <div class="info">
          <div class="left">
            <img class="logo" :src="'http://localhost:3000/' + company.logo" />
            <div class="name">
              {{ company.name }}
            </div>
            <div class="email">
              <i class="fas fa-envelope"></i>
              {{ company.email }}
            </div>
            <div class="website">
              <i class="fas fa-globe"></i>
              {{ company.website }}
            </div>
            <div class="departmentsAmount">
              <i class="fas fa-store-alt"></i>
              {{ "Филиалов: " + company.departmentsAmount }}
            </div>
          </div>
          <div class="description">
            {{ company.description }}
          </div>
          <div class="actions">
            <i class="fas fa-pen" @click="startEdition()"></i>
            <i class="fas fa-trash" @click="deleteCompanyById(company.id)"></i>
          </div>
        </div>
      </main>
      <footer>
        <div class="contract-info">
          <div class="plan">
            {{ company.contractPlanName || "Тут будет тариф" }}
          </div>
          <div class="term">
            {{
              "На " + company.contractTerm + " мес." ||
                "Тут будет срок контракта"
            }}
          </div>
          <div class="date">
            {{
              "Действует с " + company.contractCreationDate ||
                "Тут будет дата заключения контракта"
            }}
          </div>
          <div class="status">
            {{
              "Статус: " +
                (company.isContractActive ? "Активен" : "Просрочен") ||
                "Тут будет статус контракта"
            }}
          </div>
        </div>
      </footer>
      <div class="departments" v-if="departmentsAreLoaded">
        {{
          departments.length == 0 || departments == undefined
            ? "Нет филиалов :("
            : ""
        }}
        <Department
          v-for="department in departments"
          :key="department.id"
          v-bind:department="department"
        />
      </div>
      <div class="addDepartment">
        <i class="fas fa-plus"></i>
        <div>Добавить филиал</div>
      </div>
    </div>
    <div class="company-edit" v-if="isEditing">
      <main>
        <div class="info">
          <div class="left">
            <div class="name">
              <i class="fas fa-briefcase"></i>
              <input type="text" id="name" v-model="updatedCompany.name" />
            </div>
            <div class="email">
              <i class="fas fa-envelope"></i>
              <input type="text" v-model="updatedCompany.email" />
            </div>
            <div class="website">
              <i class="fas fa-globe"></i>
              <input type="text" v-model="updatedCompany.website" />
            </div>
          </div>
          <div class="description">
            <textarea type="text" v-model="updatedCompany.description" />
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
          <!-- <p>
            {{ isFileChosen ? this.updatedCompany.logo.name : "Файл не выбран" }}
          </p> -->
        </div>
        <div class="emptyPreview" v-if="!isFileChosen">
          <img
            :src="'http://localhost:3000/' + company.logo"
            height="200"
            alt="Превью"
          />
          
        </div>
        <div class="newPreview" v-else>
          <img :src="fileSrc" height="200" alt="Превью" />
          <button class="button-simple" @click="clearPreview()">Отмена</button>
        </div>
        
        
      </div>
      <footer>
        <div class="contract-info">
          <div class="plan">
            <Multiselect
              v-if="plansAreLoaded"
              class="multiselect location"
              v-model="updatedCompany.contractPlan"
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
              {{ updatedCompany.contractTerm }}
              <i class="fas fa-plus" @click="increment()"></i> месяцев
            </div>
          </div>
          <div class="date">
            Дата заключения контракта
            <input type="date" v-model="updatedCompany.contractCreationDate" />
          </div>
        </div>
      </footer>
                <div class="actions">
            <i class="fas fa-plus" @click="update()"></i>
            <i class="fas fa-times" @click="isEditing = false"></i>
          </div>
    </div>
  </div>
</template>

<script>
import CompanyData from "../../../services/CompanyData";
import Department from "./Department";
import Multiselect from "vue-multiselect";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["company"],
  components: {
    Department,
    Multiselect,
  },
  data() {
    return {
      isEditing: false,
      departments: [],
      departmentsAreLoaded: false,
      updatedCompany: {
        name: this.company.name,
        email: this.company.email,
        website: this.company.website,
        description: this.company.description,
        contractPlan: {},
        contractTerm: this.company.contractTerm,
        contractCreationDate: this.company.rawContractCreationDate.substr(
          0,
          10
        ),
        logo: '',
      },
      
      isFileChosen: false,
       fileSrc: "",
    };
  },
  computed: mapGetters(["plansAreLoaded", "allPlans"]),
  methods: {
    ...mapActions(["deleteCompany", "fetchPlans", "updateCompany"]),
    deleteCompanyById(id) {
      this.deleteCompany(id);
    },
    startEdition() {
      this.findCompanyPlan();
      this.isEditing = true;
    },
        increment() {
      this.updatedCompany.contractTerm++;
    },
    decrement() {
      if (this.updatedCompany.contractTerm > 1) {
        this.updatedCompany.contractTerm--;
      }
    },
    findCompanyPlan() {
      this.allPlans.forEach((plan) => {
        // console.log(location)
        console.log(plan);
        if (plan.id == this.company.contractPlanId) {
          // alert(location.locationId)

          this.updatedCompany.contractPlan = plan;
        }
      });
    },
    uploadImage() {
      this.isFileChosen = true;
      this.updatedCompany.logo = this.$refs.file.files[0];
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
    clearPreview() {
      this.fileSrc = ''
      this.updatedCompany.logo = this.company.logo
      this.isFileChosen = false
    },
    update() {
      const formData = new FormData()
      formData.append('name', this.updatedCompany.name)
      formData.append('email', this.updatedCompany.email)
      formData.append('website', this.updatedCompany.website)
      formData.append('description', this.updatedCompany.description)
      formData.append('contractPlan', this.updatedCompany.contractPlan.id)
      formData.append('contractTerm', this.updatedCompany.contractTerm)
      formData.append('contractCreationDate', this.updatedCompany.contractCreationDate)
      formData.append('logo', this.updatedCompany.logo)

      const companyToUpdate = {
        id: this.company.id,
        data: formData
      }

      this.updateCompany(companyToUpdate)
      this.isEditing = false
    }
  },
  created() {
    CompanyData.getDepartments(this.company.id).then((json) => {
      this.departments = json.data;
      this.departmentsAreLoaded = true;
      this.fetchPlans();
    });
  },
};
</script>

<style scoped>
.company,
.company-edit {
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

.info {
  display: flex;
  flex-direction: row;
}

.left {
  display: flex;
  flex-direction: column;
  width: 20vw;
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
  height: 20vh;

  object-fit: contain;
}

main {
  min-height: 30vh;
}

.contract-info {
  display: flex;
  flex-direction: row;
  width: 60vw;
  justify-content: space-between;
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

.company-edit .left {
  display: flex;
  flex-direction: column;
  width: 16vw;
}

.company-edit  .logo {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: auto;
}

.company-edit  .left .fas {
  font-size: 20px;
  margin-right: 10px;
}

.company-edit  .actions .fas {
  margin: 0px 5px;
  color: var(--color-darkgray);
}

.company-edit  .actions .fas:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.company-edit .emptyPreview {
  width: 300px;
  height: 200px;
  /* background-color: var(--color-lightgray);
  color: var(--color-darkgray); */
  /* border: 2px dashed var(--color-darkgray); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
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

.term {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
