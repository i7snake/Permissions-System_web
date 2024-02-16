import type { EChartsOption } from 'echarts'

//option类型
export interface IPropsBase {
  option: EChartsOption
}

// 柱状图
interface IBarEchartValueType {
  labels: string[]
  values: number[]
}
export interface IPropsBar {
  barData: IBarEchartValueType
}

// 折线图
export interface IPropsLine {
  lineData: IBarEchartValueType
}

// 饼图
interface IpieEchartValueType {
  value: number
  name: string
}
export interface IPropsPie {
  pieData: IpieEchartValueType[]
}
