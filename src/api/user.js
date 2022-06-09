import { request } from '@/assets/js/request.js'

// 手机登录
export function login (phone, password) {
  return request({
    url: '/login/cellphone',
    params: { phone, password }
  }).catch((err) => err.response)
}

// 获取登录状态
export function getLoginStatusApi () {
  return request({
    url: '/login/status'
  })
}

// 退出登陆
export function logoutApi () {
  return request({
    url: '/logout'
  }).catch((err) => err.response)
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userSubCountApi () {
  return request({
    url: '/user/subcount'
  }).catch((err) => err.response)
}

// 获取用户信息
export function userInfoApi (uid) {
  return request({
    url: '/user/detail',
    params: { uid }
  }).catch((err) => err.response)
}

// 关注或者取消关注
export function followApi (id, t) {
  return request({
    url: '/follow',
    params: { id, t }
  }).catch((err) => err.response)
}

// 用户喜欢的音乐详情
// export function musicDetailApi (ids) {
//   return request({
//     url: '/song/detail',
//     params: { ids }
//   }).catch((err) => err.response)
// }

// 获取用户歌单
export function userPlaylistApi (uid) {
  return request({
    url: '/user/playlist',
    params: { uid }
  }).catch(err => err.response)
}
