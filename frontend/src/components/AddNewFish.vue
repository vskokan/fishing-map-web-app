<template>
    <div class="componentbody">
        <div class="submit-form">
            <div class="header">
                Добавить рыбу
            </div>
            <div class="main">
                <div v-if="!submitted">
                    <div  class="fields">
                        <div class="form-group">
                            <label for="id">Id</label>
                            <input
                            type="text"
                            class="form-control"
                            id="title"
                            required
                            v-model="fish.id"
                            name="title"
                            />
                        </div>
                        <div class="form-group">
                            <label for="name">Название</label>
                            <input
                            class="form-control"
                            id="name"
                            required
                            v-model="fish.name"
                            name="description"
                            />
                        </div>
                        <div class="form-group">
                                <label for="name">Фото</label>
                                <input
                                class="form-control"
                                id="photoLink"
                                required
                                v-model="fish.photoLink"
                                name="description"
                                />
                        </div>
                        <div class="form-group">
                            <label for="description">Описание</label>
                            <input
                            class="form-control"
                            id="description"
                            required
                            v-model="fish.description"
                            name="description"
                            />
                        </div>
                    </div>
                    <button @click="savefish">Готово</button>
                </div>
                <div v-else>
                    <h4>Рыба добавлена</h4>
                    <button @click="newfish">Добавить еще</button>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>

import FishDataService from "../services/FishDataService";

export default {
  name: "add-fish",
  data() {
    return {
      fish: {
        id: "",
        name: "",
        photoLink: "",
        description: "",
      },
      submitted: false
    };
  },
  methods: {
    savefish() {
        if ((this.fish.id.length !== 0) && (this.fish.name.length !== 0) && (this.fish.photoLink.length !== 0) && (this.fish.description.length !== 0)) {
            var data = {
                id: this.fish.id,
                name: this.fish.name,
                photoLink: this.fish.photoLink,
                description: this.fish.description
            };

            FishDataService.create(data)
                .then(response => {
                this.fish.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
                })
                .catch(e => {
                console.log(e);
                });
        } else alert('Не все заполнено')
    },
    newfish() {
      this.submitted = false;
      this.fish = {};
    },
  }
};

</script>

<style scoped>

    .submit-form {
        margin: auto;
        width: 400px;
        box-shadow: 0 0 25px rgba(14,42,71,.25);  
        border-radius: 5px;
        padding: 0px 0px 20px 0px;
        background-color: #fff;
    }

    .header {
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: linear-gradient(to right, #7c8e51, #69afce);
        margin-bottom: 30px;
        padding-left: 20px;
        color: #fff;
        font-family: 'Rubik', sans-serif;
        font-size: 35px;
        height: 40px;
    }
    
    .fields {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 200px;
    }

    .form-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px;
        margin-right: 50px;
        margin-left: 50px;
        height: 30px;
        font-family: 'Rubik', sans-serif;
    }

    label {
        font-size: 23px;
    }

    .componentbody {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 180px)
    }

</style>