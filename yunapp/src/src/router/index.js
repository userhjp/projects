import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/pages/Home/Index'
// import Fight from '@/pages/fight/Index'
//import Detail from '@/pages/Home/Detail'
// import MyIndex from '@/pages/My/Index'
// import Put from '@/pages/Put/put'
// import Msg from '@/pages/Msg/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: resolve => require(['@/pages/Home/Index.vue'],resolve),
      children: [
        {
          path: '/detail',
          component: resolve => require(['@/pages/Home/Detail'],resolve)
        }
      ]
    },
    {
      path: '/fight',
      component: resolve => require(['@/pages/fight/Index'],resolve)
    },
    {
      path: '/put',
      component: resolve => require(['@/pages/Put/put'],resolve)
    },
    {
      path: '/msg',
      component: resolve => require(['@/pages/Msg/Index'],resolve)
    },
    {
      path: '/my',
      component: resolve => require(['@/pages/My/Index'],resolve)
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login/login'],resolve)
    }
  ]

})
