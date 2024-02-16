<template>
  <div class="login-panel">
    <h1>人事后台管理系统</h1>

    <div class="userEl">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane name="User">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <loginUser ref="userRef"></loginUser>
        </el-tab-pane>
        <el-tab-pane name="Phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机验证</span>
            </div>
          </template>
          <loginPhoe></loginPhoe>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="contrlos">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" size="large" type="primary" @click="handleLoginBtn"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import loginUser from './login-User.vue'
import loginPhoe from './login-Phoe.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('User')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newV) => {
  localCache.setCache('isRemPwd', newV)
})
const userRef = ref<InstanceType<typeof loginUser>>()
function handleLoginBtn() {
  if (activeName.value === 'User') {
    userRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  text-align: center;
  margin-bottom: 150px;
  .userEl {
    margin-top: 20px;
    width: 350px;

    .label {
      display: flex;
      align-items: center;
      .text {
        font-size: 18px;
        margin-left: 5px;
      }
    }
  }
  .contrlos {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
