<template>
  <div class="pie-echart">
    <baseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 拿到base-echart 传入相应的Option生成相应的图形
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

import type { IPropsPie } from '@/types/IProps_pageEchart'

const props = defineProps<IPropsPie>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'count',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: props.pieData
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
