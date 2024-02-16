<template>
  <div class="drawer">
    <el-drawer size="27%" v-model="drawer" direction="ltr" :with-header="false">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h4>个人信息</h4>
          </div>
        </template>

        <!-- 头像用户名 -->
        <el-row class="avatar_name" :gutter="20">
          <el-col :span="12">
            <div class="left" @click="uploadAvatar">
              <p>头像：</p>
              <el-avatar v-if="userInfo.avatar" shape="square" :size="120" :src="userInfo.avatar" />
              <el-avatar v-else shape="square" :size="120" :icon="UserFilled" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="rigth">
              <p>用户名：</p>
              <h1>{{ userInfo.name }}</h1>
            </div>
          </el-col>
        </el-row>

        <!-- 具体信息展示 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-collapse accordion>
              <template v-for="item in showData" :key="item">
                <el-collapse-item :title="item.title" :name="item.value">
                  <h3>{{ item.value }}</h3>
                </el-collapse-item>
              </template>
            </el-collapse>
          </el-col>
        </el-row>
      </el-card>
    </el-drawer>

    <!-- 头像上传 -->
    <el-dialog v-model="dialogTableVisible" width="20%" title="上传或更改头像">
      <el-upload
        class="avatar-uploader el-dialog--center"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
        :name="nameAvatar"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserFilled, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { BASE_URL } from '@/service/config/index'
import { localCache } from '@/utils/cache'
import { formatUTC } from '@/utils/format'
import { TOKEN } from '@/global/token'

import { getUserInfoId } from '@/service/login/login'

const userInfo = ref(localCache.getCache('userInfo'))

// 抽屉开关
const drawer = ref(false)
function setDrawer() {
  drawer.value = true
}
defineExpose({ setDrawer })

// 展示数据
const showData = [
  { title: '真实姓名', value: userInfo.value.realname },
  { title: '手机号码', value: userInfo.value.cellphone },
  { title: '所在部门', value: userInfo.value.department.name },
  { title: '上级领导', value: userInfo.value.department.leader },
  { title: '所属角色', value: userInfo.value.role.name },
  { title: '权限能力', value: userInfo.value.role.intro },
  { title: '创建时间', value: formatUTC(userInfo.value.createAt) }
]

// 4.头像上传修改逻辑
const dialogTableVisible = ref(false)
const action = BASE_URL + '/file'
const token = localCache.getCache(TOKEN)
const headers = {
  Authorization: 'Bearer ' + token
}
const nameAvatar = 'avatar' //上传字段

// 显示对话框
function uploadAvatar() {
  dialogTableVisible.value = true
}
// 定义用户更新事件
const emit = defineEmits(['UpdateUserInfo'])
// 上传前的回调
function beforeAvatarUpload(file: any) {
  const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
  if (!type) {
    ElMessage.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
  }
  return type
}
// 成功的回调
async function handleAvatarSuccess(res: any, file: any) {
  dialogTableVisible.value = false

  // 0.重新获取
  const userInfoId = userInfo.value.id
  const updatedUserInfoResult = await getUserInfoId(userInfoId)
  const updatedUserInfo = updatedUserInfoResult.data[0]

  // 1.更新头像信息
  userInfo.value.avatar = updatedUserInfo.avatar
  // 2.更新缓存
  localCache.setCache('userInfo', updatedUserInfo)

  // 3.发出更新事件
  emit('UpdateUserInfo')
}
</script>

<style lang="less" scoped>
.box-card {
  height: 100%;
}
.avatar_name {
  align-items: center;
  margin-bottom: 20px;
  .left {
    display: flex;
    align-items: center;

    cursor: pointer;
  }
  .rigth {
    display: flex;
    align-items: center;
  }
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff !important;
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
