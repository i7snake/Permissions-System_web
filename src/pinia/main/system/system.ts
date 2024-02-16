import { defineStore } from 'pinia'
import {
  postUserList,
  deleteUserId,
  newUser,
  updateUser,
  postPageListData,
  deletePageId,
  newPage,
  updatePage
} from '@/service/main/system/system'
import type { ISystemState } from '@/types/ISystemState'
import userMainStore from '../main'

const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const usersListData = await postUserList(queryInfo)
      const { list, totalCount } = usersListData.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserIdAction(id: number) {
      // 1.删除数据操作
      const res = await deleteUserId(id)
      console.log(res)

      // 2.重新刷新数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserAction(userInfo: any) {
      // 创建新用户
      const res = await newUser(userInfo)
      console.log(res)

      // 2.重新刷新数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async updateUserAction(id: number, userInfo: any) {
      // 更新用户
      const res = await updateUser(id, userInfo)
      console.log(res)

      // 2.重新刷新数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    // 封装系统管理的其他界面网络请求
    async postPageListAction(pageNmae: string, queryInfo: any) {
      const pageListReult = await postPageListData(pageNmae, queryInfo)
      const { list, totalCount } = pageListReult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageId(pageName, id)
      console.log(deleteResult)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = userMainStore()
      mainStore.fetchAllDataList()
    },
    async newPageAction(pageName: string, pageInfo: any) {
      const newResult = await newPage(pageName, pageInfo)
      console.log(newResult)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = userMainStore()
      mainStore.fetchAllDataList()
    },
    async updatePageAction(pageName: string, id: number, pageInfo: any) {
      const updateResult = await updatePage(pageName, id, pageInfo)
      console.log(updateResult)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = userMainStore()
      mainStore.fetchAllDataList()
    }
  }
})

export default userSystemStore
