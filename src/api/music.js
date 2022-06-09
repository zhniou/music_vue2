import { request } from '@/assets/js/request.js'

// 获取每日推荐歌单
// 获取首页中的 每日推荐 中的歌单列表
export function getDailyRecom () {
  return request({
    url: '/recommend/songs'
  }).catch((err) => err.response)
}

// 获取歌词
export function getLyricApi (id) {
  return request({
    url: '/lyric',
    params: { id }
  }).catch((err) => err.response)
}

// 根据id获取歌词
// export function getLyricApi (id) {
//   return request({
//     url: '/lyric',
//     params: { id }
//   }).catch((err) => err.response)
// }

// 调用此接口 , 传入音乐 id, 可把该音乐从私人 FM 中移除至垃圾桶
export function trashApi (id) {
  return request({
    url: '/fm_trash',
    params: { id }
  }).catch((err) => err.response)
}

// 喜欢音乐
export function likeApi (id, like) {
  return request({
    url: '/like',
    params: { id, like }
  }).catch((err) => err.response)
}
// 根据id查询歌曲url
export function getSongUrlsByIdApi (id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  }).catch((err) => err.response)
}
