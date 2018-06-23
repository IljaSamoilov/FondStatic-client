import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Statistics from '@/components/Statistics'
// import axios from 'axios'

Vue.use(Router)

export default new Router({
  routes: [
    /** {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, **/
    {
      path: '/',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
