import Vue from 'vue'
import Cookies from 'js-cookie'
// ElementUI
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import store from './store'
import router from './router'

// global css
import './styles/index.scss'
// 全局注册 components
import install from '@/components/index'
// 图标
import './assets/icons'
import '@/router/routers.js'

import { permission } from '@/utils/permission'

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.directive('permission', permission)
// 注册
Vue.use(install)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
