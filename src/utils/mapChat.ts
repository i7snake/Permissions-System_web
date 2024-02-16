import { formatTime } from '@/utils/format'

/**
 *
 * @param latestChat 最新动态信息
 * @returns 返回处理好的动态信息
 */
export function maplatestChat(latestChat: any) {
  const timeDifference = formatTime(latestChat?.updateTime)
  const message = `${timeDifference}前 ${latestChat?.user?.realname}：${latestChat?.content} `

  return message
}

/**
 *
 * @param latestReplyMessage 最新评论或回复信息
 * @param userInfo 登录用户信息
 * @returns 返回处理好的评论或回复信息
 */
export function mapLatestReplyMessage(latestReplyMessage: any, userInfo: any) {
  const realname =
    latestReplyMessage.comments.user.id === userInfo.id
      ? '你'
      : `${latestReplyMessage.comments.user.realname}`

  const timeDifference = formatTime(latestReplyMessage.comments.createAt)

  let messageStr = ''
  if (latestReplyMessage.comments.comment_id !== null) {
    messageStr = `${timeDifference}前 ${realname}在 ${latestReplyMessage.comments.chat.content} 的动态 回复了 ${latestReplyMessage.reply.user.realname}: ${latestReplyMessage.comments.content}`
  } else {
    messageStr = `${timeDifference}前 ${realname} 评论了动态：${latestReplyMessage.comments.content} ${latestReplyMessage.comments.chat.content}`
  }

  return messageStr
}
