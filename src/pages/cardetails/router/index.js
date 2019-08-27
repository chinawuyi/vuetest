import Vue from 'vue'
import Router from 'vue-router'
import Cardetails from '../page/Cardetails'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/:carModelId',
        name: 'Cardetails',
        component: Cardetails,
        meta: { keepAlive: true },
    }]
})