<template>
  <div class="introduce">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in chartCountList" :key="item.type">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6"><Count v-bind="item"></Count> </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chartCard :header="'部门人数'"><barEchartVue :bar-data="barData" /></chartCard>
      </el-col>
      <el-col :span="12">
        <chartCard :header="'管理统计'"><pieEchartVue :pie-data="pieData" /></chartCard>
      </el-col>
    </el-row>

    <!-- 3.底部的图表 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <chartCard :header="'用户动态'"><lineEchartVue :line-data="lineData" /></chartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="introduce">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Count from './c-cpns/count.vue'
import chartCard from './c-cpns/chart-card.vue'
import userAnalysisStore from '@/pinia/main/analysis/analysis'

import { pieEchartVue, barEchartVue, lineEchartVue } from '@/components/page-echarts'

const analysisStore = userAnalysisStore()
analysisStore.getChartCountListAction()

const { chartCountList, ChartPieCount, ChartBarCount, ChartLineCount } = storeToRefs(analysisStore)

// 具体图表数据
const barData = computed(() => {
  const labels: string[] = ChartBarCount.value.map((item) => item.name)
  const values: number[] = ChartBarCount.value.map((item) => item.userCount)
  return { labels, values }
})

const lineData = computed(() => {
  const labels: string[] = ChartLineCount.value.map((item) => item.realname)
  const values: number[] = ChartLineCount.value.map((item) => item.chatCount)
  return { labels, values }
})
const pieData = ChartPieCount
</script>

<style scoped>
.introduce {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
