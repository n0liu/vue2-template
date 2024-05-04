import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
// import { getToken } from '@/utils/auth' // getToken from cookie
import { filterAsyncRouter } from '@/store/modules/permission'
// const whiteList = ['/login']// no redirect whitelist

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title + ' - ' + '全e通'
//   }
//   NProgress.start()
//   if (getToken()) {
//     // 已登录且要跳转的页面是登录页
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then((res) => { // 拉取user_info
//           // 动态路由，拉取菜单
//           loadMenus(res, next, to)
//         }).catch(() => {
//           // store.dispatch('LogOut').then(() => {
//           //   location.reload() // 为了重新实例化vue-router对象 避免bug
//           // })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     /* has no token */
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
//       NProgress.done()
//     }
//   }
// })

export const loadMenus = (res, next, to) => {
  const sdata = JSON.parse(JSON.stringify(res.permList))
  const sidebarRoutes = filterAsyncRouter(sdata)
  sidebarRoutes.push({ path: '*', redirect: '/404', hidden: true })
  store.dispatch('GenerateRoutes', sidebarRoutes).then(() => { // 存储路由
    router.addRoutes(sidebarRoutes) // 动态添加可访问路由表
    next({ ...to, replace: true })
  })
  store.dispatch('SetSidebarRouters', sidebarRoutes)
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
