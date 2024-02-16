<template>
  <div class="comment-modal">
    <el-dialog v-model="centerDialogVisible" title="相关评论" width="40%" center>
      <div class="comment">
        <!-- 原动态 -->
        <div class="raw">
          <div class="header">
            <div class="commonName">
              {{ chatDetail?.user?.realname }}
            </div>
            <el-button type="success" :icon="ChatDotSquare" text @click="isComment = !isComment"
              >评论</el-button
            >
          </div>
          <p v-html="chatDetail.content"></p>
        </div>
        <!-- 评论框 -->
        <div class="form" v-show="isComment">
          <el-input class="input" v-model="inputIssuedComment" placeholder="有什么不满请说！" />
          <el-button
            type="success"
            :icon="Position"
            text
            @click="issuedCommentBtn(chatDetail.id)"
          />
        </div>

        <!-- 评论及回复 -->
        <template v-for="comment in chatDetail?.comments" :key="comment.id">
          <div class="reply">
            <div class="header">
              <div class="commonName replyName">
                {{ comment.user.realname }}
                {{ comment.commentId ? '回复：' + getParentRealname(comment.commentId) : '' }}
              </div>
              <div class="btn">
                <el-button
                  v-if="isCurrentUserChatPermissions(comment.user.id)"
                  type="danger"
                  :icon="Delete"
                  text
                  @click="deleteReplyBtn(comment.id, chatDetail.id)"
                ></el-button>
                <el-button type="success" text @click="toggleReply(comment.id)">回复</el-button>
              </div>
            </div>
            <p v-html="comment.content"></p>

            <!-- 回复框 -->
            <div class="form" v-show="isReply === comment.id">
              <el-input class="input" v-model="inputIssuedReply" placeholder="有话好好说！" />
              <el-button
                type="success"
                :icon="Position"
                text
                @click="issuedReplyBtn(chatDetail.id, comment.id)"
              />
            </div>
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ChatDotSquare, Position, Delete } from '@element-plus/icons-vue'

import userStoryStore from '@/pinia/main/story/story'
import { isCurrentUserChatPermissions } from '@/utils/isChatPermissions'

const centerDialogVisible = ref(false)
const inputIssuedComment = ref('')
const inputIssuedReply = ref('')
const isComment = ref(false)
const isReply = ref(null)

const storyStore = userStoryStore()
const { chatDetail } = storeToRefs(storyStore)

// 1. 拿到发布动态的用户id 发送action 获取动态详情
function setDialogVisible(id: number) {
  centerDialogVisible.value = true

  storyStore.getChatIdDetailAction(id)
}

// 2. 发表评论
function issuedCommentBtn(chatId: number) {
  if (inputIssuedComment.value === '') return

  storyStore.postIssuedCommentAction(chatId, inputIssuedComment.value)

  inputIssuedComment.value = ''
  isComment.value = !isComment.value
}

// 3.展示回复评论
function getParentRealname(parentId: any) {
  const parentComment = chatDetail.value?.comments.find((comment: any) => comment.id === parentId)
  return parentComment?.user?.realname || ''
}

// 4.回复评论
const toggleReply = (commentId: any) => {
  isReply.value = isReply.value === commentId ? null : commentId
}
function issuedReplyBtn(chatId: number, commentId: number) {
  if (inputIssuedReply.value === '') return

  storyStore.postIssuedReplyAction(chatId, commentId, inputIssuedReply.value)

  inputIssuedReply.value = ''
  isReply.value = null
}

// 5.删除回复
function deleteReplyBtn(commentId: number, chatId: number) {
  storyStore.deleteReplyAction(commentId, chatId)
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  background-color: #f0f2f5 !important;
}
.header {
  display: flex;
  justify-content: space-between;
}
.commonName {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 20px;

  background-color: #b3e19d;
  border-radius: 5px;
  color: #000;
}

.comment-modal {
  .comment {
    width: 100%;
    overflow: hidden;

    .raw {
      padding: 10px;
      box-sizing: border-box;

      width: 100%;
      border-radius: 10px;
      background-color: #fff;

      margin-bottom: 10px;
    }

    .form {
      display: flex;
      align-items: center;

      padding: 10px;
    }

    .reply {
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 3px;

      width: 100%;
      border-radius: 10px;
      background-color: #fff;

      .replyName {
        background-color: #f0f9eb;
      }
      .btn {
        .el-button + .el-button {
          margin-left: 0;
          padding: 10px;
        }
      }
    }
  }
}
</style>
