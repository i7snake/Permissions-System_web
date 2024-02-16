import axiosRequest from '@/service'

// 顶部统计
export function getChartCountList() {
  return axiosRequest.get({
    url: '/chart/count'
  })
}

// 饼图统计
export function getChartPieCount() {
  return axiosRequest.get({
    url: '/chart/pie/count'
  })
}

// 柱图统计
export function getChartBarCount() {
  return axiosRequest.get({
    url: `/chart/bar/department`
  })
}

// 折线图统计
export function getChartLineCount() {
  return axiosRequest.get({
    url: '/chart/line/chat'
  })
}
