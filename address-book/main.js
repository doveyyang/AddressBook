import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
