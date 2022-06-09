import { request } from '@/assets/js/request.js'

// 搜索
export function searchApi (keywords, type, offset) {
  return request({
    url: 'search',
    params: { keywords, type, offset }
  })
}

// 默认搜索关键字
export function searchWordsApi () {
  return request({
    url: '/search/default'
  }).catch(err => err.response)
}

// 热搜列表
export function hotSearchApi () {
  return request({
    url: '/search/hot'
  }).catch(err => err.response)
}

// 搜索建议
export function getSuggestSearchApi (keywords) {
  return request({
    url: '/search/suggest',
    params: { keywords }
  }).catch(err => err.response)
}

// 搜索多重匹配
export function searchMulMatchApi (keywords) {
  return request({
    url: '/search/multimatch',
    params: { keywords }
  }).catch(err => err.response)
}
