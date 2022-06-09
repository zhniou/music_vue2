import { request } from '@/assets/js/request'

// 获取所有榜单数据
export function topListApi () {
  return request({
    url: '/toplist/detail'
  }).catch(err => err)
}

// // 获取所有榜单
// export function allListApi () {
//   return request({
//     url: '/toplist'
//   }).catch(err => err)
// }
