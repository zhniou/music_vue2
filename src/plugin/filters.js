// 格式化数字
const formatNumber = function (num) {
  if (num === 0) return 0
  if (!num) return
  if (Math.abs(num) > 100000000) {
    return Math.floor(num / 100000000) + '亿'
  } else if (Math.abs(num) > 10000) {
    return Math.floor(num / 10000) + '万'
  } else {
    return Math.floor(num)
  }
}
// 格式化视频/音乐等长度
const formatDuration = function (ms) {
  let res = ''
  let h = Math.floor(ms / 3600) % 24
  let m = Math.floor(ms / 60) % 60
  let s = Math.floor(ms / 1) % 60
  if (h > 0) {
    h = h < 10 ? '0' + h : h
    res += `${h}:`
  }
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  res += `${m}:${s}`
  return res
}

const formatData = function (date) {
  const time = new Date()
  const y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  m = m < 10 ? `0${m}` : m
  d = d < 10 ? `0${d}` : d
  return `${y}-${m}-${d}`
}

export default { formatNumber, formatDuration, formatData }
