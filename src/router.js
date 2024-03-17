// import { Vue } from 'vue'
import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

import Login from '@/pages/login/login.vue'

import Page404 from '@/pages/error/page404.vue'

import Home from '@/pages/home/home.vue'
import HouseAddandEdit from '@/pages/home/houseAddandEdit.vue'
import PublicationPlan from '@/pages/home/publicationPlan.vue'
import PayTheFee from '@/pages/home/payTheFee.vue'
import PublicationSuccess from '@/pages/home/publicationSuccess.vue'

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
    path: '/home/:pageType',
    name: 'HouseAdd',
    component: HouseAddandEdit,
    meta: { 
      title: '新增房屋資訊'
    }
  },
  {
    path: '/home/:pageType/publication-plan',
    name: 'PublicationPlan',
    component: PublicationPlan,
    meta: { 
      title: '刊登方案 '
    }
  },
  {
    path: '/home/:pageType/pay-the-fee',
    name: 'PayTheFee',
    component: PayTheFee,
    meta: { 
      title: '繳費'
    }
  },
  {
    path: '/home/:pageType/success',
    name: 'PublicationSuccess',
    component: PublicationSuccess,
    meta: { 
      title: '刊登成功'
    }
  },

  



  // {
  //   path: '/home/:pageType/:houseId',
  //   name: 'HouseEdit',
  //   component: HouseAddandEdit,
  //   meta: { 
  //     title: '編輯房屋資訊'
  //   }
  // },

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
