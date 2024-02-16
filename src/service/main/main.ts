//请求比较公共一些全面的数据，比如角色列表 部门列表 菜单列表等

import axiosRequest from '..'

// 获取角色列表
export function postRolesList() {
  return axiosRequest.post({
    url: '/role/list'
  })
}

// 获取部门列表
export function postDepartmentsList() {
  return axiosRequest.post({
    url: '/department/list'
  })
}

// 获取菜单列表
export function postMenuList() {
  return axiosRequest.post({
    url: `/menu/list`
  })
}

// 获取用户列表
export function postUsersList() {
  return axiosRequest.post({
    url: '/users/list'
  })
}

// 获取业务类别列表
export function postCategoryList() {
  return axiosRequest.post({
    url: '/category/list'
  })
}

// 密码修改
export function postUpdatePwd(pwdInfo: any) {
  return axiosRequest.post({
    url: `/users/change/pwd`,
    data: pwdInfo
  })
}
