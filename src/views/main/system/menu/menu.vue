<template>
  <div class="menu">
    <pageContent
      :content-config="contentConfig"
      @new-click="handleNewUserClick"
      @update-click="handleUpdateUserClick"
    ></pageContent>
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from '../menu/config/content.config'

import { ElMessage } from 'element-plus'

function handleNewUserClick() {
  ElMessage({
    showClose: true,
    message: '对不起，无法创建菜单，请联系管理员进行数据库操作菜单！',
    type: 'warning'
  })
}

function handleUpdateUserClick() {
  ElMessage({
    showClose: true,
    message: '对不起，无法修改菜单，请联系管理员进行数据库操作菜单！',
    type: 'warning'
  })
}
</script>

<style scoped lang="less"></style>
