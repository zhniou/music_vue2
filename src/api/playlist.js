import { request } from '@/assets/js/request.js'
// 获取歌单
export function playlistApi (limit, offset) {
  return request({
    url: '/top/playlist',
    params: { limit, offset }
  }).catch(err => err)
}

// 获取歌单歌曲
export function playlistSongsApi (id) {
  return request({
    url: '/playlist/track/all',
    params: { id, limit: 20 }
  }).catch(err => err)
}

// 获取歌单详情-所有歌曲
export function playlistDetailApi (id) {
  return request({
    url: '/playlist/track/all',
    params: { id, limit: 50 }
  }).catch(err => err)
}

// 获取歌单详情信息
export function palyListInfoApi (id) {
  return request({
    url: '/playlist/detail',
    params: { id }
  })
}

// 歌单详情动态
export function palyListDynamicApi (id) {
  return request({
    url: '/playlist/detail/dynamic',
    params: { id }
  })
}

// 获取歌单评论
export function playlistCommentApi (id, limit, offset) {
  return request({
    url: '/comment/playlist',
    params: { id, limit, offset }
  })
}

// 获取歌单分类
export function playlistSortApi () {
  return request({
    url: '/playlist/catlist'
  }).catch(err => err)
}

// 获取歌单 ( 网友精选碟 )
export function topPlayListApi (cat, offset) {
  return request({
    url: '/top/playlist',
    params: { cat, offset }
  }).catch((err) => err.response)
}
