//保存一些main公共的数据
import { defineStore } from 'pinia'
import type { IMainState } from '@/types/IMainState'
import {
  postRolesList,
  postDepartmentsList,
  postMenuList,
  postUsersList,
  postCategoryList,
  postUpdatePwd
} from '@/service/main/main'

const userMainStore = defineStore('main', {
  state: (): IMainState => ({
    rolesList: [],
    departments: [],
    menuslist: [],
    userList: [],
    categoryList: []
  }),
  actions: {
    async fetchAllDataList() {
      // 获取全部的角色 部门数据 菜单 用户 类别等等数据
      const roles = await postRolesList()
      const departments = await postDepartmentsList()
      const menuslist = await postMenuList()
      const userList = await postUsersList()
      const categoryList = await postCategoryList()

      this.rolesList = roles.data.list
      this.departments = departments.data.list
      this.menuslist = menuslist.data.list
      this.userList = userList.data.list
      this.categoryList = categoryList.data.list
    },

    async fetchUpdatePwdAction(pwdInfo: any): Promise<any> {
      const res = await postUpdatePwd(pwdInfo)
      return res
    }
  }
})

export default userMainStore
