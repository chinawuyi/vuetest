// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'reset.css'
import 'mint-ui/lib/style.css'
import router from './router/index'
import 'es6-promise/auto'
import VIscroll from 'viscroll';
import './assets/css/common.css'

Vue.config.productionTip = false

Vue.use(MintUI);
Vue.use(VIscroll, {
    mouseWheel: true,
    click: true,
    preventDefault: true,
    tap: false,
    bounce: false,
    disableMouse: false,
    disablePointer: true,
    disableTouch: false
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})