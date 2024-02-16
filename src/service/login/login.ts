import axiosRequest from '..'
import type { User } from '@/types/user'

// 1.用户登录请求
export function userLoginRequest(user: User) {
  return axiosRequest.post({
    url: '/login',
    data: user
  })
}

// 2.获取详情用户id
export function getUserInfoId(id: number) {
  return axiosRequest.get({
    url: `/users/${id}`
  })
}

// 3.根据角色id获取所属的菜单树权限
export function getUserMenuRoleId(id: number) {
  return axiosRequest.get({
    url: `/role/${id}/menu`
  })
}
