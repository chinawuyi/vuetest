import Vue from 'vue'
import Router from 'vue-router'
import Reserve from '../page/Reserve'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Reserve',
        component: Reserve
    }]
})