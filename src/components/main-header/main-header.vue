<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="28px" @click="handleMenuIcon">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb></headerCrumb>
      <headerInfo></headerInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

// 0.内部自定义事件
const emit = defineEmits(['FoldChange'])

// 1.记录状态
const isFold = ref(false)
function handleMenuIcon() {
  // 1.改变内部状态
  isFold.value = !isFold.value
  // 2.将事件和状态值传递给父组件
  emit('FoldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
