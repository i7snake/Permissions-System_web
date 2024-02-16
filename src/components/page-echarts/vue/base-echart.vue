<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { IPropsBase } from '@/types/IProps_pageEchart'

const props = defineProps<IPropsBase>()

const echartRef = ref<HTMLElement>()

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(echartRef.value, 'light', { renderer: 'canvas' })

  // watchEffect监听option变化, 重新执行
  watchEffect(() => myChart.setOption(props.option))
})
</script>

<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>
