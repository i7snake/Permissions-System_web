import axiosRequest from '@/service'

// 发布动态
export function postChat(content: any) {
  return axiosRequest.post({
    url: '/chat',
    data: content
  })
}

//获取动态列表
export function postChatList() {
  return axiosRequest.post({
    url: '/chat/list'
  })
}

// 删
export function deleteChatId(id: number) {
  return axiosRequest.delete({
    url: `/chat/${id}`
  })
}

// 改
export function updateChatId(id: number, content: any) {
  return axiosRequest.patch({
    url: `/chat/${id}`,
    data: content
  })
}

// 获取动态详情
export function getChatIdDetail(id: number) {
  return axiosRequest.get({
    url: `/chat/${id}`
  })
}

// 发表评论
export function postComment(chatId: number, content: string) {
  return axiosRequest.post({
    url: `/comment`,
    data: { chatId, content }
  })
}

// 回复评论
export function postReply(chatId: number, commentId: number, content: string) {
  return axiosRequest.post({
    url: `/comment/reply`,
    data: {
      chatId,
      commentId,
      content
    }
  })
}

// 删除评论
export function deleteReply(commentId: number) {
  return axiosRequest.delete({
    url: `/comment/${commentId}`
  })
}

export function getLatestCommentReply() {
  return axiosRequest.get({
    url: '/comment/reply'
  })
}
