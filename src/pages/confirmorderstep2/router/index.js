import Vue from 'vue'
import Router from 'vue-router'
import Confirmorderstep2 from '../page/Confirmorderstep2';
import Addvisitors from '../page/Addvisitors';
import Countrypicker from '../page/Countrypicker';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Confirmorderstep2',
      component: Confirmorderstep2
    },
      {
          path: '/addvisitors',
          name: 'addvisitors',
          component: Addvisitors
      },
      {
          path: '/countrypicker',
          name: 'Countrypicker',
          component: Countrypicker
      }
  ]
})