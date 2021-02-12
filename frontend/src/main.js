import Vue from 'vue'
import App from './App.vue'
import router from './router'
import YmapPlugin from 'vue-yandex-maps'
//import Menu from './components/Menu.vue'
import store from './store'
Vue.config.productionTip = false
Vue.use(YmapPlugin)

new Vue({
  store,
  router,
  //Menu,
  render: h => h(App),
}).$mount('#app')


