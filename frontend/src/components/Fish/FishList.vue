<template>
  <div class="fishes">
    <div class="panel" v-if="!creation">
      <div class="search">
        <i class="fas fa-search"></i
        ><input
          type="text"
          class="query"
          v-model="query"
          placeholder="Найти по названию"
        />
      </div>
      <button class="create button-simple" @click="creation = !creation">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="list" v-if="allFishes !== undefined">
      <NewFish v-if="creation" @closed="creation = !creation" />
      <Fish v-for="fish in fishFilter" v-bind:fish="fish" :key="fish.id"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Fish from "./Fish.vue";
import NewFish from "./NewFish.vue";

export default {
  components: { Fish, NewFish },
  data() {
    return {
      query: "",
      creation: false,
      updating: false,
    };
  },
  computed: {
    ...mapGetters(["allFishes"]),
    fishFilter: function() {
      let query = this.query;
      return this.allFishes.filter((fish) => {
        if (
          query !== "" &&
          fish.name.toLowerCase().includes(query.toLowerCase())
        ) {
          return fish;
        } else if (query === "") {
          return fish;
        }
      });
    },
  },
  methods: {
    ...mapActions(["fetchFishes"]),
  },
  created() {
    this.fetchFishes();
  },
};
</script>

<style scoped>
.fishes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.panel {
  width: 67vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0px;
}

.search {
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  font-size: 20px;
}

.query {
  width: 20vw;
  margin-left: 5px;
  border: none;
  outline: none;
  font-size: 20px;
}
</style>
