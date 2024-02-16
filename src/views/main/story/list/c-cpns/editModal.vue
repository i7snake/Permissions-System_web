<template>
  <div class="edit-modal">
    <el-dialog v-model="centerDialogVisible" title="是否修改" width="50%" center>
      <textarea v-model="editedContent" class="text" rows="10" cols="50"></textarea>
      <div class="preview" v-html="editedContent"></div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editClickAction"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userStoryStore from '@/pinia/main/story/story'

const centerDialogVisible = ref(false)
const editedContent = ref('')
const chatId = ref()

function setDialogVisible(id: number, content: string) {
  centerDialogVisible.value = true

  editedContent.value = content
  chatId.value = id
}

// 发送请求 修改
const storyStore = userStoryStore()
function editClickAction() {
  centerDialogVisible.value = false

  const editContent = {
    content: editedContent.value //后端请求要求
  }

  storyStore.updateChatIdAction(chatId.value, editContent)
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.edit-modal {
  .el-dialog {
    .text {
      width: 100%;
    }
  }
}
</style>
