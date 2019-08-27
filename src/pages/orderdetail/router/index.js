import Vue from 'vue'
import Router from 'vue-router'
import OrderDetail from '../page/OrderDetail'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/:orderCode/',
        // path: '/',
        name: 'OrderDetail',
        component: OrderDetail
    }]
})