import Vue from 'vue'
import Router from 'vue-router'
import TravelList from '../page/TravelList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:featureWordsId',
      name: 'TravelList',
      component: TravelList
    }
  ]
})
