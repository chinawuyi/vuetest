import Vue from 'vue'
import Router from 'vue-router'
import TravelProduct from '../page/TravelProduct'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/:productId/:id',
        name: 'TravelProduct',
        component: TravelProduct
    }]
})