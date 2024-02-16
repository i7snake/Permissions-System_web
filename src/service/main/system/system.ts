// 系统管理网络请求
import axiosRequest from '@/service'
// ===========用户界面===============
// 查询用户列表
export function postUserList(queryInfo: any) {
  return axiosRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
// 删除用户
export function deleteUserId(id: number) {
  return axiosRequest.delete({
    url: `users/${id}`
  })
}
// 创建用户
export function newUser(userInfo: any) {
  return axiosRequest.post({
    url: '/users',
    data: userInfo
  })
}
// 修改用户
export function updateUser(id: number, userInfo: any) {
  return axiosRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// ===========其他界面===============
export function postPageListData(pageName: string, queryInfo: any) {
  return axiosRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageId(pageName: string, id: number) {
  return axiosRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPage(pageName: string, pageInfo: any) {
  return axiosRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function updatePage(pageName: string, id: number, pageInfo: any) {
  return axiosRequest.patch({
    url: `${pageName}/${id}`,
    data: pageInfo
  })
}
