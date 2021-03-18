<template>
  <div class="contanter">
    <div class="header">
        {{ fish.name }}
    </div>
    <div class="info">
      <div class="image">
          {{ fish.img_src }}
      </div>
      <div class="description">
          {{ fish.description }}
      </div>
    </div>
    <div class="stats">Сюда диаграммки</div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  props: ["fish"],
  computed: mapGetters('currentFish'),
  methods: {
      ...mapActions(['fetchFish']),
  },
  created() {
      this.fetchFish(this.fish)
  },
};
</script>