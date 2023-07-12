import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import store from './store'
Vue.prototype.$store = store

import lib from "./common/lib.js"
Vue.prototype.lib = lib

const app = new Vue({
    ...App,
	store,
	lib
})
app.$mount()
