import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../page/Confirmorderstep1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Confirmorderstep1',
      component: Hello
    }
  ]
})
