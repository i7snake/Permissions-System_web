import { defineStore } from 'pinia'
import {
  getChartCountList,
  getChartPieCount,
  getChartBarCount,
  getChartLineCount
} from '@/service/main/analysis/analysis'
import type { IAnalysisState } from '@/types/IAnalysisState'

const userAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    chartCountList: [],
    ChartPieCount: [],
    ChartBarCount: [],
    ChartLineCount: []
  }),
  actions: {
    getChartCountListAction() {
      getChartCountList().then((res) => (this.chartCountList = res.data))
      getChartPieCount().then((res) => (this.ChartPieCount = res.data))
      getChartBarCount().then((res) => (this.ChartBarCount = res.data))
      getChartLineCount().then((res) => (this.ChartLineCount = res.data))
    }
  }
})

export default userAnalysisStore
