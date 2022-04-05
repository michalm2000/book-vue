import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VuePopper from 'vue-popperjs'
//import BFormSelect from 'bootstrap-vue'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

//Vue.component('b-form-select', BFormSelect)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: {
    'popper': VuePopper 
  }
}).$mount('#app')
