<template>
  <div class="login-user">
    <el-form
      :model="user"
      :rules="userRules"
      ref="formRef"
      status-icon
      label-width="60px"
      size="large"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import type { User } from '@/types/user.d.ts'
import { localCache } from '@/utils/cache'

import useLoginStore from '@/pinia/login/login'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const user = reactive<User>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义校验规则
const userRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,20}$/,
      message: '必须是5~20数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = user.name
      const password = user.password
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.userLoginAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('登录失败,用户验证错误或格式不正确')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
