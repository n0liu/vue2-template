import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'

Vue.use(VueRouter)
// 重定向报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/Home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  routes: constantRouterMap
})

export default router
