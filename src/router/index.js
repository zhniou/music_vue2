import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  // 首页
  { path: '/index', component: () => import('@/views/Index.vue') },
  // 登录
  { path: '/login', component: () => import('@/views/Login.vue') },
  // 搜索
  {
    path: '/search',
    component: () => import('@/views/Search.vue'),
    redirect: '/search/hotsearch',
    children: [
      {
        // 热搜
        path: '/search/hotsearch',
        component: () => import('@/views/HotSearch.vue')
      },
      // 搜索结果
      {
        path: '/search/searchconent',
        component: () => import('@/views/searchContent.vue')
      }
    ]
  },
  // 日常推荐
  { path: '/dailyrecommend', component: () => import('@/views/DailyRecommend.vue') },
  // 歌单广场
  { path: '/playlist', component: () => import('@/views/Playlist.vue') },
  // 歌单详情
  { path: '/playlistdetail', component: () => import('@/views/PlayListDetail.vue') },
  // 排行榜
  { path: '/toplist', component: () => import('@/views/Toplist.vue') },
  // 歌手详情
  { path: '/singerdetail', component: () => import('@/views/SingerDetail.vue') },
  // 个人中心
  { path: '/mine', component: () => import('@/views/mine.vue') },
  // 私人FM
  { path: '/fm', component: () => import('@/views/fm.vue') },
  // 用户信息页面
  { path: '/userinfo', name: 'userinfo', component: () => import('@/views/userinfo.vue') }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
