<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span @click="handleMessag">
        <el-icon><Message /></el-icon>
      </span>
      <span @click="handleReplyMessag">
        <el-icon><ChatDotRound /></el-icon>
      </span>
    </div>

    <!-- 个人操作 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar v-if="userInfo.avatar" :size="50" :src="userInfo.avatar" />
          <el-avatar v-else :icon="UserFilled" />
          <span class="name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>

            <el-dropdown-item divided @click="handleUserInfo">
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>

            <el-dropdown-item @click="handlePasswordEdit">
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <drawerInfo ref="drawerInfoRef" @update-user-info="handleUpdateUserInfo" />
      <dialogPwd ref="dialogPwdRef"></dialogPwd>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

import { TOKEN } from '@/global/token'
import { localCache } from '@/utils/cache'
import { maplatestChat, mapLatestReplyMessage } from '@/utils/mapChat'

import userStoryStore from '@/pinia/main/story/story'

import drawerInfo from './drawer-info.vue'
import dialogPwd from './dialog-pwd.vue'

const userInfo = ref(localCache.getCache('userInfo'))

// 处理用户信息更新事件(第一次上传的时候)
function handleUpdateUserInfo() {
  // 更新父组件中的用户信息
  userInfo.value = localCache.getCache('userInfo')
}

// 退出系统
const router = useRouter()
function handleExit() {
  localCache.removeCache(TOKEN)

  router.push('/login')
}
// 个人信息
const drawerInfoRef = ref<InstanceType<typeof drawerInfo>>()
function handleUserInfo() {
  drawerInfoRef.value?.setDrawer()
}

// 修改密码
const dialogPwdRef = ref<InstanceType<typeof dialogPwd>>()
function handlePasswordEdit() {
  dialogPwdRef.value?.setDialogVisible()
}

const storyStore = userStoryStore()
storyStore.postChatListAction()
storyStore.getLatestCommentReplyAction()
const { chatList, latestCommentReply } = storeToRefs(storyStore)

// 查看最新动态信息
async function handleMessag() {
  const latestChat = await chatList.value[0] //最新的动态信息

  const message = maplatestChat(latestChat)

  ElNotification({
    title: '最新动态',
    dangerouslyUseHTMLString: true,
    message: message,
    position: 'top-left'
  })
}
// 查看最新回复信息
async function handleReplyMessag() {
  const latestReplyMessage = await latestCommentReply.value //最新回复
  const message = mapLatestReplyMessage(latestReplyMessage, userInfo.value)
  ElNotification({
    title: '最新评论或回复',
    dangerouslyUseHTMLString: true,
    message: message,
    position: 'top-left'
  })
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}

:global(.el-notification.left) {
  left: 220px;
}
</style>
