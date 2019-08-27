import Vue from 'vue'
import Router from 'vue-router'
import Contract from '../page/Contract'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/:type',
        name: 'Contract',
        component: Contract
    }]
})