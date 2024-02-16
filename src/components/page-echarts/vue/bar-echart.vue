<template>
  <div class="bar-echart">
    <baseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IPropsBar } from '@/types/IProps_pageEchart'

const props = defineProps<IPropsBar>()

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: ''
    },
    tooltip: {},
    xAxis: {
      data: props.barData.labels
    },
    yAxis: {},
    series: [
      {
        name: '人数',
        type: 'bar',
        data: props.barData.values
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.bar-echart {
  color: red;
}
</style>
