import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import YmapPlugin from "vue-yandex-maps";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(YmapPlugin);

router.beforeEach((to, from, next) => {
  store.commit("closeAllWindows");
  next();
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
