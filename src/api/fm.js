
import { request } from '@/assets/js/request.js'

// 获取FM
export function getFMApi () {
  return request({
    url: '/personal_fm'
  }).catch((err) => err.response)
}
