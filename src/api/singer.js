import { request } from '@/assets/js/request'

// 获取歌手描述
export function singerDescApi (id) {
  return request({
    url: '/artist/desc',
    params: { id }
  }).catch(err => err)
}

// 获取歌手详情
export function singerDetailApi (id) {
  return request({
    url: '/artist/detail',
    params: { id }
  }).catch(err => err)
}

// 获取歌手单曲
export function singerSongsApi (id) {
  return request({
    url: 'artists',
    params: { id }
  }).catch(err => err)
}

// 获取歌手MV
export function singerMvApi (id) {
  return request({
    url: '/artist/mv',
    params: { id }
  }).catch(err => err)
}

// 关注
export function followApi (id, t) {
  return request({
    url: '/artist/sub',
    params: { id, t }
  }).catch(err => err)
}

// 收藏的歌手

export function subListApi () {
  return request({
    url: '/artist/sublist'
  }).catch(err => err)
}
