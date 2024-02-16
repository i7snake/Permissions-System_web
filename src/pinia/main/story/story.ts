import { defineStore } from 'pinia'
import type { IStoryState } from '@/types/IStoryState'
import {
  postChat,
  postChatList,
  deleteChatId,
  updateChatId,
  getChatIdDetail,
  postComment,
  postReply,
  deleteReply,
  getLatestCommentReply
} from '@/service/main/story/story'

const userStoryStore = defineStore('story', {
  state: (): IStoryState => ({
    chatList: [],
    chatDetail: {},
    totalCount: 0,
    latestCommentReply: {}
  }),
  actions: {
    async postNewChatAction(content: any) {
      const res = await postChat(content)
      console.log(res)

      // 重新获取最新动态
      this.postChatListAction()
    },
    async postChatListAction() {
      const chatList = await postChatList()

      // 排序 id越大越靠前
      const sortChatList = await chatList.data.list.sort((a: any, b: any) => b.id - a.id)
      this.chatList = sortChatList
      this.totalCount = chatList.data.totalCount
    },
    async deleteChatIdAction(id: number): Promise<any> {
      const res = await deleteChatId(id)

      this.postChatListAction()

      // 重新获取最新评论
      this.getLatestCommentReplyAction()
      return res
    },
    async updateChatIdAction(id: number, content: any): Promise<any> {
      const res = await updateChatId(id, content)

      this.postChatListAction()

      // 重新获取最新评论
      this.getLatestCommentReplyAction()

      return res
    },
    async getChatIdDetailAction(id: number) {
      const result = await getChatIdDetail(id)
      this.chatDetail = result.data
    },

    // 发表评论
    async postIssuedCommentAction(chatId: number, content: string) {
      const res = await postComment(chatId, content)
      console.log(res)

      // 重新获取详情
      this.getChatIdDetailAction(chatId)
      // 重新获取最新评论
      this.getLatestCommentReplyAction()
    },
    // 回复评论
    async postIssuedReplyAction(chatId: number, commentId: number, content: string) {
      const res = await postReply(chatId, commentId, content)
      console.log(res)

      // 重新获取详情
      this.getChatIdDetailAction(chatId)
      // 重新获取最新评论
      this.getLatestCommentReplyAction()
    },
    // 删除评论
    async deleteReplyAction(commentId: number, chatId: number): Promise<any> {
      const res = await deleteReply(commentId)

      this.getChatIdDetailAction(chatId)
      // 重新获取最新评论
      this.getLatestCommentReplyAction()
      return res
    },
    // 获取最新的评论和回复
    async getLatestCommentReplyAction() {
      const res = await getLatestCommentReply()
      this.latestCommentReply = res.data
    }
  }
})

export default userStoryStore
