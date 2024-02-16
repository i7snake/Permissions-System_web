import { localCache } from '@/utils/cache'

//判断用户是否有删改权限
export function isCurrentUserChatPermissions(userId: number): boolean {
  const user = localCache.getCache('userInfo')
  const loginUserId = user.id
  return userId === loginUserId
}
