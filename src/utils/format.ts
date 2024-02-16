import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 引入中文本地化

import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)

// 格式化时间
export function formatUTC(utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}

// 辅助函数：格式化时间
export function formatTime(timestamp: string) {
  const currentTime = dayjs()
  const updateTime = dayjs(timestamp)
  const diffDuration = dayjs.duration(currentTime.diff(updateTime))

  // 使用 dayjs 提供的 humanize 方法来获取相对于当前时间的人性化描述
  return diffDuration.humanize()
}
