import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../page/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    }
  ]
})
