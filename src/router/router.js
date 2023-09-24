import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Layout from '@/components/layout/layout.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    
    {
      path: '/',
      component: Layout,
      redirect:'/dashboard',
      children:[
        { 
          path:'dashboard',
          name: 'dashboard',
          component: () => import('@/views/home/dashboard.vue')
        },
        { 
          path:'dashboard1',
          name: 'dashboardOne',
          component: () => import('@/views/home/dashboard1.vue')
        },
        { 
          path:'dashboard2',
          name: 'dashboardTwo',
          component: () => import('@/views/home/dashboard2.vue')
        }
      ]
     },
    {
      path: '/issuing',
      component: Layout,
      name: 'issuing',
      children:[
        {
          path:'card',
          name: 'card',
          component: () => import ('@/views/issuing/card.vue')
        },
        {
          path:'account',
          name:'account',
          component: () => import ('@/views/issuing/account.vue')
        },
        {
          path:'transaction',
          name: 'transaction_issuing',
          component: () => import ('@/views/issuing/transaction.vue')
        }
      ]
     },
    {
      path: '/aquiring',
      component: Layout,
      name: 'aquiring',
      children:[
        {
          path:'terminal',
          name: 'terminal',
          component: () => import ('@/views/aquiring/terminal.vue')
        },
        {
          path:'transaction',
          name: 'transaction_aquiring',
          component: () => import ('@/views/aquiring/transaction.vue')
        }
      ]
     },
    {
      path: '/administration',
      component: Layout,
      name: 'administration',
      children:[
        {
          path:'user',
          name: 'user',
          component: () => import ('@/views/administration/user.vue')
        },
        {
          path:'page',
          name:'page',
          component: () => import ('@/views/administration/page.vue')
        },
      ]
     },
    {
      path: '/project',
      component: Layout,
      name: 'project',
      children:[
        {
          path:'add/:id',
          name: 'project_add',
          component: () => import ('@/views/project/add.vue')
        },
        {
          path:'list',
          name:'project_list',
          component: () => import ('@/views/project/list.vue')
        },
      ]
     },
    {
      path: '/configuration',
      component: Layout,
      name: 'configuration',
      children:[
        {
          path:'network',
          name: 'network',
          component: () => import ('@/views/configuration/network.vue')
        },
        {
          path:'restriction',
          name:'restriction',
          component: () => import ('@/views/configuration/restriction.vue')
        },
        {
          path:'spec',
          name:'spec',
          component: () => import ('@/views/configuration/spec.vue')
        },
      ]
     },
    {
      path: '/run',
      component: Layout,
      children:[
        {
          path:'',
          name: 'run',
          component: () => import ('@/views/run/test.vue')
        },
        {
          path:'transaction/:id/:type',
          name:'update',
          component: () => import ('@/views/run/transaction.vue')
        },
      ]
     },
     {
      path: '*',
      name: '404',
      component: () => import ('@/views/page_404.vue')
    }
  ]
})



