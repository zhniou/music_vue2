import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入初始化样式表
import '../src/assets/css/reset.css'
import '../src/assets/css/icon.css'
// 导入响应式组件
import 'amfe-flexible'

// 导入VantUI框架
import 'vant/lib/index.css'
import 'vant/lib/index.less'

// 导入vant的 懒加载 弹出框 轻提示 组件
import Vant, { Lazyload, Dialog, Toast, Notify } from 'vant'

// 引入全局过滤器
import filters from './plugin/filters.js'

// 注册全局组件
import Loading from '@/components/Loading.vue'
Vue.component('Loading', Loading)

Vue.use(Vant)
Vue.use(Lazyload)
Vue.prototype.$msg = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

// // 路由导航
// router.beforeEach((to, from, next) => {
//   const token = window.localStorage.getItem('token')
//   if (to.matched.some((r) => r.meta.isUserLogin)) {
//     if (token) {
//       next()
//     } else {
//       Toast.fail('您尚未登录 请先登录')
//       next({
//         path: '/index',
//         param: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
