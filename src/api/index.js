import { request } from '@/assets/js/request.js'

// 获取轮播图数据
export function getSwipeAPI () {
  return request({
    url: '/banner?type=2'
  }).catch((err) => err.response)
}

// 获取推荐歌单数据
export function getRecommendMusicAPI (limit) {
  return request({
    url: 'personalized',
    params: { limit }
  }).catch((err) => err.response)
}

// 获取首页榜单数据
export function getRankAPI (area) {
  return request({
    url: '/artist/list',
    params: { area, limit: 10 }
  }).catch((err) => err.response)
}
