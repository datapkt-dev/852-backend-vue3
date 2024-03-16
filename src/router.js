// import { Vue } from 'vue'
import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

import Login from '@/pages/login/login.vue'

import Page404 from '@/pages/error/page404.vue'

import Home from '@/pages/home/home.vue'

import TenantList from '@/pages/tenant/tenant-list.vue'
import MessageList from '@/pages/message/message-list.vue'

const routes = [
  
  {
    path: '/',
    name: 'Home',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登入'
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: Home,
    meta: { 
      title: '主頁'
    } 
  },

  {
    path: '/tenant-list',
    name: 'tenant-list',
    component: TenantList,
    meta: { 
      keepAlive: true, 
      title: '房客列表'
    } 
  },
  // {
  //   path: '/tenant-list/:userId',
  //   name: 'tenant-info',
  //   component: TenantInfo,
  //   meta: { 
  //     keepAlive: false, 
  //     title: '房客詳細資料'
  //   } 
  // },

  {
    path: '/message-list',
    name: 'message-list',
    component: MessageList,
    meta: { 
      keepAlive: true, 
      title: '訊息列表'
    } 
  },



  // other pages 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Page404,
    meta: {
      title: 'Page404.page404'
    }
  },



]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  // history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})
export default router
