import { createRouter, createWebHistory } from 'vue-router'
import DomesticReport from '@/views/demostic/domesticReport/DomesticReport.vue'

// Vue.use(VueRouter)
// // 解决路由重复点击保存问题
// VueRouter.prototype.replace = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// const originalReplace = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalReplace.call(this, location).catch(err => err)
// }


const routes = [
  { path: '/', redirect: '/DomesticReport' },

  {
    path:'/DomesticReport',
    name:'DomesticReport',
    component:DomesticReport
  },

  {
    path:'/DomesticTrend',
    name:'DomesticTrend',
    component:() => import('@/views/demostic/domesticTrend/DomesticTrend.vue')
  },
  {
    path:'/ProvinceCity',
    name:'ProvinceCity',
    component:() => import('@/views/demostic/demosticCityTable/ProvinceCity.vue')
  },

  {
    path:'/GlobalReport',
    name:'GlobalReport',
    component:() => import('@/views/global/globalInfo/GlobalReport.vue')
  },
  {
    path:'/ContinentSum',
    name:'ContinentSum',
    component:() => import('@/views/global/globalContinent/ContinentSum.vue')
  },
  {
    path:'/GlobalDetail',
    name:'GlobalDetail',
    component:() => import('@/views/global/globalDetail/GlobalDetail.vue')
  },
  {
    path:'/GlobalVaccines',
    name:'GlobalVaccines',
    component:() => import('@/views/vaccines/globalVaccines/GlobalVaccines.vue')
  },
  {
    path:'/VaccinesStatus',
    name:'VaccinesStatus',
    component:() => import('@/views/vaccines/vaccinesStatus/VaccinesStatus.vue')
  },
  {
    path:'/VaccinesInfo',
    name:'VaccinesInfo',
    component:() => import('@/views/vaccines/vaccinesInfo/VaccinesInfo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
