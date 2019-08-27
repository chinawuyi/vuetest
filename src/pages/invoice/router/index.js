import Vue from 'vue'
import Router from 'vue-router'
import Invoice from '../page/Invoice'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Invoice',
        component: Invoice
    }]
})