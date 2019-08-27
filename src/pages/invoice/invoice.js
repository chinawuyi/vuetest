// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'reset.css'
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import router from './router'
import 'es6-promise/auto'

Vue.config.productionTip = false

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})