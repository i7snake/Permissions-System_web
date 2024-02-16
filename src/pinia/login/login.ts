import { defineStore } from 'pinia'
import router from '@/router'
import type { User } from '@/types/user'
import { TOKEN } from '@/global/token'
import { userLoginRequest, getUserInfoId, getUserMenuRoleId } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'
import type { ILoginState } from '@/types/ILoginState'
import userMainStore from '../main/main'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    //state 保存东西是在内存，一刷新就不存在
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    // 登录请求逻辑
    async userLoginAction(user: User) {
      // 1.账号登录, 获取token等信息
      const loginResult = await userLoginRequest(user)
      const id = loginResult.data.id
      this.token = loginResult.data.token || ''
      localCache.setCache(TOKEN, this.token)

      // 2.获取登录用户id的详细信息(role信息)
      const userInfoResult = await getUserInfoId(id)
      const userInfo = userInfoResult.data[0]
      this.userInfo = userInfo

      // 3.根据角色id获取相应菜单权限
      const userMenusResult = await getUserMenuRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult
      this.userMenus = userMenus

      // 4.保存缓存用户信息(userInfo) 菜单权限(userMenus)
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 6.1 在登录成功时调用roles/epartments/menus列表数据
      const mianStore = userMainStore()
      mianStore.fetchAllDataList()

      // 7.1 重点 获取登录用户的所有按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 5.1 重点 动态的添加路由
      const { routes } = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 页面登录
      router.push('/main')
    },
    // 已经可以动态解决路由 但是state刷新，路由不见
    // 需要再次进行刷新时加载本地数据
    loadLocalCacheAction() {
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      // 6.2 刷新保持roles/epartments列表数据
      const mianStore = userMainStore()
      mianStore.fetchAllDataList()

      // 1.判断用户已经登录
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 7.2 再次获取登录用户的所有按钮权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 5.2 再次动态添加路由，这次从缓存中拿
        const { routes } = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
