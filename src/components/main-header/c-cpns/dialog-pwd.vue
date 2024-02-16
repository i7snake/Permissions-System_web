<template>
  <div class="dialog">
    <el-dialog v-model="centerDialogVisible" width="30%" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input show-password type="password" v-model="form.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password type="password" v-model="form.newPassword" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input show-password type="password" v-model="form.confirmPassword" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changePassword" plain> 确认修改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import userMainStore from '@/pinia/main/main'

const centerDialogVisible = ref(false)

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 修改密码
const mainStore = userMainStore()
function changePassword() {
  centerDialogVisible.value = false

  mainStore.fetchUpdatePwdAction(form).then((res) => {
    const type = res.code === 0 ? 'success' : 'error'
    ElMessage({
      message: res.message,
      showClose: true,
      type: type
    })
  })

  clearForm()
}
//清空表单
function clearForm() {
  form.oldPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
}

function setDialogVisible() {
  centerDialogVisible.value = true
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped></style>
