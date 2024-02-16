<template>
  <div class="chart-card">
    <el-card class="box-card" :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from '../types/IProps_chartCard'

withDefaults(defineProps<IProps>(), {
  header: '卡片的头部标题'
})
</script>

<style lang="less" scoped></style>
