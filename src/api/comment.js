import { request } from '@/assets/js/request.js'

// 获取歌单评论
export function playlistCommentApi (id, limit, offset, before) {
  return request({
    url: '/comment/playlist',
    params: { id, limit, offset, before }
  }).catch((err) => err.response)
}
