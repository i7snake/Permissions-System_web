<template>
  <div class="count">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="countRef">{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'
import type { IProps } from '../types/IProps_count'

const props = defineProps<IProps>()

// 创建CountUp动画的实例对象
const countRef = ref<HTMLElement>()
onMounted(() => {
  const countup1 = new CountUp(countRef.value!, props.count)
  countup1.start()
})
</script>

<style lang="less" scoped>
.count {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  // .footer {
  //   display: flex;
  //   height: 38px;
  //   line-height: 38px;
  //   font-size: 14px;
  //   letter-spacing: 1px;
  //   color: rgba(0, 0, 0, 0.85);
  //   border-top: 1px solid #f0f0f0;
  // }
}
</style>
