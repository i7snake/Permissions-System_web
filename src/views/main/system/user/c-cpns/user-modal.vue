<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large" :rules="userRules">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in rolesList" :key="item.roleId">
                <el-option :label="item.name" :value="item.roleId" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in departments" :key="item.departmentId">
                <el-option :label="item.name" :value="item.departmentId" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'
import userMainStore from '@/pinia/main/main'
import userSystemStore from '@/pinia/main/system/system'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const isNewRef = ref(true)
const updateData = ref()

function setDialogVisible(isNew: boolean = true, userRow?: any) {
  // 拦截，不让直接操作ialogVisible
  dialogVisible.value = true

  // 用来判断是否需要显示密码框
  isNewRef.value = isNew

  // 判断不是新建用户，并且拿到用户userRow行数据赋予formData用以回显
  if (!isNew && userRow) {
    for (const key in formData) {
      formData[key] = userRow[key] //编辑
    }
    updateData.value = userRow // 拿到用户行数据,包括id
  } else {
    for (const key in formData) {
      formData[key] = '' //新建时清除上个用户数据
    }
    updateData.value = null
  }
}

// 获取roles/departments 数据
const MainStore = userMainStore()
const { rolesList, departments } = storeToRefs(MainStore)

// 定义用户名校验规则
const userRules: FormRules = {
  name: [
    { required: true, message: '请确保账号正确', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,20}$/,
      message: '必须是5~20数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 点击确定 创建/编辑用户
const systemStore = userSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false

  if (!isNewRef.value && updateData.value) {
    // 编辑
    systemStore.updateUserAction(updateData.value.id, formData)
  } else {
    // 创建
    systemStore.newUserAction(formData)
  }
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
