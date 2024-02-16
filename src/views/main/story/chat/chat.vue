<template>
  <div class="chat">
    <editor @submit="handleSubmit"></editor>
  </div>
</template>

<script setup lang="ts" name="chat">
import { ElMessage } from 'element-plus'

import editor from './c-cpns/editor.vue'
import userStoryStore from '@/pinia/main/story/story'

const storyStore = userStoryStore()

// 发布动态
const tempDiv = document.createElement('div') //创建临时元素进行内容判断
function handleSubmit(content: string) {
  tempDiv.innerHTML = content

  const hasContent = tempDiv.textContent?.trim()?.length ?? 0 > 0

  const hasOnlyTags = tempDiv.innerText.trim().length === 0 && tempDiv.children.length > 0

  if (!hasContent || hasOnlyTags) {
    ElMessage('请输入你的通知或其他内容...')
    return
  }

  const dataToSend = {
    content: content // 保留HTML格式
  }

  storyStore.postNewChatAction(dataToSend)
}
</script>

<style lang="less" scoped></style>
