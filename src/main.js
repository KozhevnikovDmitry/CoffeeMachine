import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

/**
 * Entry point for coffee machine app
 */
new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
