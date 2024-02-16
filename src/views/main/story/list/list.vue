<template>
  <div class="list">
    <el-row>
      <template v-for="item in chatList" :key="item.id">
        <el-col :span="12">
          <div class="grid-content ep-bg-purple">
            <div class="info">
              <div class="text">
                <span v-html="item.content"></span>
              </div>
              <div class="bottom">
                <div class="time">
                  <el-icon><Clock /></el-icon>
                  <span class="ti">{{ formatUTC(item.createTime) }}</span>
                  <span>发布者：{{ item.user.realname }}</span>
                </div>
                <div class="btn">
                  <el-button
                    v-if="isCurrentUserChatPermissions(item.user.id)"
                    type="primary"
                    :icon="Edit"
                    text
                    @click="handleEdit(item.id, item.content)"
                  />
                  <el-button
                    type="success"
                    :icon="ChatDotSquare"
                    text
                    @click="handleComment(item.id)"
                  />
                  <el-button
                    v-if="isCurrentUserChatPermissions(item.user.id)"
                    type="danger"
                    :icon="Delete"
                    text
                    @click="handleDelete(item.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>

    <editModal ref="editModalRef"></editModal>
    <commentModal ref="commentModalRef"></commentModal>
  </div>
</template>

<script setup lang="ts" name="list">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Delete, Edit, ChatDotSquare } from '@element-plus/icons-vue'

import userStoryStore from '@/pinia/main/story/story'
import { formatUTC } from '@/utils/format'
import { isCurrentUserChatPermissions } from '@/utils/isChatPermissions'
import editModal from './c-cpns/editModal.vue'
import commentModal from './c-cpns/commentModal.vue'

const storyStore = userStoryStore()
const { chatList } = storeToRefs(storyStore)

// 0.发起 action 获取列表
storyStore.postChatListAction()

// 1.删
function handleDelete(id: number) {
  storyStore.deleteChatIdAction(id)
}

// 2.改
const editModalRef = ref<InstanceType<typeof editModal>>()
function handleEdit(id: number, content: string) {
  editModalRef.value?.setDialogVisible(id, content)
}
// 3.查看评论
const commentModalRef = ref<InstanceType<typeof commentModal>>()
function handleComment(id: number) {
  commentModalRef.value?.setDialogVisible(id)
}
</script>

<style scoped lang="less">
.list {
  background-color: #f0f2f5;
}
.el-row {
  .el-col {
    padding: 10px;
    .grid-content {
      display: flex;
      padding: 10px;

      background-color: #fff;
      border-radius: 20px;
      height: 200px;
      .info {
        // flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        padding: 10px;

        overflow: hidden;

        .text {
          width: 100%;
          height: 130px;
          word-wrap: break-word;
          white-space: wrap;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 15px;

          .time {
            display: flex;
            align-items: center;
            color: #999;

            .ti {
              padding: 2px 20px 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
