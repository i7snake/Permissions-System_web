<template>
  <div class="line-echart">
    <baseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

import type { IPropsLine } from '@/types/IProps_pageEchart'

const props = defineProps<IPropsLine>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.lineData.labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '用户动态发布统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.lineData.values
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
