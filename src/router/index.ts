import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { TOKEN } from '@/global/token'
import { mapMenusToRoutes } from '@/utils/mapMenus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', // 重定向
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound/notFound.vue')
    }
  ]
})

// 全局前置导航守卫
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    const userMenus = localCache.getCache('userMenus')
    const { firstMenu } = mapMenusToRoutes(userMenus)
    return firstMenu?.url
  }
})

export default router
